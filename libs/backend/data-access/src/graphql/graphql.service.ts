import { Injectable } from '@nestjs/common'
import { PrismaService } from '../lib/prisma.service'

@Injectable()
export class GraphqlService {
  constructor(private prisma: PrismaService) {}
}
