import { PersistentUnorderedMap, context, PersistentMap, u128 } from "near-sdk-as";


/**
 * booksStorage - it's a key-value datastructure that is used to store books by sellers.
 * PersistentUnorderedMap is useful additional functions that allow us to iterate over keys, values, entries.
 * The string LISTED_BOOKS in the PersistentUnorderedMap's constructor is the unique prefix to use for every key.
 */
export const booksStorage = new PersistentUnorderedMap<string, Book>("LISTED_BOOKS");



/**
 * Book class represents a book that can be listed on a bookstore.
 * It contains basic properties that are needed to define a book.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class Book{
    id: string;
    name: string;
    author: string;
    description: string;
    image: string;
    price: u128;
    owner: string;
    sold: u32;

    public static fromPayload(payload: Book): Book {
        const book = new Book();
        book.id = payload.id;
        book.name = payload.name;
        book.author = payload.author;
        book.description = payload.description;
        book.image = payload.image;
        book.price = payload.price;
        book.owner = context.sender;
        return book;
    }

    public incrementSoldAmount(): void {
        this.sold = this.sold + 1;
    }
}