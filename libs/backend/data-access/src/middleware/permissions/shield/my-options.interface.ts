import { PrismaClient } from '@prisma/client'
import { IOptions } from 'graphql-shield/typings/types'
import { MyContext } from 'libs/backend/context-system/src/context/my-context'
import DocumentHelper from 'libs/shared-features/documents/src/PDFDocuments'


export interface MyOptions extends IOptions {
  getElementsByTagNameNS(namespaceURI: string, localName: string): unknown
  //override the debug property to accept a string instead of a boolean
  debug: boolean
  //add a new property that specifies the type of context expected by the middleware
  context: MyContext
  prisma?: PrismaClient

  namespace: string
  qualifiedName: string,

  datamodel: []
  mappings: []
  userFilePath: string
  document: Document
  documentHelper: typeof DocumentHelper
  relativeEnvPaths: string[]
  relativePath: string
  dirname: string
  datasourceNames: string
  activeProvider: string
  dataProxy: boolean
  url: string,
  alinkColor: string,
  all: HTMLAllCollection,
  anchors: HTMLCollectionOf<HTMLAnchorElement>,
  applets: HTMLCollection,
  bgColor: string
  body: HTMLElement
  characterSet: string
  charset: string
  compatMode: string
  contentType: string
  cookie: string
  currentScript: null
  defaultView: null
  designMode: string
  dir: string
  doctype: null
  documentElement: HTMLElement
  documentURI: string
  domain: string
  embeds: HTMLCollectionOf<HTMLEmbedElement>
  fgColor: string
  forms: HTMLCollectionOf<HTMLFormElement>
  fullscreen: false
  fullscreenEnabled: false
  head: HTMLHeadElement
  hidden: false
  images: HTMLCollectionOf<HTMLImageElement>
  implementation: DOMImplementation
  inputEncoding: string
  lastModified: string
  linkColor: string
  links: HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement>
  location: Location
  onfullscreenchange: null
  onfullscreenerror: null
  onpointerlockchange: null
  onpointerlockerror: null
  onreadystatechange: null
  onvisibilitychange: null
  ownerDocument: null
  pictureInPictureEnabled: false
  plugins: HTMLCollectionOf<HTMLEmbedElement>
  readyState: string
  referrer: string
  rootElement: null
  scripts: HTMLCollectionOf<HTMLScriptElement>
  scrollingElement: null
  timeline: DocumentTimeline
  title: string
  visibilityState: string
  vlinkColor: string
  baseURI: string
  childNodes: NodeListOf<ChildNode>
  firstChild: null
  isConnected: false
  lastChild: null
  nextSibling: null
  nodeName: string
  nodeType: 0
  nodeValue: null
  parentElement: null
  parentNode: null
  previousSibling: null
  textContent: null
  ENTITY_REFERENCE_NODE: 5
  ENTITY_NODE: 6
  PROCESSING_INSTRUCTION_NODE: 7
  COMMENT_NODE: 8
  DOCUMENT_NODE: 9
  DOCUMENT_TYPE_NODE: 10
  DOCUMENT_FRAGMENT_NODE: 11
  NOTATION_NODE: 12
  DOCUMENT_POSITION_DISCONNECTED: 1
  DOCUMENT_POSITION_PRECEDING: 2
  DOCUMENT_POSITION_FOLLOWING: 4
  DOCUMENT_POSITION_CONTAINS: 8
  DOCUMENT_POSITION_CONTAINED_BY: 16
  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  ELEMENT_NODE: 1
  ATTRIBUTE_NODE: 2
  TEXT_NODE: 3
  CDATA_SECTION_NODE: 4
  activeElement: null
  adoptedStyleSheets: []
  fullscreenElement: null
  pictureInPictureElement: null
  pointerLockElement: null
  styleSheets: StyleSheetList
  fonts: FontFaceSet
  onabort: null
  onanimationcancel: null
  onanimationend: null
  onanimationiteration: null
  onanimationstart: null
  onauxclick: null
  onbeforeinput: null
  onblur: null
  oncancel: null
  oncanplay: null
  oncanplaythrough: null
  onchange: null
  onclick: null
  onclose: null
  oncontextmenu: null
  oncopy: null
  oncuechange: null
  oncut: null
  ondblclick: null
  ondrag: null
  ondragend: null
  ondragenter: null
  ondragleave: null
  ondragover: null
  ondragstart: null
  ondrop: null
  ondurationchange: null
  onemptied: null
  onended: null
  onerror: null
  onfocus: null
  onformdata: null
  ongotpointercapture: null
  oninput: null
  oninvalid: null
  onkeydown: null
  onkeyup: null
  onload: null
  onloadeddata: null
  onloadedmetadata: null
  onloadstart: null
  onlostpointercapture: null
  onmousedown: null
  onmouseenter: null
  onmouseleave: null
  onmousemove: null
  onmouseout: null
  onmouseover: null
  onmouseup: null
  onpaste: null
  onpause: null
  onplay: null
  onplaying: null
  onpointercancel: null
  onpointerdown: null
  onpointerenter: null
  onpointerleave: null
  onpointermove: null
  onpointerout: null
  onpointerover: null
  onpointerup: null
  onprogress: null
  onratechange: null
  onreset: null
  onresize: null
  onscroll: null
  onscrollend: null
  onsecuritypolicyviolation: null
  onseeked: null
  onseeking: null
  onselect: null
  onselectionchange: null
  onselectstart: null
  onslotchange: null
  onstalled: null
  onsubmit: null
  onsuspend: null
  ontimeupdate: null
  ontoggle: null
  ontransitioncancel: null
  ontransitionend: null
  ontransitionrun: null
  ontransitionstart: null
  onvolumechange: null
  onwaiting: null
  onwebkitanimationend: null
  onwebkitanimationiteration: null
  onwebkitanimationstart: null
  onwebkittransitionend: null
  onwheel: null
  childElementCount: 0
  children: HTMLCollection
  firstElementChild: null
  lastElementChild: null
  append: (...nodes: (string | Node)[]) => void
  adoptNode: <T extends Node>(node: T) => void
  
