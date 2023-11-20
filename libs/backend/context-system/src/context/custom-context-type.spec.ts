import { CustomContextType } from './custom-context-type';

describe('CustomContextType', () => {
  it('should have the expected properties and types', () => {
    const customContext: CustomContextType = {
      ctx: {},
      req: { headers: {} },
      request: { headers: {} },
      context: {},
      body: {},
      session: {},
      cache: {},
      credentials: {},
      prisma: {} as any,
      cookies: {},
      currentUser: null,
      token: '',
      get: () => '',
    };

    expect(customContext).toBeDefined();
    expect(customContext.ctx).toBeDefined();
    expect(customContext.req).toBeDefined();
    expect(customContext.request).toBeDefined();
    expect(customContext.context).toBeDefined();
    expect(customContext.body).toBeDefined();
    expect(customContext.session).toBeDefined();
    expect(customContext.cache).toBeDefined();
    expect(customContext.credentials).toBeDefined();
    expect(customContext.prisma).toBeDefined();
    expect(customContext.cookies).toBeDefined();
    expect(customContext.currentUser).toBeDefined();
    expect(customContext.token).toBeDefined();
    expect(customContext.get).toBeDefined();
  });
});
