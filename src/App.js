import "regenerator-runtime/runtime";
import React, { useEffect, useCallback, useState } from "react";
import { login, logout, accountBalance } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Landing from "./components/Landing";

export default function App() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <Router>
      {account.accountId ? (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/" className="justify-content-end pt-3 pb-5">
              NEAR Book Store
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link href="/AddBook">Add a Book</Nav.Link>
              </Nav>
              <Nav className="me-auto"> </Nav>
              <Nav>
                <Nav.Link>{window.accountId} </Nav.Link>
              </Nav>
              <Nav className="me-auto"> </Nav>
              <Nav>
                <Nav.Link>{balance} NEAR</Nav.Link>
                <Nav.Link onClick={window.accountId === "" ? login : logout}>
                  {window.accountId === "" ? "Login" : "Logout"}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Landing name="Near Store" login={login} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              {" "}
              <Home />{" "}
            </Container>
          }
        />
        <Route path="/AddBook" element={<AddBook />} />
      </Routes>
    </Router>
  );
}
