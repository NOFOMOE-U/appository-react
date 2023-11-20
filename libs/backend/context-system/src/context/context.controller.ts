// #todo set up dynamic controller for types to use such as user and task

// import { Controller, Get, Param, Request, Response } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { CustomContextType } from './custom-context-type'
// // import { YourRequestObject } from '@appository/backend/data-access';
// import { MyContext } from './my-context';


// @Controller(':moduleName')
// export class MyController {
//   constructor(private prisma: PrismaClient) {}

//   @Get(':resource')
//   async myMethod(
//     @Param('moduleName') moduleName: string,
//     @Param('resource') resource: string,
//     @Request() req: YourRequestObject<MyContext>,
//     @Response() res: Response,
//   ) {
//     const { customProp } = req

//     // Dynamically import the relevant module and controller
//     const { myConController } = await import(`./${moduleName}/${moduleName}.module`)
//     const controller = myConController[this.toCamelCase(resource)]

//     if (!controller) {
//       res.json(404).json({ message: `Resource ${resource} not found` })
//       return
//     }

//     // Call the controller method and send the data back in the response
//     const data = await controller(this.prisma)
//     res.json({ data, customProp })
//   }

//   private toCamelCase(str: string) {
//     return str.replace(/-([a-z])/g, (_, match) => match.toUpperCase())
//   }
// }











// #review set up in nexus example
// // import { queryType } from 'nexus';
// import { MyController } from './my-controller';

// export const Query = queryType({
//   definition(t) {
//     t.field('myQuery', {
//       type: 'MyQueryType',
//       resolve: async (_root, _args, ctx) => {
//         const { myConController } = await import('./my-module');
//         const myController = new MyController(myConController);
//         const result = await myController.myMethod(ctx.req, ctx.res);
//         return result;
//       },
//     });
//   },
// });











// #review update in controller(user, task) example
// import { Controller, Type } from '@nestjs/common';
// import { MyController } from './my.controller';

// @Controller()
// export class AnotherController {
//   constructor(private myControllerType: Type<MyController>) {}

//   async someMethod() {
//     const myController = new this.myControllerType();
//     // Use myController as normal
//   }
// }
