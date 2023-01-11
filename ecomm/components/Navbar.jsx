import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">{<BsSoundwave />}Sounds Store</Link>
      </p>

      <button type="button" className="cart-icon" onClick="">
        <AiOutlineShopping />

        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
