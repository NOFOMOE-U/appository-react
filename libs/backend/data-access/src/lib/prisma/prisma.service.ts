import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'libs/backend/data-access/src/node_modules/.prisma/client'; //--removed
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super()
  }
}




// import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
// import { PrismaClient } from './../node_modules/.prisma/client/'

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect()
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close()
//     })
//   }

//   get client() {
//     return this
//   }
// }
