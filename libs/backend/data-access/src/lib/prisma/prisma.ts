import { PrismaClient } from '@prisma/client';

interface CustomPrismaClient extends PrismaClient {}

const prisma: CustomPrismaClient = new PrismaClient();

export default prisma;


// before above change --removed
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default prisma