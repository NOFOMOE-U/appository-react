import {
  CustomContextType,
  CustomURLSearchParams,
  MyContext,
} from '@appository/backend/context-system'
import { createUserWithAccessToken } from '@appository/backend/data-access'
import { UserService, UserWithoutSensitiveData } from '@appository/backend/users'
import { DocumentHelper } from '@appository/shared-features/documents'
import { errorMessages } from '@appository/shared-features/reports'
import { ShieldRule } from 'graphql-shield/typings/types'
import { AppConfiguration } from 'libs/app-configuration-system/src/app-configuration.service'
import { prisma } from 'libs/backend/data-access/src/lib/prisma/prisma'
import { hashPassword } from '../../../data-access/src/interfaces/auth/user-with-password-hash'
import { MyOptions } from '../../../data-access/src/middleware/permissions/shield/my-options.interface'
import { getUserId } from '../../../data-access/src/utils/backend-auth.utils'
import { BodyContent } from '../custom-requests/custom-request-init'
import { CustomSessionType } from '../custom-requests/my-custom-request'

const userId = getUserId()
const mockDataEntries: Record<string, string> = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
}

export const options: MyOptions = {
  documentHelper: {} as DocumentHelper,
  debug: true,
  namespace: '',
  qualifiedName: '',
  //todo update {tite as part of path}
  userFilePath: `/user/${userId}/generated-pdf/{title}`,
  document: document.implementation.createDocument('namespace', 'qualifiedName', null),

  dirname: __dirname,
  relativePath: '',
  relativeEnvPaths: [],
  mappings: [],
  datamodel: [],
  context: {
    currentUser: {} as typeof createUserWithAccessToken | null,
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
    url: 'url',
    size: 0,
    request: {
      headers: {},
      body: {} as BodyInit | null | undefined,
      method: 'GET',
      url: '',
      query: {},
      params: {},
      ...({} as any),
    },
    accepts: (types: string | string[] | undefined) => {
      if (typeof types === 'string' && types == 'application/json') {
        return ['application/json']
      }
      return []
    },

    signedCookies: {} as CustomSessionType,
    user: {} as UserWithoutSensitiveData,
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
  url: '',
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
  readyState: 'ready-state',
  referrer: 'referrer',
  rootElement: null,
  scripts: {} as HTMLCollectionOf<HTMLScriptElement>,
  scrollingElement: null,
  timeline: {} as DocumentTimeline,
  title: 'title',
  visibilityState: 'hidden',
  vlinkColor: 'vlinkColor',

  createDocument(): Document {
    return new Document()
  },

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
    return document.createAttribute(localName)
  },

  createAttributeNS: function (namespace: string, arg1: string | null, qualifiedName: string, arg3: string): Attr {
    return document.createAttributeNS(namespace, qualifiedName)
  },

  createCDATASection: function (data: string): CDATASection {
    return document.createCDATASection(data)
  },

  createComment: function (data: string): Comment {
    return document.createComment(data)
  },

  createDocumentFragment: function (): DocumentFragment {
    return document.createDocumentFragment()
  },

  createElement: function <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions | undefined,
  ): HTMLElementTagNameMap[K] {
    return document.createElement(tagName, options)
  },

  createElementNS(
    namespaceURI: 'http://www.w3.org/1999/xhtml' | 'http://www.w3.org/2000/svg' | 'http://www.w3.org/1998/Math/MathML',
    qualifiedName: string,
    options?: any,
  ): HTMLElement | SVGElement | MathMLElement {
    throw new Error('Function not implemented.')
  },

  createEvent(eventInterface: string): AnimationEvent {
    switch (eventInterface) {
      case 'AnimationEvent':
        return new AnimationEvent('animation') as AnimationEvent & AnimationPlaybackEvent
      case 'AnimationPlaybackEvent':
        return new AnimationPlaybackEvent('animationplayback') as AnimationPlaybackEvent & AnimationEvent
      case 'AudioWorklet':
        return new AudioWorklet() as AudioWorklet & AnimationEvent

      default:
        throw new Error(`Unsupported event interface: ${eventInterface}`)
    }
  },

  createNodeIterator: function (
    root: Node,
    whatToShow?: number | undefined,
    filter?: NodeFilter | null | undefined,
  ): NodeIterator {
    throw new Error('Function not implemented.')
  },

  //todo fix commented out code
  createProcessingInstruction: function (target: string, data: string): ProcessingInstruction {
    return new ProcessingInstruction()
  },
  createRange: function (): Range {
    return new Range()
  },
  createTextNode: function (data: string): Text {
    return document.createTextNode(data)
  },
  createTreeWalker: function (
    root: Node,
    whatToShow?: number | undefined,
    filter?: NodeFilter | null | undefined,
  ): TreeWalker {
    return new TreeWalker()
  },
  execCommand: function (commandId: string, showUI?: boolean | undefined, value?: string | undefined): boolean {
    return document.execCommand(commandId, showUI, value)
  },
  exitFullscreen: function (): Promise<void> {
    return document.exitFullscreen()
  },
  exitPictureInPicture: function (): Promise<void> {
    return document.exitPictureInPicture()
  },
  exitPointerLock: function (): void {
    document.exitPointerLock()
    },
  getElementById: function (elementId: string): HTMLElement | null {
    return document.getElementById(elementId)
    },
  getElementsByClassName: function (classNames: string): HTMLCollectionOf<Element> {
    return new HTMLCollection()
    },
  getElementsByName: function (elementName: string): NodeListOf<HTMLElement> {
    return document.getElementsByName(elementName)
  },

  getElementsByTagName: function <K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
    throw new Error('Function not implemented.')
  },

  getSelection: function (): Selection | null {
    return window.getSelection()
  },

  querySelector: function <K extends keyof HTMLElementTagNameMap>(selectors: string): HTMLElementTagNameMap[K] | null {
    return null
  },

  querySelectorAll: function <K extends keyof HTMLElementTagNameMap>(
    selectors: string,
  ): NodeListOf<HTMLElementTagNameMap[K]> | undefined {
    return undefined as unknown as NodeListOf<HTMLElementTagNameMap[K]> | undefined;
  },

  hasFocus: function (): boolean {
    return false
  },
  hasStorageAccess: function (): Promise<boolean> {
    return Promise.resolve(false)
  },
  importNode: function <T extends Node>(node: T, deep?: boolean | undefined): T {
  return node.cloneNode(deep) as T
  },

  open(url?: string | URL, name?: string): Document {
    const newDocument = document.implementation.createHTMLDocument('New Document')
    newDocument.open(url?.toString(), name)
    return newDocument
  },

  queryCommandEnabled: function (commandId: string): boolean {
    return false
  },
  queryCommandIndeterm: function (commandId: string): boolean {
    return false
  },
  queryCommandState: function (commandId: string): boolean {
    return false
  },
  queryCommandSupported: function (commandId: string): boolean {
    return false
  },
  queryCommandValue: function (commandId: string): string {
    return ''
  },
  releaseEvents: function (): void {

    },
  requestStorageAccess: function (): Promise<void> {
    return Promise.resolve()
  },
  write: function (...text: string[]): void {},
  writeln: function (...text: string[]): void {
    text.forEach((str) => {
      console.log(str)
    })
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
    this.childNodes.push(node);
    return node;
    },
  cloneNode: function (deep?: boolean | undefined): Node {
    return {} as Node;
    },
  compareDocumentPosition: function (other: Node): number {
    return 0;
   },
  contains: function (other: Node | null): boolean {
    return false;
    },
  getRootNode: function (options?: GetRootNodeOptions | undefined): Node {
    return this;
    },
  hasChildNodes: function (): boolean {
    return Object.keys(this.childNodes).length > 0;
    },
  insertBefore: function <T extends Node>(node: T, child: Node | null): T {
    if (child) {
      const index = this.childNodes.indexOf(child);
      this.childNodes.splice(index, 0, node);
    } else {
      this.childNodes.push(node);
    }
    return node;
  },
  isDefaultNamespace: function (namespace: string | null): boolean {
    return namespace === null;
    },
  isEqualNode: function (otherNode: Node | null): boolean {
    if (!otherNode) return false;
    },
  isSameNode: function (otherNode: Node | null): boolean {
    return this === otherNode;
    },
  lookupNamespaceURI: function (prefix: string | null): string | null {
    return null;
    },
  lookupPrefix: function (namespace: string | null): string | null {
    return null;
    },
  normalize: function (): void {

    },
  removeChild: function <T extends Node>(child: T): T {
    const index = this.childNodes.indexOf(child);
    this.childNodes.splice(index, 1);
    return child;
    },
  replaceChild: function <T extends Node>(node: Node, child: T): T {
    const index = this.childNodes.indexOf(child);
    this.childNodes.splice(index, 1, node);
    return child;
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
    return false
    },
  activeElement: null,
  adoptedStyleSheets: [],
  fullscreenElement: null,
  pictureInPictureElement: null,
  pointerLockElement: null,
  styleSheets: {} as StyleSheetList,
  elementFromPoint: function (x: number, y: number): Element | null {
    return null
    },
  elementsFromPoint: function (x: number, y: number): Element[] {
    return []
    },
  getAnimations: function (): Animation[] {
    return []
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
    for (let i = nodes.length - 1; i >= 0; i--) {
      this.insertBefore(nodes[i], this.firstChild);

    }
    return this.firstChild
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

  getElementsByTagNS: function (namespaceURI: string, localName: string): HTMLCollectionOf<HTMLElement> {
    throw new Error('Function not implemented.')
  },
  getElementsByTagNameNS: function (namespaceURI: string, localName: string): unknown {
    throw new Error('Function not implemented.')
  },
}

export default options
