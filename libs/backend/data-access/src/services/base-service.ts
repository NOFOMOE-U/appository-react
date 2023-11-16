 export class BaseService {
  protected prisma

  constructor(prisma: any) {
    this.prisma = prisma
  }
}
