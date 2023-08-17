import React, { createContext, useEffect, useState } from "react";

type Item = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

interface CartItem extends Item {
  count: number;
}

type AppState = {
  cart: CartItem[];
};

interface BooksContextType {
  addToCart: (item: Item) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  removeFromCart: (id: number) => void;
  state: AppState;
}

type BooksContextProviderProps = {
  children: React.ReactNode; // Props for the context provider component
};

export const BooksContext = createContext<BooksContextType>({
  state: {
    cart: [],
  },
  addToCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeFromCart: () => {},
});

const BooksContextProvider: React.FC<BooksContextProviderProps> = ({
  children, // Destructuring the 'children' prop
}) => {
  const [state, setState] = useState<AppState>(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    return { cart: data };
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  const addToCart = (item: Item) => {
    setState((prevState) => {
      const existingCartItem = prevState.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingCartItem) {
        return {
          ...prevState,
          cart: prevState.cart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem } : cartItem
          ),
        };
      } else {
        return {
          ...prevState,
          cart: [...prevState.cart, { ...item, count: 1 }],
        };
      }
    });
  };

  const removeFromCart = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      cart: prevState.cart.filter((cartItem) => cartItem.id !== id), // Remove the specified item from cart
    }));
  };

  const increase = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      cart: prevState.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      ),
    }));
  };

  const decrease = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      cart: prevState.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
          : cartItem
      ),
    }));
  };

  return (
    <BooksContext.Provider
      value={{ state, addToCart, increase, decrease, removeFromCart }} // Providing the context values and functions
    >
      {children} {/* Rendering the children components */}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
