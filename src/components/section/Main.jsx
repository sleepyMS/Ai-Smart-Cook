import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import "./Section.css";

const Main = (props) => {
  return (
    <>
      <Header />
      <Nav />
      <main id="main" role="main">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Main;
