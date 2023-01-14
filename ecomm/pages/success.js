import React from "react";
import { useState, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check your mail box for the receipt</p>
        <p className="description">
          For any questions, Please mail
          <a className="email" href="mailto:ngottakakwiri@gmail.com">
            ngottakakwiri@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
