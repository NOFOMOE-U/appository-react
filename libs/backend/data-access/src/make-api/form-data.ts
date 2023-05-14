import { MyContext } from "../context/my-context";
import { SessionData } from "../types/express";
import { MyCustomRequest } from "./my-custom-request";

const headers = new Headers();


const request: MyCustomRequest<MyContext<MyContext>> = new MyCustomRequest<MyContext<MyContext>>({
  body: {} as any,
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  method: 'GET',
  headers: {},
  get: (name: string) => {
    if (name === 'set-cookie') {
      const value = headers.get(name)
      return value ? [...value.split(', ')] : undefined;
    }
    return headers.get(name) 
  },
  header: (name: string, value?: string | undefined
| string[] | undefined) => {
    if (value) {
      headers.set(name, value)
    } 
    return headers.get(name)
  },
  accepts: (types: string | string[]) => true,
  session: { userId: '1234' },
  context: { foo: 'bar' },
  signedCookies: {},
});

request.context = { hello: 'world' };

const formData = new FormData();
formData.append('request', JSON.stringify(request));
formData.append('session', JSON.stringify(request.session));
formData.append('context', JSON.stringify(request.context));
