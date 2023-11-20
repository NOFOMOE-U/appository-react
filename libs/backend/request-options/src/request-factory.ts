import { MyContext } from '@appository/backend/context-system';
//todo adddress connection to connector so we can fix circuar dependencies
// import { PrismaService } from '@appository/backend/data-access';
// import { UserService } from '@appository/backend/data-access';
import { AccessLevel } from '../api-config/access-level';
import { EXTERNAL_API_CONFIG_MAP } from '../api-config/external-config';
import { INTERNAL_API_CONFIG_MAP } from '../api-config/internal-config';
import { MyCustomRequest } from '../my-custom-request';
import { BodyContent, CustomRequestInit } from './custom-request-init';


// Define a type for endpoint properties
interface EndpointProperties {
  method: string;
  path: string;
  responseProperties?: { [propName: string]: string };
  requestParams?: { [paramName: string]: string };
}

// Define a generator function for endpoint keys
function* endpointKeyGenerator() {
  let index = 1;
  while (true) {
    yield `endpoint${index++}`;
  }
}

// Create an instance of the generator
const generateEndpointKey = endpointKeyGenerator();

// Define a function to create dynamic endpoints
function createEndpoint(
  path: string,
  method: string,
  responseProperties?: { [propName: string]: string },
  requestParams?: { [paramName: string]: string },
): EndpointProperties {
  return {
    method,
    path,
    requestParams,
    responseProperties,
  };
}

// Define your dynamic endpoints
const value = true;
const dynamicEndpoints = {
  [generateEndpointKey.next().value as string]: createEndpoint(
    '/users',
    'GET',
    { page: 'number', limit: 'number' },
    { id: 'number', name: 'string', email: 'string' },
  ),
  [generateEndpointKey.next().value as string ]: createEndpoint('/users/{userId}', 'GET', undefined, {
    id: 'number',
    name: 'string',
    email: 'string',
  }),
  // Add more endpoints here...
}

// Example usage
console.log(dynamicEndpoints);

// Generate API URLs based on the dynamic structure
const dynamicApiConfig = Object.fromEntries(
  Object.entries(dynamicEndpoints).map(([key, value]) => [key, generateUrl({} as ApiEndpoint, 'baseUrl', 'accessLevel' ,{} as ApiType)])
);

// Example usage
console.log(dynamicApiConfig);










//oLd code to choose what to keep from to add to the top

// Define a default base URL in your apiConfig
export const apiConfig = {
  // ... other endpoints ...
  baseApiUrl: 'http://localhost:3000',
  //todo update to use proper baseApiUrl
};

const INTERNAL_API_CONFIG = INTERNAL_API_CONFIG_MAP;
const EXTERNAL_API_CONFIG = EXTERNAL_API_CONFIG_MAP;

const userSelectEndpoint: keyof typeof apiConfig = 'baseApiUrl';

type ApiEndpoint = keyof typeof apiConfig;
type ApiType = 'isInternal' | 'isExternal';


const prismaService = new PrismaService();
const accessLevel = AccessLevel
const userService = new UserService(prismaService, accessLevel)
const user = await userService.getCurrentUser()

const requestBody: BodyContent | null = null;



export function createRequest(
  context: MyContext,
  endpoint: ApiEndpoint,
  type: ApiType = 'isInternal',
): MyCustomRequest<MyContext> {
  // Use the base URL from apiConfig
  const baseUrl = apiConfig.baseApiUrl

  // Construct the full URL based on the endpoint and base URL
  const fullUrl = generateUrl(endpoint, baseUrl, type)

  const customRequestInit: CustomRequestInit & { body?: BodyInit | undefined } = {
    method: 'GET',
    url: fullUrl,
    URLSearchParams: context.URLSearchParams,
    user: context.user,
    request: context.request,
    requestBody: context.requestBody,
    accepts: context.accepts,
    body: JSON.stringify(context),
    accessLevel: context.accessLevel as AccessLevel,
  }

  const requestBody: BodyInit = JSON.stringify(context) // Convert the context to JSON
  return new MyCustomRequest(
    {
      ...customRequestInit,
      body: requestBody,
      userService,
      accessLevel: context.accessLevel as AccessLevel
    },
    userService,
    undefined,
  )
}

// Update the generateUrl function to use the base URL
function generateUrl(
  endpoint: ApiEndpoint,
  baseUrl: string,
  accessLevel: string,
  type: ApiType = 'isInternal',
): string {
  const apiConfigToUse = type === 'isInternal' ? INTERNAL_API_CONFIG : EXTERNAL_API_CONFIG

  if (Object.keys(apiConfigToUse).length === 0) {
    // Throw error if config is empty
    throw new Error('API config is empty')
  } else {
    // Assert the type of apiConfigToUse to { [key: string]: string }
    const configWithBaseUrl = apiConfigToUse as { [key: string]: string }

    // Add type check
    if ('baseApiUrl' in configWithBaseUrl && typeof configWithBaseUrl.baseApiUrl === 'string') {
      baseUrl = configWithBaseUrl.baseApiUrl
    }
  }

  // Combine the endpoint with the base URL
  const url = new URL(endpoint, generateEndpointKey.next().value as string);

  return url.href
}

const context: MyContext = {} as MyContext<{}>;
const type: ApiType = 'isInternal';

// Now create myCustomRequest after defining createRequest
const myCustomRequest = createRequest(context, userSelectEndpoint, type);
myCustomRequest.userService = userService;
