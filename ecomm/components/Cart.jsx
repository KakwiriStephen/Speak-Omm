import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../LIB/client";
import getStripe from "../LIB/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    // fetch("/api/stripe", {
    //   method: "POST",
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (session) {
    //     return stripe.redirectToCheckout({ sessionId: session.id });
    //   })
    //   .then(function (result) {
    //     // If `redirectToCheckout` fails due to a browser or network
    //     // error, you should display the localized error message to your
    //     // customer using `error.message`.
    //     if (result.error) {
    //       alert(result.error.message);
    //     }
    //   });

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  // Call your backend to create the Checkout Session
  fetch("/create-checkout-session", {
    method: "POST",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    });

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {/* empty cart */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping Bag Is Empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div flex top>
                    <h5>{item.name}</h5>
                    <h4>Ksh.{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <p className="quantity-desc">
                      <span
                        className="minus"
                        onClick={() => toggleCartItemQuanitity(item._id, "dec")}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num" onClick="">
                        {item.quantity}
                      </span>
                      <span
                        className="plus"
                        onClick={() => toggleCartItemQuanitity(item._id, "inc")}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                    <div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>Ksh{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button className="btn" type="button" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
