import { CustomHeaders } from '../../context/create-nested-context';
import { CustomHeadersHandler } from './custom-headers';

interface HeadersData {
  [key: string]: string | string[];
}

export class CustomHeadersImpl extends CustomHeadersHandler implements CustomHeaders {
  constructor(headersObject: { [k: string]: string | string[] } = {}) {
    super(headersObject)

    // Optionally, you can add class-specific constructor logic here.
    // The super() call already initializes the headersData property.

    
    // If you need to add any additional methods or properties specific to CustomHeadersImpl, you can do so here.
  }

  append(name: string, value?: string): this {
    super.append(name, value)
    return this
  }
  // You can add any additional methods or properties specific to CustomHeadersImpl here.

  // Example additional method:
  getCustomHeader(): string | null {
    // Implement this method as needed...
    return this.get('custom-header')
  }

  setAcceptJson(): this {
    this.set('Accept', 'application/json')
    return this
  }

  setAuthorization(token: string): this {
    this.set('Authorization', `Bearer ${token}`)
    return this
  }
}
