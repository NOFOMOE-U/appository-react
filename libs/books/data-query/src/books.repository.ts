import { EntityRepository, Repository } from 'typeorm';
import { Book } from './books.entity';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  async getBooks(): Promise<Book[]> {
    return this.find();
  }

  async createBook(book: Book): Promise<void> {
    await this.save(book);
  }
}
