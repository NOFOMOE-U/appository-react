import { AbilityBuilder, PureAbility, subject } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
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
ability.can('read', subject('Post', { id: 1, title: '...', authorId: 1, content: 'name', author: 'my name', createdAt: new Date(), updatedAt: new Date(), published: true }));
