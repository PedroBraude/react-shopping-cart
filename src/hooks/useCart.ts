import { db } from '../data/db';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { CartItem, Guitar } from '../types';

export const useCart = () => {
  // Cuando recargás la página cart empieza vacío y el useEffect se ejecuta una primera seteando localstorage vacío. Por eso se agrega un initial state para que chequee primero que hay en local storage.
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const notify = (message: string) => toast(message);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Guitar) => {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) {
        notify(`No puedes agregar más de cinco "${item.name}" al carrito`);
        return;
      }
      // add elements with a state copy
      const updatedCart = [...cart];

      updatedCart[itemExists].quantity++; // itemExists is the  item position.
      setCart(updatedCart);
      notify(`Agregaste "${item.name}" al carrito`);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 }; // Converte a element with other types add quantity
      setCart([...cart, newItem]);
      notify(`Agregaste "${item.name}" al carrito`);
    }
  };

  const removeFromCart = (id: Guitar['id'], name: Guitar['name']) => {
    setCart((prevCart) =>
      prevCart.filter((guitar: Guitar) => guitar.id !== id)
    );
    notify(`Eliminaste "${name}" del carrito`);
  };

  const increaseQuantity = (id: Guitar['id']) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: Guitar['id']) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
