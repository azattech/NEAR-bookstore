import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addBook } from "../utils";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const isFormFilled = () => name && author && description && image && price;

  const data = {
    name: name,
    author: author,
    description: description,
    image: image,
    price: price,
  };

  // to add book to near protocol
  const saveBook = async () => {
    try {
      addBook(data).then((resp) => {});
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter the book name"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            placeholder="Enter the author name"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter the description"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book Url</Form.Label>
          <Form.Control
            onChange={(e) => {
              setImage(e.target.value);
            }}
            placeholder="Enter the book image url"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="Enter the price"
          ></Form.Control>
        </Form.Group>
      </Form>

      <Button
        variant="primary"
        disabled={!isFormFilled()}
        onClick={() => {
          saveBook();
          navigate("/");
        }}
      >
        Save book
      </Button>
    </Container>
  );
}
