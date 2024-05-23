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
      <div className="main-wrap">
        <main id="main" role="main">
          {props.children}
        </main>
      </div>
      <div className="footer-wrap">
        <Footer />
      </div>
    </>
  );
};

export default Main;
