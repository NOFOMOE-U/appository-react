import { rule } from 'graphql-shield';
import { PrismaService } from '../../../lib/prisma/prisma.service';
import { getUserById } from '../../../modules/user/user';
import { UserService } from '../../../modules/user/user.service';
import errorMessages from '../error-messages';
import { PermissionsService } from '../permissions.service';

const prismaService = new PrismaService()
const userService = new UserService(prismaService);
const permissionService = new PermissionsService(userService)
// Define the rule function
const isAuthorized = rule()(async (_, __, { request, prisma }) => {
  // Replace this logic with your authorization logic
  const userId = await getUserById(request);
  if (typeof userId !== 'string') {
    return new Error(errorMessages.notAuthorized);
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

    // Check if the user has permission to perform the action on a specific resource type (e.g., 'project')
  // You should replace 'yourResourceType' with the actual resource type you are authorizing.
  const isAuthorizedForResource = permissionService.isAuthorized(user, 'yourResourceType', 'action'); // Replace 'action' with the specific action you are authorizing.
  // Replace this condition with your authorization criteria
  if (isAuthorizedForResource) {
    
    return true;
  } else {
    return new Error(errorMessages.notAuthorized);
  }
});

export default isAuthorized;
