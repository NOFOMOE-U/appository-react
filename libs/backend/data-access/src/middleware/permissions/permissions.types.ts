import { DynamicModule, ForwardReference, ModuleMetadata, Type } from '@nestjs/common/interfaces';

export const PERMISSIONS_MODULE_OPTIONS = 'PERMISSIONS_MODULE_OPTIONS'
export const PERMISSIONS_ENABLED = 'PERMISSIONS_ENABLED';

export interface PermissionsModuleOptions extends ModuleMetadata {
  basePath: string
  imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>>
  [Symbol.iterator](): Iterator<any>
}

export interface PermissionsModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PermissionsModuleOptionsFactory>
  useClass?: Type<PermissionsModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<PermissionsModuleOptions> | PermissionsModuleOptions
  inject?: any[]
}

export interface PermissionsModuleOptionsFactory {
  createPermissionsModuleOptions(): Promise<PermissionsModuleOptions> | PermissionsModuleOptions
}
