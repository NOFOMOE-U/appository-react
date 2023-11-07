import { MyContext } from '../context/my-context';
import { PrismaService } from '../lib/prisma/prisma.service';
import { UserService } from '../modules/user/user.service';
import { EXTERNAL_API_CONFIG_MAP } from './api-config/external-config';
import { INTERNAL_API_CONFIG_MAP } from './api-config/internal-config';
import { MyCustomRequest } from './my-custom-request';
import { BodyContent, CustomRequestInit } from './requests/custom-request-init';

// Define a default base URL in your apiConfig
export const apiConfig = {
  // ... other endpoints ...
  baseApiUrl: 'https://api.example.com', //todo update to use proper baseApiUrl
};

const INTERNAL_API_CONFIG = INTERNAL_API_CONFIG_MAP;
const EXTERNAL_API_CONFIG = EXTERNAL_API_CONFIG_MAP;

const userSelectEndpoint: keyof typeof apiConfig = 'baseApiUrl';

type ApiEndpoint = keyof typeof apiConfig;
type ApiType = 'isInternal' | 'isExternal';

let prismaService = new PrismaService();
let userService = new UserService(prismaService);
let requestBody: BodyContent | null = null;

export function createRequest(
  context: MyContext,
  endpoint: ApiEndpoint,
  type: ApiType = 'isInternal',
): MyCustomRequest<MyContext> {
  // Use the base URL from apiConfig
  const baseUrl = apiConfig.baseApiUrl;

  // Construct the full URL based on the endpoint and base URL
  const fullUrl = generateUrl(endpoint, baseUrl, type);

  const customRequestInit: CustomRequestInit & { body?: BodyInit | undefined } = {
    method: 'GET',
    url: fullUrl,
    URLSearchParams: context.URLSearchParams,
    user: context.user,
    request: context.request,
    requestBody: context.requestBody,
    accepts: context.accepts,
    body: JSON.stringify(context),
  };

  const requestBody: BodyInit = JSON.stringify(context); // Convert the context to JSON
  return new MyCustomRequest({ ...customRequestInit, body: requestBody, userService },userService, undefined );
}

// Update the generateUrl function to use the base URL
function generateUrl(endpoint: string, baseUrl: string, type: ApiType = 'isInternal'): string {
  // Combine the endpoint with the base URL
  const url = new URL(endpoint, baseUrl);
  return url.href;
}

const context: MyContext = {} as MyContext<{}>;
const type: ApiType = 'isInternal';

// Now create myCustomRequest after defining createRequest
const myCustomRequest = createRequest(context, userSelectEndpoint, type);
myCustomRequest.userService = userService;
