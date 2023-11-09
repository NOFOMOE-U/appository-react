import { UserService, UserWithAccessToken, UserWithoutSensitiveData } from '@appository/backend/data-access'
import { PrismaClient, User, UserRole } from '@prisma/client'
import { IOptions, ShieldRule } from 'graphql-shield/typings/types'
import { AppConfiguration } from '../../../context/app-configuration'
import { CustomContextType } from '../../../context/custom-context-type'
import { CustomURLSearchParams, MyContext } from '../../../context/my-context'
import { hashPassword } from '../../../interfaces/auth/user-with-password-hash'
import prisma from '../../../lib/prisma/prisma'
import { axiosRequest } from '../../../make-api/axios-request'
import { CustomSessionType } from '../../../make-api/my-custom-request'
import { BodyContent } from '../../../make-api/requests/custom-request-init'
import errorMessages from '../error-messages'


type AnimationEvents = AnimationEvent | AnimationPlaybackEvent;
type CustomEventTypes = 'AnimationEvent' | 'AnimationPlaybackEvent' | 'AudioWorkletEvent';
type AudioWorkletEvent = Event | AudioWorklet; // Define your own type for AudioWorklet event




export interface MyOptions extends IOptions, Omit<Document, 'schema'> {
  //override the debug property to accept a string instead of a boolean
  debug: boolean
  //add a new property that specifies the type of context expected by the middleware
  context: MyContext
  prisma?: PrismaClient

  //from GetPrismaClientConfig
  datamodel: []
  mappings: []
  document: Document
  relativeEnvPaths: string[]
  relativePath: string
  dirname: string
  datasourceNames: string
  activeProvider: string
  dataProxy: boolean
}

const currentUserRequestsPasswordHash = true // Replace with your logic to determine if passwordHash should be included
let user: User

user = {
  id: '1',
  name: 'tom',
  email: 'test@example.com',
  roles: [UserRole.USER],
  username: 'WhoAmI',
  userProfileId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  passwordHash: `undefined`,
  resetPasswordToken: null,
  // add any additional fields as necessary
}
const mockDataEntries: Record<string, string> = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
}

