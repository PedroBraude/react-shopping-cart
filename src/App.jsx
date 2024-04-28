import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Guitar from './components/Guitar';

import { db } from './data/db';

export default function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  const notify = (message) => toast(message);

  const addToCart = (item) => {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      // add elements with a state copy
      const updatedCart = [...cart];

      updatedCart[itemExists].quantity++; // itemExists is the  item position.
      setCart(updatedCart);
      notify(`Ahora tienes ${item.quantity} "${item.name}" en  el carrito`);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
      notify(`Ahora tienes ${item.quantity} "${item.name}" en  el carrito`);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    notify(`Eliminado el elemento ID ${id}`);
  };
  return (
    <>
      <ToastContainer position="top-left" closeOnClick theme="light" />
      <Header cart={cart} removeFromCart={removeFromCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            //  only with parenthesis you have an implicity return
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
