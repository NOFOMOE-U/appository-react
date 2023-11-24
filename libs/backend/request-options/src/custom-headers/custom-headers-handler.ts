import { SharedHeaders } from '../../../request-options/src/custom-request/custom-request-with-session'
import { CustomHeadersBase } from './custom-header-base'

// Define a class for handling custom headers
export class CustomHeadersHandler extends CustomHeadersBase implements SharedHeaders<CustomHeadersHandler> {
  constructor(headersObject: { [k: string]: string | string[] } = {}) {
    super(headersObject)
  }

  // Define methods that match the properties in SharedHeaders interface
  delete(name: string): boolean {
    // Implement the delete method as needed
    return super.delete(name)
  }

  entries(): IterableIterator<[string, string]> {
    // Implement the entries method as needed
    return super.entries()
  }

  forEach(callbackFn: (value: string, name: string, parent: CustomHeadersHandler) => void, thisArg?: any): void {
    // Implement the forEach method as needed
    super.forEach(callbackFn, thisArg)
  }

  get(name: string): string | null {
    // Implement the get method as needed
    return super.get(name)
  }

  getAll(name: string): string[] {
    // Implement the getAll method as needed
    return super.getAll(name)
  }

  has(name: string): boolean {
    // Implement the has method as needed
    return super.has(name)
  }

  keys(): IterableIterator<string> {
    // Implement the keys method as needed
    return super.keys()
  }

  values(): IterableIterator<string> {
    // Implement the values method as needed
    return super.values()
  }

  // Example additional method:
  getSetCookie(): string[] {
    const setCookiesHeader = this.get('set-cookie')
    if (setCookiesHeader !== null) {
      if (Array.isArray(setCookiesHeader)) {
        return setCookiesHeader
      } else {
        return [setCookiesHeader]
      }
    }
    return []
  }

  getCustomHeader(name: string): string | null {
    return this.get(name)
  }

  // Add the setAcceptJson method
  setAcceptJson(): void {
    this.set('Accept', 'application/json')
  }

  // Add the setAuthorization method
  setAuthorization(token: string): void {
    this.set('Authorization', token)
  }
}
