import { useState, useEffect } from "react";
import { db } from "./../data/db";

const useCart = () =>{

      // persistencia en memoria
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  // extrae datos de los productos del reposiorio local DB..
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // almacena el contenido actualizado del carrito en el localStorage del navegador.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      const cartUpdate = [...cart];
      cartUpdate[itemExist].quantity++;
      setCart(cartUpdate);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function cleanCart() {
    setCart([]);
  }
  function decreaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function increaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id == id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  return{
    data,
    cart,
    addToCart,
    removeCart,
    cleanCart,
    decreaseQuantity,
    increaseQuantity,
    
  }

};

export default useCart