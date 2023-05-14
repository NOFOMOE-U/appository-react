import { PrismaClient } from "@prisma/client";
import { UserWithoutSensitiveData } from "../modules/user/user";
import { createNestedContext } from "./create-nested-context";
import { MyContext } from "./my-context";
interface MyCustomContext {
  foo: string;
}

describe("createNestedContext", () => {
  it("should create a nested context", () => {
    const context: MyContext<MyCustomContext> = createNestedContext({
      foo: "bar",
    });

    expect(context.ctx.ctx.ctx).toEqual({});
    expect(context.ctx.ctx.req.outerContext.currentUser).toEqual(
      {} as UserWithoutSensitiveData
    );
    expect(context.ctx.ctx.req.outerContext.body).toEqual({});
    expect(context.ctx.ctx.req.outerContext.cache).toEqual({});
    expect(context.ctx.ctx.req.outerContext.id).toEqual("");
    expect(context.ctx.ctx.req.session.userId).toEqual("");
    expect(context.ctx.ctx.req.outerContext.prisma).toBeInstanceOf(
      Object.getPrototypeOf(new PrismaClient()).constructor
    );
    expect(context.ctx.ctx.req.outerContext.req.rawHeaders).toEqual([
      "",
      "Content-Type: text/html",
    ]);
    expect(context.ctx.ctx.req.outerContext.req.headers).toEqual({});
    expect(context.ctx.ctx.req.outerContext.req.cookies).toEqual({});
    expect(context.ctx.ctx.req.outerContext.req.signedCookies).toEqual({});
    expect(context.ctx.ctx.req.outerContext.req.getAll("foo")).toBeUndefined();
    expect(context.ctx.ctx.req.outerContext.req.ctx).toEqual({
      context: {},
      rawHeaders: [],
      headers: {},
      getAll: () => undefined,
    });
    expect(context.ctx.ctx.req.outerContext.credentials).toBeUndefined();
    expect(context.ctx.ctx.req.outerContext.cache).toEqual({});
    expect(context.ctx.ctx.req.outerContext.logIn).toBeCalledTimes(0);
    expect(context.ctx.ctx.req.outerContext.logOut).toBeCalledTimes(0);
    expect(context.ctx.ctx.req.outerContext.isAuthenticated).toBeCalledTimes(
      0
    );
    expect(
      context.ctx.ctx.req.outerContext.isUnauthenticated
    ).toBeCalledTimes(0);
    expect(context.ctx.ctx.req.outerContext.foo).toBeUndefined();
    expect(context.ctx.ctx.req.ctx.context).toEqual({
      foo: "bar",
    });
  });
});
