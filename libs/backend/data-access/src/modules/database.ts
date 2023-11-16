// nexus.ts
import { objectType } from 'nexus';

export const Configuration = objectType({
  name: 'Configuration',
  definition(t) {
    t.id('id');
      t.string('headless');
      
  },
});
