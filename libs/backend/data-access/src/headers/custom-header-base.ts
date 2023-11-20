import { SharedHeaders } from '../requests/custom-request-with-session'
import { CustomHeadersHandler } from './custom-headers-handler'

export class CustomHeadersBase implements SharedHeaders<CustomHeadersHandler> {
    
    private headersData: { [key: string]: string| string[] } = {}

    constructor(headersObject: { [k: string]: string | string[] } = {}) {
        // initialize with custom headers here if needed
        this.headersData = {
            'Content-Type': 'application/json',
            Authorization: '',
            'Custom-Heaader': '',
            ...headersObject,
        }
    }

    set(name: string, value: string): this {
        this.headersData[name] = value
        return this
    }

    get(name: string): string | null {
        const value = this.headersData[name]
        if (value === undefined) {
            return null
        } else if (Array.isArray(value)) {
            return value.length > 0 ? value[0] : null
        } else {
            return value as string
        }
    }

    has(name: string): boolean {
        return this.headersData !== undefined && this.headersData.hasOwnProperty(name)
    }

    delete(name: string): boolean {
        if (name in this.headersData) {
            delete this.headersData[name]
            return true
        }
        return false
    }

    append(name: string, value?: string): CustomHeadersHandler {
        if (value !== undefined) {
            const existingValue = this.headersData[name]
            const newValue = existingValue ? `${existingValue},${value}` : value
            this.headersData[name] = newValue
        } else {
            this.headersData[name] = ''
        }
        return this as unknown as CustomHeadersHandler
    }

    keys(): IterableIterator<string> {
        return Object.keys(this.headersData)[Symbol.iterator]()
    }

    entries(): IterableIterator<[string, string]> {
        const entries: [string, string][] = []
        for (const key in this.headersData) {
            if (Object.prototype.hasOwnProperty.call(this.headersData, key)) {
                entries.push([key, this.headersData[key] as string])
            }
        }
        return entries[Symbol.iterator]()
    }

    forEach(callbackFn: (value: string, name: string, parent: CustomHeadersHandler) => void, thisArg?: any): void {
        for (const name in this.headersData) {
            if (Object.prototype.hasOwnProperty.call(this.headersData, name)) {
                const value = this.headersData[name]
                callbackFn.call(thisArg || this, value as string, name, this)
            }
        }
    }

    values(): IterableIterator<string> {
        const values: string[] = []
        for (const key in this.headersData) {
            if (Object.prototype.hasOwnProperty.call(this.headersData, key)) {
                const value = this.headersData[key]
                if (Array.isArray(value)) {
                    for (const item of value) {
                        values.push(item)
                    }
                } else {
                    values.push(value as string)
                }
            }
        }
        return values[Symbol.iterator]()
    }

    getAll(name: string): string[] {
        const values = this.headersData[name]
        if (values) {
            return Array.isArray(values) ? values : [values as string]
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

    *[Symbol.iterator](): IterableIterator<[string, string]> {
        const entries: [string, string][] = []
        for (const key in this.headersData) {
            if (Object.prototype.hasOwnProperty.call(this.headersData, key)) {
                entries.push([key, this.headersData[key] as string])
            }
        }
    }

    getSetCookie(): string[] {
        // Implement the getSetCookie method as needed
        // For example, you can retrieve the "set-cookie" header from this.get("set-cookie")
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
}