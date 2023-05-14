import { MyContext } from '../context/my-context'
import { apiConfig } from './api-config/api-config'
import { EXTERNAL_API_CONFIG_MAP } from './api-config/external-config'
import { INTERNAL_API_CONFIG_MAP } from './api-config/internal-config'
import { MyCustomRequest } from './my-custom-request'

const INTERNAL_API_CONFIG = {
    INTERNAL_API_CONFIG_MAP
}

const EXTERNAL_API_CONFIG = {
   EXTERNAL_API_CONFIG_MAP
}

type ApiEndpoint = keyof typeof apiConfig
//createRequest accepts additional argument for the API type
type ApiType = 'isInternal' | 'isExternal'

export function createRequest(endpoint: ApiEndpoint, type: ApiType = 'isInternal'): MyCustomRequest<MyContext> {

    const url = type == 'isInternal'
        ? INTERNAL_API_CONFIG[endpoint]
        : EXTERNAL_API_CONFIG[endpoint]
    
  return new MyCustomRequest({ method: 'GET', url })
}

export function generateUrl(endpoint: string, id = '', secondValue = '', type: ApiType = 'isInternal'): string {
    const baseUrl = type === 'isInternal' ? INTERNAL_API_CONFIG_MAP.toString() : EXTERNAL_API_CONFIG_MAP.toString()
    const url = new URL(endpoint, baseUrl)
    return url.href
}
