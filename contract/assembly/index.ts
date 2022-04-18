import { Book, booksStorage } from './model';
import { context, ContractPromiseBatch } from "near-sdk-as";

export function buyBook(bookId: string): void {
  const book = getBook(bookId);
  if (book == null) {
    throw new Error("book not found");
  }
  if (book.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should be greater than the product's price");
  }

  ContractPromiseBatch.create(book.owner).transfer(context.attachedDeposit);
  book.incrementSoldAmount();
  booksStorage.set(book.id, book);
}


export function setBook(book: Book): void {
  let storedBook = booksStorage.get(book.id);
  if (storedBook !== null) {
    throw new Error(`a book with id=${book.id} already exists`);
  }
  booksStorage.set(book.id, Book.fromPayload(book))
}

export function getBook(id: string): Book | null {
  return booksStorage.get(id);
}

export function getBooks(): Array<Book> {
  return booksStorage.values();
}

export function deleteBook(id: string): void {
  booksStorage.delete(id)
}