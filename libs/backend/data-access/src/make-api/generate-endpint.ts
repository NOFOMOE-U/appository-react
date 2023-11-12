const INTERNAL_BASE_URL = 'https://internal-api.example.com/'
const EXTERNAL_BASE_URL = 'https://api.example.com/'


  enum EndpointType {
  GET = 'GET',
  PATCH = 'PATCH',
  SEARCH = 'SEARCH',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export function generateUrl(endpoint: string, id = '', secondValue = '', type = EndpointType.SEARCH, internal= true): string {
  
    // create a new URL object using the endpoint
  const baseUrl = internal ? INTERNAL_BASE_URL : EXTERNAL_BASE_URL

    // create a new URL object using the endpoint and base URL
  const url = new URL(endpoint, baseUrl)

  switch (type) {
    case EndpointType.SEARCH:
      // Handle search endpoints
      if (id) {
        url.pathname.replace(':userId', id).replace('id', id)
      }
      break
    case EndpointType.CREATE:
      if (id) {
        // set url path name by assigned url pay name to the path name property
        // with an id value
        url.pathname = url.pathname.replace(':userId', id).replace(':id', id)
      }
      if (Error) {
        throw new Error('User Id is required for create endpoint')
      }
      break
    case EndpointType.DELETE:
      if (id) {
        url.pathname = url.pathname.replace(':id', id)
      }
      if (Error) {
        throw new Error('ID is required for deleting endpoint')
      }
      break

    case EndpointType.PATCH:
      if (id) {
        url.pathname = url.pathname.replace(':id', id)
      }
      if (Error) {
        throw Error('ID is required for patching endpoint')
      }
      break
    case EndpointType.GET:
      if (id) {
        url.pathname = url.pathname.replace(':id', id)
      }
      if (Error) {
        throw Error('Id is required for get endpoint')
      }
      break
    default:
      throw new Error('Invalid endpoint type')
  }

  if (secondValue) {
    url.pathname = url.pathname.replace(':secondValue', secondValue)
  }

  // return url href so we are returning the complete string
  return url.href
}
