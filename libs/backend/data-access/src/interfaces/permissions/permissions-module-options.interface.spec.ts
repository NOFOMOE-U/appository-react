import { PermissionsModuleAsyncOptions } from './permissions-module-asyncOptions.interface';

describe('PermissionsModuleAsyncOptions', () => {
  describe('useFactory', () => {
    it('should return PermissionsModuleOptions', async () => {
      // Arrange
      const asyncOptions: PermissionsModuleAsyncOptions = {
        useFactory: async () => ({
          // mock implementation
          permissions: [],
          roles: [],
        }),
      };

      // Act
      const options = await asyncOptions.useFactory();

      // Assert
      expect(options.permissions).toBeDefined();
      expect(options.roles).toBeDefined();
    });
  });
});