const options: MyOptions = {
  debug: true,
  document: new Document,
  dirname: __dirname,
  relativePath: '',
  relativeEnvPaths: [],
  mappings: [],
  datamodel: [],
  context: {
    currentUser: {} as UserWithAccessToken | null,
    config: {} as AppConfiguration,
    session: {} as CustomSessionType,
    cookies: { key: 'cookies-value' },
    userId: 'user-id',
    get: (name: string) => undefined,
    userService: {} as UserService,
    context: {} as MyContext<{}>,
    ctx: {} as CustomContextType<MyContext<{}>>,
    body: {} as BodyInit | null,
    requestBody: {} as BodyContent | null | undefined,
    cache: {} as RequestCache,
    accessToken: null,
    url: '',
    size: 0,
    request: {
      id: 'user-id',
      user: { id: 'user-id' } as UserWithoutSensitiveData,
      body: {},
      // #todo verify axiosRequest is accurately being used
      headers: axiosRequest,
      prisma: prisma,
      currentUser: null,
      accessToken: null,
      context: {} as MyContext,
      ...({} as any),
    },
    accepts: (types: string | string[] | undefined) => {
      if (typeof types === 'string' && types == 'application/json') {
        return ['application/json']
      }
      return []
    },

    signedCookies: {} as CustomSessionType,
    user: {} as UserWithAccessToken,
    prisma: prisma,
    entries: (): IterableIterator<[string, string]> => Object.entries(mockDataEntries)[Symbol.iterator](),
    keys: (): IterableIterator<string> => Object.keys(mockDataEntries)[Symbol.iterator](),
    values: (): IterableIterator<string> => Object.values(mockDataEntries)[Symbol.iterator](),
    append: (key: string, value: string) => [],
    has: (key: string) => true,
    set: (key: string, value: string) => {},
    sort: () => {},
    forEach(callback: (value: string, name: string, searchParams: CustomURLSearchParams) => void): void {
      Object.entries(mockDataEntries).forEach(([name, value]) => {
        callback(value, name, this.URLSearchParams)
      })
    },
    delete: (name: string) => {
      try {
        // Check if the entry exists in mockDataEntries
        if (mockDataEntries.hasOwnProperty(name)) {
          // If it exists, delete the entry by the specified name
          delete mockDataEntries[name]
        } else {
          // Entry not found, handle the error
          throw new Error(`Entry with name "${name}" not found.`)
        }
      } catch (error) {
        // Handle the error, you can log it or throw a custom error
        console.error(`Error deleting entry: ${errorMessages.ENTRY_NOT_FOUND}`, error)
      }
    },
    getAll: (names: string[]): string[] => {
      return names.map((name) => {
        return mockDataEntries[name]
      })
    },
    URLSearchParams: {} as CustomURLSearchParams,
    [Symbol.iterator]: () => Object.entries(mockDataEntries)[Symbol.iterator](),
  },
  allowExternalErrors: false,
  fallbackRule: {} as ShieldRule,
  hashFunction: async (arg: { parent: any; args: any; context: MyContext }): Promise<string> => {
    const dataToHash = `${arg.parent} - ${arg.args.date} - ${arg.context}`
    const hashedPassword = await hashPassword(dataToHash)
    return hashedPassword
  },
  datasourceNames: '',
  activeProvider: '',
  dataProxy: false,
  close: function (): void {
    throw new Error('Function not implemented.')
  },
  URL: '',
  alinkColor: '',
  all: {} as HTMLAllCollection,
  anchors: {} as HTMLCollectionOf<HTMLAnchorElement>,
  applets: {} as HTMLCollection,
  bgColor: '',
  body: {} as HTMLElement,
  characterSet: '',
  charset: '',
  compatMode: '',
  contentType: '',
  cookie: '',
  currentScript: null,
  defaultView: null,
  designMode: '',
  dir: '',
  doctype: null,
  documentElement: {} as HTMLElement,
  documentURI: '',
  domain: '',
  embeds: {} as HTMLCollectionOf<HTMLEmbedElement>,
  fgColor: '',
  forms: {} as HTMLCollectionOf<HTMLFormElement>,
  fullscreen: false,
  fullscreenEnabled: false,
  head: {} as HTMLHeadElement,
  hidden: false,
  images: {} as HTMLCollectionOf<HTMLImageElement>,
  implementation: {} as DOMImplementation,
  inputEncoding: '',
  lastModified: '',
  linkColor: '',
  links: {} as HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement>,
  location: {} as Location,
  onfullscreenchange: null,
  onfullscreenerror: null,
  onpointerlockchange: null,
  onpointerlockerror: null,
  onreadystatechange: null,
  onvisibilitychange: null,
  ownerDocument: null,
  pictureInPictureEnabled: false,
  plugins: {} as HTMLCollectionOf<HTMLEmbedElement>,
  readyState: 'complete',
  referrer: '',
  rootElement: null,
  scripts: {} as HTMLCollectionOf<HTMLScriptElement>,
  scrollingElement: null,
  timeline: {} as DocumentTimeline,
  title: '',
  visibilityState: 'hidden',
  vlinkColor: '',
  adoptNode: function <T extends Node>(node: T): T {
    throw new Error('Function not implemented.')
  },
  captureEvents: function (): void {
    throw new Error('Function not implemented.')
  },
  caretRangeFromPoint: function (x: number, y: number): Range | null {
    throw new Error('Function not implemented.')
  },
  clear: function (): void {
    throw new Error('Function not implemented.')
  },
  createAttribute: function (localName: string): Attr {
    throw new Error('Function not implemented.')
  },
  createAttributeNS: function (namespace: string | null, qualifiedName: string): Attr {
    throw new Error('Function not implemented.')
  },
  createCDATASection: function (data: string): CDATASection {
    throw new Error('Function not implemented.')
  },
  createComment: function (data: string): Comment {
    throw new Error('Function not implemented.')
  },
  createDocumentFragment: function (): DocumentFragment {
    throw new Error('Function not implemented.')
  },
  createElement: function <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions | undefined,
  ): HTMLElementTagNameMap[K] {
    throw new Error('Function not implemented.')
  },

  createHTMLElement(qualifiedName: string): HTMLElement {
    return document.createElement(qualifiedName)
  },

  createSVGElement(qualifiedName: string): SVGElement {
    return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName) as SVGElement
  }, 

