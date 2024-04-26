import { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Guitar from './components/Guitar';

import { db } from './data/db';

export default function App() {
  const [data, setData] = useState(db);

  return (
    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            //  only with parenthesis you have an implicity return
            <Guitar key={guitar.id} {...guitar} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
