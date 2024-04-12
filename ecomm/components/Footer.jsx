import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <div className="footer-container">
      <p> Copyright © {year} Team Pricewise</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
