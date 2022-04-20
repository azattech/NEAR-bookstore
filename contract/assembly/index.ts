import { Book, booksStorage } from './model';
import { context, ContractPromiseBatch } from "near-sdk-as";

/**
 * It is used to issue buy transactions when a book is purchased from a given seller 
 * (if the book is available)
 * @param bookId - an identifier of a book that is the subject of purchase
 */
export function buyBook(bookId: string): void {
  const book = getBook(bookId);
  if (book == null) {
    throw new Error("book not found");
  }

  assert(book.price.toString() <= context.attachedDeposit.toString(), "attached deposit should be greater than the product's price");
  
   /**
    * `ContractPromiseBatch` is used here to create a transaction to transfer the money to the seller
    * The amount of money to be used in the transaction is taken from  @param`context.attachedDeposit` 
    * which is defined by `--depositYocto=${AMOUNT}` parameter during the invocation 
    */
  ContractPromiseBatch.create(book.owner).transfer(context.attachedDeposit);
  book.incrementSoldAmount();
  booksStorage.set(book.id, book);
}

/**
 * @param book - to add a book to blockchain
 */
export function setBook(book: Book): void {
  let storedBook = booksStorage.get(book.id);
  assert(storedBook == null, `a book with id=${book.id} already exists`);
  booksStorage.set(book.id, Book.fromPayload(book))
}

/** 
 * @param id - returns added a book via id parameter.
 * @returns - given id's book
 */
export function getBook(id: string): Book | null {
  return booksStorage.get(id);
}

/**
 * @returns - returns all book that added to blockchain.
 */
export function getBooks(): Array<Book> {
  return booksStorage.values();
}