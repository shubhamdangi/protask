import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-class">
      {" "}
      <hr /> <br />
      <p className="footer-msg">
        My ProTask by{" "}
        <a
          style={{ textDecoration: "none", color: "grey" }}
          href="https://shubhamdangi.me"
        >
          Shubham Dangi
        </a>
      </p>
    </div>
  );
}

export default Footer;
