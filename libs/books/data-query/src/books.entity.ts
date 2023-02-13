import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  author: string

  @Column()
  rating: string

  @Column()
  title: string

  @Column()
  price: number

  @Column()
  genre: string

  @Column()
  publicationYear: Date

  constructor(title: string, rating: string, author: string, price: number, genre: string, publicationYear: Date) {
    this.title = title
    this.price = price
    this.rating = rating
    this.author = author
    this.genre = genre
    this.publicationYear = publicationYear
  }
}

export const books = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    rating: 4.7,
    price: 13.99,
    publicationDate: new Date(1960, 7, 11),
  },
  {
    id: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    rating: 4.1,
    price: 10.99,
    publicationDate: new Date(1925, 4, 10),
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    rating: 4.3,
    price: 9.99,
    isbn: '9780141439518',
    publicationDate: new Date(1813, 1, 28),
  },
]
