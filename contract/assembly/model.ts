import { PersistentUnorderedMap, context, PersistentMap, u128 } from "near-sdk-as";


export const booksStorage = new PersistentUnorderedMap<string, Book>("LISTED_BOOKS");

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