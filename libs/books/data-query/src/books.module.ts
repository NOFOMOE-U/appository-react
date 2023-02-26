import { SharedDataModule } from '@appository/shared/module'
import { Module } from '@nestjs/common'
// import { BooksRepository } from './books.repository'
// import { BooksResolver } from './books.resolver'
// import { BooksService } from './books.service'

@Module({
  imports: [
    // TypeOrmModule.forFeature([Book,
    // BooksRepository
  // ]), 
  SharedDataModule],
  providers: [
    // BooksService,
    // BooksResolver
  ],
})
export class BooksModule {}
