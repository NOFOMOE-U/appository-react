import { MyContext } from '../context/my-context'
import { apiConfig } from './api-config/api-config'
import { EXTERNAL_API_CONFIG_MAP } from './api-config/external-config'
import { INTERNAL_API_CONFIG_MAP } from './api-config/internal-config'
import { MyCustomRequest } from './my-custom-request'
import { CustomRequestInit } from './requests/custom-request-init'
import { CustomRequestWithContext } from './requests/custom-request-with-context'

const INTERNAL_API_CONFIG = {
    INTERNAL_API_CONFIG_MAP
}

const EXTERNAL_API_CONFIG = {
   EXTERNAL_API_CONFIG_MAP
}

type ApiEndpoint = keyof typeof apiConfig
//createRequest accepts additional argument for the API type
type ApiType = 'isInternal' | 'isExternal'

export function createRequest(
    context: MyContext,
    endpoint: ApiEndpoint,
    type: ApiType = 'isInternal'
): MyCustomRequest<MyContext> {

    const url = type == 'isInternal'
        ? INTERNAL_API_CONFIG[endpoint]
        : EXTERNAL_API_CONFIG[endpoint]
    
    return new MyCustomRequest({
        method: 'GET',
        url,
        request: {} as CustomRequestWithContext<CustomRequestInit>,
        accepts: (types: string | string[] | undefined) => {
            if (typeof context?.accepts === 'undefined') {
              return undefined
            } else {
                const result = context.accepts(Array.isArray(types) ? types : [types] as unknown as string);
                if (Array.isArray(result)) {
                    return result 
                } else if (typeof result === 'string') {
                    return [result]
                } else {
                    return undefined
                }
            }
        },
    })
}

export function generateUrl(endpoint: string, id = '', secondValue = '', type: ApiType = 'isInternal'): string {
    const baseUrl = type === 'isInternal' ? INTERNAL_API_CONFIG_MAP.toString() : EXTERNAL_API_CONFIG_MAP.toString()
    const url = new URL(endpoint, baseUrl)
    return url.href
}
