import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksRepository)
    private booksRepository: BooksRepository,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.booksRepository.getBooks();
  }

  async createBook(book: Book): Promise<void> {
    return this.booksRepository.createBook(book);
  }
    
  async getBook(id: number): Promise<Book | null> {
      const book = await this.booksRepository.findOne({ where: { id } });
      return book || null
  }

  async updateBook(id: string, book: Book): Promise<void> {
    await this.booksRepository.update(id, book);
  }

  async deleteBook(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
