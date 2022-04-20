import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack, Container } from "react-bootstrap";
import { buyBook } from "../utils";

const Book = ({ book }) => {
  const { id, price, name, description, sold, author, image, owner } = book;

  // to buy a book
  const buy = async () => {
    try {
      await buyBook({
        id,
        price,
      }).then((resp) => console.log(resp));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <Col key={id}>
      <Container>
        <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <span className="font-monospace text-secondary">{owner}</span>
              <Badge bg="secondary" className="ms-auto">
                {sold} Sold
              </Badge>
            </Stack>
          </Card.Header>
          <div className=" ratio ratio-4x3">
            <img src={image} alt={name} style={{ objectFit: "cover" }} />
          </div>
          <Card.Body className="d-flex  flex-column text-center">
            <Card.Title>{name}</Card.Title>
            <Card.Text className="flex-grow-1 ">{description}</Card.Text>
            <Card.Text className="text-secondary">
              <span>{author}</span>
            </Card.Text>
            <Button variant="outline-dark" onClick={buy} className="w-100 py-3">
              Buy for {utils.format.formatNearAmount(price)} NEAR
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Col>
  );
};

Book.propTypes = {
  book: PropTypes.instanceOf(Object).isRequired,
};

export default Book;
