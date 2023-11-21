import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setItems(storedCart);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const user_id = localStorage.getItem("_id");
        if (!user_id) {
          throw new Error("User ID not found in localStorage. Please log in.");
        }

        const response = await fetch(`https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/cart/${user_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart data.");
        }

        const { cart } = await response.json();

        // Transform the fetched API cart data to match the localStorage structure
        const transformedCart = cart.map(item => ({
          product: item.product.id,
          quantity: item.quantity
        }));

        setItems(transformedCart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const updateCartOnServer = async (updatedCart) => {
    try {
      const user_id = localStorage.getItem("_id");
      if (!user_id) {
        throw new Error("User ID not found. Please log in.");
      }

      const response = await axios.patch(`https://cupmvawskf.execute-api.ap-southeast-2.amazonaws.com/users/${user_id}`, {
        cart: updatedCart
      });

      if (!response.data.success) {
        throw new Error("Failed to update cart on the server.");
      }

      // Optionally update local state or perform other actions upon successful update
    } catch (error) {
      console.error("Error updating cart on the server:", error);
      // Handle error - Display an error message or perform necessary actions
    }
  };

  const addToCart = (product) => {
    try {
      const newCart = [...items, product];
      setItems(newCart); // Update cart in local state

      localStorage.setItem("cart", JSON.stringify(newCart)); // Update cart in localStorage

      updateCartOnServer(newCart); // Sync cart with the server
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error - Display an error message or perform necessary actions
    }
  };

  const removeFromCart = (index) => {
    try {
      const newCart = [...items];
      newCart.splice(index, 1);
      setItems(newCart); // Update cart in local state

      localStorage.setItem("cart", JSON.stringify(newCart)); // Update cart in localStorage

      updateCartOnServer(newCart); // Sync cart with the server
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Handle error - Display an error message or perform necessary actions
    }
  };

  const removeAllFromCart = () => {
    try {
      const newCart = []; // Create an empty array to clear the cart
      setItems(newCart); // Update cart in local state

      localStorage.setItem("cart", JSON.stringify(newCart)); // Update cart in localStorage

      updateCartOnServer(newCart); // Sync cart with the server
    } catch (error) {
      console.error("Error removing all items from cart:", error);
      // Handle error - Display an error message or perform necessary actions
    }
  };

  const incrementQuantity = (index) => {
    try {
      const newCart = [...items]; // Create a copy of the current cart
      newCart[index].quantity++; // Increment the quantity of the item at the specified index
      setItems(newCart); // Update cart in local state

      localStorage.setItem("cart", JSON.stringify(newCart)); // Update cart in localStorage

      updateCartOnServer(newCart); // Sync cart with the server
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      // Handle error - Display an error message or perform necessary actions
    }
  };

  const decrementQuantity = (index) => {
    try {
      const newCart = [...items]; // Create a copy of the current cart
      if (newCart[index].quantity > 1) {
        newCart[index].quantity--; // Decrement the quantity if it's greater than 1
        setItems(newCart); // Update cart in local state

        localStorage.setItem("cart", JSON.stringify(newCart)); // Update cart in localStorage

        updateCartOnServer(newCart); // Sync cart with the server
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
      // Handle error - Display an error message or perform necessary actions
    }
  };

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
