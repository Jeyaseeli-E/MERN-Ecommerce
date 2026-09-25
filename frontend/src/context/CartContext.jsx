import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      const newQuantity = Math.min(
        product.stock,
        existingProduct.quantity + quantity
      );

      updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    }

    saveCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(
      (item) => item._id !== productId
    );

    saveCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? {
            ...item,
            quantity: Math.min(
              item.stock,
              item.quantity + 1
            ),
          }
        : item
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}