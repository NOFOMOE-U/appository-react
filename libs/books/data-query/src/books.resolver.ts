import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './books.entity';
import { BooksService } from './books.service';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book])
  async books() {
    return this.booksService.getBooks();
  }
    
  @Query(() => Book)
  async getBook(@Args("id") id: number): Promise<Book> {
    const book = await this.booksService.getBook(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: Book) {
    return this.booksService.createBook(input);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id') id: string,
    @Args('input') input: Book,
  ) {
    return this.booksService.updateBook(id, input);
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
