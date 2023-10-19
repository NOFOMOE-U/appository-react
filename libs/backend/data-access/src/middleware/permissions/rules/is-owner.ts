import { PrismaClient } from '@prisma/client';
import { rule } from 'graphql-shield';
import { UserWithoutSensitiveData } from '../../../modules/user/user';
import errorMessages from '../error-messages';

const prisma = new PrismaClient();

export const isOwner = rule()(async (parent, _, { context }) => {
  try {
    await checkIfUserIsOwner(context.user.id, 'post', parent.id)
    return true
  } catch (e) {
    return false
  }
  })
  

export async function checkIfUserIsOwner(userId: string, type: string, postId: string): Promise<UserWithoutSensitiveData> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error(errorMessages.userNotFound);
  }
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new Error(errorMessages.postNotFound);
  }
  
  if (post.authorId !== userId) {
    throw new Error(errorMessages.notAuthorized);
  }

  const { passwordHash, ...userWithoutPassword } = user;

  return userWithoutPassword;
}