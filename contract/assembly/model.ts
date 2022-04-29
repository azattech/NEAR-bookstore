import { PersistentUnorderedMap, math, context, u128 } from "near-sdk-as";


/**
 * booksStorage - it's a key-value datastructure that is used to store books by sellers.
 * PersistentUnorderedMap - similar to PersistentMap but with useful additional functions 
 * that allow us to iterate over keys, values, entries.
 * The string LISTED_BOOKS in the PersistentUnorderedMap's constructor is the unique prefix to use for every key.
 */
export const booksStorage = new PersistentUnorderedMap<u32, Book>("LISTED_BOOKS");



/**
 * Book class represents a book that can be listed on a bookstore.
 * It contains basic properties that are needed to define a book.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class Book{
    id: u32;
    name: string;
    author: string;
    description: string;
    image: string;
    price: u128;
    owner: string;
    sold: u32;

    constructor(name: string, author: string, description: string, image: string, price: u128) {
        this.id = math.hash32<string>(name);
        this.name = name;
        this.author = author;
        this.description = description;
        this.image = image;
        this.price = price;
        this.owner = context.sender;
    }

    public incrementSoldAmount(): void {
        this.sold = this.sold + 1;
    }
}