import { CustomContextHeaders } from "../custom-requests/custom-request-with-context"
import { CustomHeadersHandler } from './custom-headers-handler'

const customContextHeaders: CustomContextHeaders = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer token',
  'Custom-Header': ['value1', 'value2'],
}

customContextHeaders['Content-Type'] = 'application/json'
customContextHeaders['Authorization'] = 'Bearer token'
customContextHeaders['Custom-Header'] = 'value1'
customContextHeaders['Custom-Header'] = 'value2'

export type MyHeadersInit = { [key: string]: string | string[] }

export class MyCustomHeaders extends CustomHeadersHandler {
  customHeadersData?: {
    [key: string]:
      | string
      | string[]
      | ((name: string, value: string) => void)
      | ((callbackFn: (value: string, name: string, headers: Headers) => void, thisArg?: any) => void)
      | undefined
  } = {}

  constructor(headers?: MyHeadersInit | undefined) {
    super(headers)

    if (headers && typeof headers === 'object') {
      //iterate over the object properties
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          const value = headers[key]

          if (typeof value == 'string') {
            this.set(key, value)
          } else if (Array.isArray(value)) {
            value.forEach((val) => this.append(key, val))
          }
        }
      }
    }
  }

  setAuthorization(token: string): MyCustomHeaders {
    this.set('Authorization', `Bearer ${token}`)
    return this
  }

  setAcceptJson(): void {
    this.set('Accept', 'application/json') // change ''application/json' with values
  }

  has(name: string): boolean {
    return super.has(name)
  }

  get(name: string): string | null {
    return super.get(name)
  }

  set(name: string, value: string | string[]): this {
    if (typeof value === 'string') {
      this.set(name, value)
    } else if (Array.isArray(value)) {
      value.forEach((val) => this.append(name, val))
    }
    return this
  }

  delete(name: string): boolean {
    super.delete(name)
    return true
  }

  getCustomHeader(): string | null {
    return this.get('custom-header')
  }

  append(name: string, value?: string | undefined): MyCustomHeaders {
    super.append(name, value)
    return this
  }

  keys(): IterableIterator<string> {
    return this.keys()
  }

  entries(): IterableIterator<[string, string]> {
    return this.entries()
  }

  values(): IterableIterator<string> {
    return this.values()
  }

  getAll(name: string): string[] {
    return this.getAll(name)
  }

  *[Symbol.iterator](): Generator<[string, string], void, void> {
    const entries: [string, string][] = []
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        entries.push([key, this.get(key) || ''])
      }
    }
    yield* entries
  }
}