  captureEvents: () => void;

  caretRangeFromPoint: (x: number, y: number) => Range | null
  
  clear: () => void
  
  createAttribute: (localName: string) => Attr
  
  createAttributeNS: (
    namespace: string,
    arg1: string | null,
    qualifiedName: string,
    arg3: string
  ) => Attr

  createCDATASection: (data: string) => CDATASection,
 
  createComment: (data: string) => Comment,
 
  createDocumentFragment: () => DocumentFragment,
  createElement: <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions | undefined,
  ) => Element,
 
  createNodeIterator: (
    root: Node,
    whatToShow?: number | undefined,
    filter?: NodeFilter | null | undefined,
  ) => NodeIterator,
 
  createProcessingInstruction: (target: string, data: string) => ProcessingInstruction,
  createRange: () => Range,
 
  createTextNode: (data: string) => Text,
  
  createTreeWalker: (
    root: Node,
    whatToShow?: number | undefined,
    filter?: NodeFilter | null | undefined,
  ) => TreeWalker,
  
  execCommand: (commandId: string, showUI?: boolean | undefined, value?: string | undefined) => boolean,
  
  exitFullscreen: () => Promise<void>,
  
  exitPictureInPicture: () => Promise<void>,
  
  exitPointerLock: () => void,
  
  getElementById: (elementId: string) => HTMLElement | null,
 
  getElementsByClassName: (classNames: string) => HTMLCollectionOf<Element>,
  
  getElementsByName: (elementName: string) => NodeListOf<HTMLElement>,

  getElementsByTagName: <K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K,
  ) => HTMLCollectionOf<HTMLElementTagNameMap[K]>,

  createEvent: (eventInterface: string) => AnimationEvent,

  getSelection: () => Selection | null,
  
  hasFocus: () => boolean,
  
  hasStorageAccess: () => Promise<boolean>,
 
  importNode: <T extends Node> (node: T, deep?: boolean | undefined) => T,

  queryCommandEnabled: (commandId: string) => boolean
  queryCommandIndeterm: (commandId: string) => boolean
  queryCommandState: (commandId: string) => boolean

  queryCommandSupported: (commandId: string) => boolean

  queryCommandValue: (commandId: string) => string
  releaseEvents: () => void
  requestStorageAccess: () => Promise<void>
  write: (...text: string[]) => void
  writeln: (...text: string[]) => void
  addEventListener: <K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ) => void
  removeEventListener: <K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined
  ) => void
  createElementNS(
    namespaceURI: "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg" | "http://www.w3.org/1998/Math/MathML",
    qualifiedName: string,
    options?: any
  ): HTMLElement | SVGElement | MathMLElement
  close: () => void
  open: () => void
  appendChild: <T extends Node>(node: T) => T
  
  cloneNode: (deep?: boolean | undefined) => Node
  
  compareDocumentPosition: (other: Node) => number
  
  contains: (other: Node | null) => boolean
  
  getRootNode: (options?: GetRootNodeOptions | undefined) => Node
  
  hasChildNodes: () => boolean
  insertBefore: <T extends Node>(node: T, child: Node | null) => T
  isDefaultNamespace: (namespace: string | null) => boolean
  isEqualNode: (otherNode: Node | null) => boolean
  isSameNode: (otherNode: Node | null) => boolean
  lookupNamespaceURI: (prefix: string | null) => string | null
  lookupPrefix: (namespace: string | null) => string | null
  normalize: () => void 

  removeChild: <T extends Node>(child: T) => T
  replaceChild: <T extends Node>(node: Node, child: T) => T
  dispatchEvent: (event: Event) => boolean
  elementFromPoint: (x: number, y: number) => Element | null
  elementsFromPoint: (x: number, y: number) => Element[]
  getAnimations: () => Animation[]
  prepend: (...nodes: (string | Node)[]) => void
  querySelector: <K extends keyof HTMLElementTagNameMap>(selectors: K) => HTMLElementTagNameMap[K] | null
  querySelectorAll: <K extends keyof HTMLElementTagNameMap>(
    selectors: K
  ) => NodeListOf<HTMLElementTagNameMap[K]>
  replaceChildren: (...nodes: (string | Node)[]) => void
  
  createExpression: (expression: string, resolver?: XPathNSResolver | null | undefined) => XPathExpression
  createNSResolver: (nodeResolver: Node) => Node,
  evaluate: (
    expression: string,
    contextNode: Node,
    resolver?: XPathNSResolver | null | undefined,
    type?: number | undefined,
    result?: XPathResult | null | undefined
  ) => XPathResult
  getElementsByTagNS: (namespaceURI: string, localName: string) => HTMLCollectionOf<HTMLElement> 
  createDocument: () => Document
 
}