// createEvent(eventInterface: CustomEventTypes): AnimationEvents | AudioWorklet | Event | AnimationEvent  {
//     switch (eventInterface) {
//       case 'AnimationEvent':
//         return new AnimationEvent('animation') as AnimationEvents; 
//       case 'AnimationPlaybackEvent':
//         return new AnimationPlaybackEvent('animationplayback') as AnimationEvents;
//       case 'AudioWorkletEvent':
//         return new AudioWorklet() as AudioWorkletEvent;

//       default:
//         throw new Error(`Unsupported event interface: ${eventInterface}`);
//       }
//   } ,






  // createEvent: function (eventInterface: 'AnimationEvent'): AnimationEvent {
  //   throw new Error('Function not implemented.')
  // },
  createNodeIterator: function (
    root: Node,
    whatToShow?: number | undefined,
    filter?: NodeFilter | null | undefined,
  ): NodeIterator {
    throw new Error('Function not implemented.')
  },

  //todo fix commented out code
  createProcessingInstruction: function (target: string, data: string): ProcessingInstruction {
    throw new Error('Function not implemented.')
  },
  createRange: function (): Range {
    throw new Error('Function not implemented.')
  },
  createTextNode: function (data: string): Text {
    throw new Error('Function not implemented.')
  },
  createTreeWalker: function (
    root: Node,
    whatToShow?: number | undefined,
    filter?: NodeFilter | null | undefined,
  ): TreeWalker {
    throw new Error('Function not implemented.')
  },
  execCommand: function (commandId: string, showUI?: boolean | undefined, value?: string | undefined): boolean {
    throw new Error('Function not implemented.')
  },
  exitFullscreen: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  exitPictureInPicture: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  exitPointerLock: function (): void {
    throw new Error('Function not implemented.')
  },
  getElementById: function (elementId: string): HTMLElement | null {
    throw new Error('Function not implemented.')
  },
  getElementsByClassName: function (classNames: string): HTMLCollectionOf<Element> {
    throw new Error('Function not implemented.')
  },
  getElementsByName: function (elementName: string): NodeListOf<HTMLElement> {
    throw new Error('Function not implemented.')
  },
  getElementsByTagName: function <K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
    throw new Error('Function not implemented.')
  },

  getElementsByTagNS: function (namespaceURI: string, localName: string): HTMLCollectionOf<HTMLElement>{
    if(namespaceURI === "http://www.w3.org/1999/xhtml"){
        return this.getElementsByTagName(localName) as HTMLCollectionOf<HTMLElement>
  } else if (namespaceURI === "http://www.w3.org/2000/svg"){
    // handle SVG elements separately
    const svgElements = this.getElementsByTagNameNS(namespaceURI, localName);
    const elements: HTMLElement[] = []

      for (let i = 0; i < svgElements.length; i++) {
        elements.push(svgElements.item(i) as HTMLElement & SVGElement)
      }
        return {
          length: elements.length,
          item: (index: number) => elements[index],
        } as HTMLCollectionOf<HTMLElement>
    } else {
      throw new Error("Unsupported namespace")
    }
  },


  getSelection: function (): Selection | null {
    throw new Error('Function not implemented.')
  },
  hasFocus: function (): boolean {
    throw new Error('Function not implemented.')
  },
  hasStorageAccess: function (): Promise<boolean> {
    throw new Error('Function not implemented.')
  },
  importNode: function <T extends Node>(node: T, deep?: boolean | undefined): T {
    throw new Error('Function not implemented.')
  },
  // open(unused1?: string | URL, unused2?: string | URL): Document | Window | null{
  //   throw new Error('Function not implemented.')

  //   // const newDocument = document.implementation.createHTMLDocument('New Document')
  //   // return newDocument.open('unused1', 'unused2')
  // },

  open(url?: string | URL, name?: string): Document {
    const newDocument = document.implementation.createHTMLDocument('New Document');
    newDocument.open(url?.toString(), name);
    return newDocument
  },

  queryCommandEnabled: function (commandId: string): boolean {
    throw new Error('Function not implemented.')
  },
  queryCommandIndeterm: function (commandId: string): boolean {
    throw new Error('Function not implemented.')
  },
  queryCommandState: function (commandId: string): boolean {
    throw new Error('Function not implemented.')
  },
  queryCommandSupported: function (commandId: string): boolean {
    throw new Error('Function not implemented.')
  },
  queryCommandValue: function (commandId: string): string {
    throw new Error('Function not implemented.')
  },
  releaseEvents: function (): void {
    throw new Error('Function not implemented.')
  },
  requestStorageAccess: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  write: function (...text: string[]): void {
    throw new Error('Function not implemented.')
  },
  writeln: function (...text: string[]): void {
    throw new Error('Function not implemented.')
  },
  addEventListener: function <K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void {
    throw new Error('Function not implemented.')
  },
  removeEventListener: function <K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined,
  ): void {
    throw new Error('Function not implemented.')
  },
  baseURI: '',
  childNodes: {} as NodeListOf<ChildNode>,
  firstChild: null,
  isConnected: false,
  lastChild: null,
  nextSibling: null,
  nodeName: '',
  nodeType: 0,
  nodeValue: null,
  parentElement: null,
  parentNode: null,
  previousSibling: null,
  textContent: null,
  appendChild: function <T extends Node>(node: T): T {
    throw new Error('Function not implemented.')
  },
  cloneNode: function (deep?: boolean | undefined): Node {
    throw new Error('Function not implemented.')
  },
  compareDocumentPosition: function (other: Node): number {
    throw new Error('Function not implemented.')
  },
  contains: function (other: Node | null): boolean {
    throw new Error('Function not implemented.')
  },
  getRootNode: function (options?: GetRootNodeOptions | undefined): Node {
    throw new Error('Function not implemented.')
  },
  hasChildNodes: function (): boolean {
    throw new Error('Function not implemented.')
  },
  insertBefore: function <T extends Node>(node: T, child: Node | null): T {
    throw new Error('Function not implemented.')
  },
  isDefaultNamespace: function (namespace: string | null): boolean {
    throw new Error('Function not implemented.')
  },
  isEqualNode: function (otherNode: Node | null): boolean {
    throw new Error('Function not implemented.')
  },
  isSameNode: function (otherNode: Node | null): boolean {
    throw new Error('Function not implemented.')
  },
  lookupNamespaceURI: function (prefix: string | null): string | null {
    throw new Error('Function not implemented.')
  },
  lookupPrefix: function (namespace: string | null): string | null {
    throw new Error('Function not implemented.')
  },
  normalize: function (): void {
    throw new Error('Function not implemented.')
  },
  removeChild: function <T extends Node>(child: T): T {
    throw new Error('Function not implemented.')
  },
  replaceChild: function <T extends Node>(node: Node, child: T): T {
    throw new Error('Function not implemented.')
  },
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12,
  DOCUMENT_POSITION_DISCONNECTED: 1,
  DOCUMENT_POSITION_PRECEDING: 2,
  DOCUMENT_POSITION_FOLLOWING: 4,
  DOCUMENT_POSITION_CONTAINS: 8,
  DOCUMENT_POSITION_CONTAINED_BY: 16,
  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32,
  dispatchEvent: function (event: Event): boolean {
    throw new Error('Function not implemented.')
  },
  activeElement: null,
  adoptedStyleSheets: [],
  fullscreenElement: null,
  pictureInPictureElement: null,
  pointerLockElement: null,
  styleSheets: {} as StyleSheetList,
  elementFromPoint: function (x: number, y: number): Element | null {
    throw new Error('Function not implemented.')
  },
  elementsFromPoint: function (x: number, y: number): Element[] {
    throw new Error('Function not implemented.')
  },
  getAnimations: function (): Animation[] {
    throw new Error('Function not implemented.')
  },
  fonts: {} as FontFaceSet,
  onabort: null,
  onanimationcancel: null,
  onanimationend: null,
  onanimationiteration: null,
  onanimationstart: null,
  onauxclick: null,
  onbeforeinput: null,
  onblur: null,
  oncancel: null,
  oncanplay: null,
  oncanplaythrough: null,
  onchange: null,
  onclick: null,
  onclose: null,
  oncontextmenu: null,
  oncopy: null,
  oncuechange: null,
  oncut: null,
  ondblclick: null,
  ondrag: null,
  ondragend: null,
  ondragenter: null,
  ondragleave: null,
  ondragover: null,
  ondragstart: null,
  ondrop: null,
  ondurationchange: null,
  onemptied: null,
  onended: null,
  onerror: null,
  onfocus: null,
  onformdata: null,
  ongotpointercapture: null,
  oninput: null,
  oninvalid: null,
  onkeydown: null,
  onkeypress: null,
  onkeyup: null,
  onload: null,
  onloadeddata: null,
  onloadedmetadata: null,
  onloadstart: null,
  onlostpointercapture: null,
  onmousedown: null,
  onmouseenter: null,
  onmouseleave: null,
  onmousemove: null,
  onmouseout: null,
  onmouseover: null,
  onmouseup: null,
  onpaste: null,
  onpause: null,
  onplay: null,
  onplaying: null,
  onpointercancel: null,
  onpointerdown: null,
  onpointerenter: null,
  onpointerleave: null,
  onpointermove: null,
  onpointerout: null,
  onpointerover: null,
  onpointerup: null,
  onprogress: null,
  onratechange: null,
  onreset: null,
  onresize: null,
  onscroll: null,
  onscrollend: null,
  onsecuritypolicyviolation: null,
  onseeked: null,
  onseeking: null,
  onselect: null,
  onselectionchange: null,
  onselectstart: null,
  onslotchange: null,
  onstalled: null,
  onsubmit: null,
  onsuspend: null,
  ontimeupdate: null,
  ontoggle: null,
  ontransitioncancel: null,
  ontransitionend: null,
  ontransitionrun: null,
  ontransitionstart: null,
  onvolumechange: null,
  onwaiting: null,
  onwebkitanimationend: null,
  onwebkitanimationiteration: null,
  onwebkitanimationstart: null,
  onwebkittransitionend: null,
  onwheel: null,
  childElementCount: 0,
  children: {} as HTMLCollection,
  firstElementChild: null,
  lastElementChild: null,

  append: function (...nodes: (string | Node)[]): void {
    throw new Error('Function not implemented.')
  },
  prepend: function (...nodes: (string | Node)[]): void {
    throw new Error('Function not implemented.')
  },
  querySelector: function <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null {
    throw new Error('Function not implemented.')
  },
  querySelectorAll: function <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): NodeListOf<HTMLElementTagNameMap[K]> {
    throw new Error('Function not implemented.')
  },
  replaceChildren: function (...nodes: (string | Node)[]): void {
    throw new Error('Function not implemented.')
  },
  createExpression: function (expression: string, resolver?: XPathNSResolver | null | undefined): XPathExpression {
    throw new Error('Function not implemented.')
  },
  createNSResolver: function (nodeResolver: Node): Node {
    throw new Error('Function not implemented.')
  },
  evaluate: function (
    expression: string,
    contextNode: Node,
    resolver?: XPathNSResolver | null | undefined,
    type?: number | undefined,
    result?: XPathResult | null | undefined,
  ): XPathResult {
    throw new Error('Function not implemented.')
  },
}

export default options
