import React, { useState, useEffect } from "react";
import { getBooks, buyBook } from "../utils";
import { Row } from "react-bootstrap";
import Loader from "./Loader";
import Book from "./Book";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const getAllBooks = async () => {
    try {
      setLoading(true);
      getBooks().then((resp) => {
        setAllBooks(resp);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {allBooks.map((_book) => (
              <Book key={_book.id} book={_book} />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
