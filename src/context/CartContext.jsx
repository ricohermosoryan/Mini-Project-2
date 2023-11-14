import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const updateCart = (newCart) => {
    setItems(newCart);
    localStorage.setItem("items", JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const newCart = [...items, product];
    updateCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...items];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const removeAllFromCart = () => {
    const newCart = [...items];
    newCart.splice(0);
    updateCart(newCart);
  };

  const incrementQuantity = (index) => {
    const newCart = [...items];
    newCart[index].quantity++;
    updateCart(newCart);
  };

  const decrementQuantity = (index) => {
    const newCart = [...items];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
      updateCart(newCart);
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("items"));
    if (storedCart) {
      setItems(storedCart);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
