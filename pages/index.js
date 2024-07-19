import React from 'react';
import MetodoLectura from '../components/MetodoLectura';

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Andika Basic', fontSize: '2rem', color: '#333' }}>Leyendo en Español</h1>
      <MetodoLectura />
    </div>
  );
};

export default Home;
