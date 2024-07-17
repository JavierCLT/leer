import React, { useState, useEffect } from 'react';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const vocales = ['a', 'e', 'i', 'o', 'u'];
const consonantes = ['m', 'p', 's', 't', 'l', 'n', 'd', 'f', 'ch', 'll', 'j', 'r', 'b', 'h', 'z', 'x', 'c', 'd', 'f', 'g', 'k', 'l', 'qu', 'v', 'y'];

const generarSilaba = () => {
  const consonante = consonantes[Math.floor(Math.random() * consonantes.length)];
  const vocal = vocales[Math.floor(Math.random() * vocales.length)];
  return consonante + vocal;
};

const MetodoLectura = () => {
  const [silaba, setSilaba] = useState('');
  const [colorLetra1, setColorLetra1] = useState('');
  const [colorLetra2, setColorLetra2] = useState('');

  const nuevaSilaba = () => {
    setSilaba(generarSilaba());
    setColorLetra1(colores[Math.floor(Math.random() * colores.length)]);
    setColorLetra2(colores[Math.floor(Math.random() * colores.length)]);
  };

  useEffect(() => {
    nuevaSilaba();
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">Aprendamos a Leer</div>
        <div className="text-center mb-6">
          <span style={{color: colorLetra1, fontSize: '8rem'}}>{silaba[0]}</span>
          <span style={{color: colorLetra2, fontSize: '8rem'}}>{silaba[1]}</span>
        </div>
        <button onClick={nuevaSilaba} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Nueva Sílaba
        </button>
      </div>
    </div>
  );
};

export default MetodoLectura;
