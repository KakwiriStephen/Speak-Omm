import React from "react";
import { useState, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  const [order, setOrder] = useState(null);
  return <div>success</div>;
};

export default Success;
