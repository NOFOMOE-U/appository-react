// permissions-module-asyncOptions

import { PermissionsModuleOptions } from './permissions-module-options.interface'

export interface PermissionsModuleAsyncOptions {
  useFactory?: (...args: any[]) => Promise<PermissionsModuleOptions> | PermissionsModuleOptions
  inject?: any[]
  imports?: any[]
}
