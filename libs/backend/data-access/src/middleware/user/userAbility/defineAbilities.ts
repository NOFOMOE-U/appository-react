import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import { Post, User } from '@prisma/client';

type AppAbility = PureAbility<[string, Subjects<{
  User: User,
  Post: Post
}>], PrismaQuery>;

const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

can('read', 'Post', { authorId: '1' });
can('create', 'Post', ['title', 'content']);
cannot('read', 'Post', { title: { startsWith: '[WIP]:' } });

const ability = build();
ability.can('read', 'Post');
 export default ability;