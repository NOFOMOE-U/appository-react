





import { getUserById } from '@appository/backend/data-access';
import { rule, shield } from 'graphql-shield';
import { MiddlewareFn } from 'type-graphql';

const isAuthenticatedUser = rule()((_, __, { context }) => {
  const userId = getUserById(context);
  return Boolean(userId);
});

const isAdmin = rule()(async (_, __, { context }) => {
  const userId = getUserById(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });
  return user.role === 'ADMIN';
});

const permissions = shield({
  Query: {
    me: isAuthenticatedUser,
    users: isAdmin,
  },
  Mutation: {
    updateMyProfile: isAuthenticatedUser,
    deleteUser: isAdmin,
  },
});

export const permissionsMiddleware: MiddlewareFn<any> = async ({ context, info }, next) => {
  const fieldPath = info.path;
  const fieldTypeName = info.parentType.name;
  const roles = [];

  if (fieldTypeName === 'Query') {
    if (fieldPath.key === 'me') {
      roles.push(isAuthenticatedUser);
    } else if (fieldPath.key === 'users') {
      roles.push(isAdmin);
    }
  } else if (fieldTypeName === 'Mutation') {
    if (fieldPath.key === 'updateMyProfile') {
      roles.push(isAuthenticatedUser);
    } else if (fieldPath.key === 'deleteUser') {
      roles.push(isAdmin);
    }
  }

  if (roles.length > 0) {
    await Promise.all(
      roles.map((role) =>
        role({
          context,
        })
      )
    );
  }

  return next();
};
