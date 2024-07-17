import React, { useState, useEffect } from 'react';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

Copyconst generarSilaba = () => {
  const consonantesNormales = ['m', 'p', 's', 't', 'l', 'n', 'd', 'f', 'ch', 'll', 'j', 'r', 'b', 'h', 'z', 'x', 'c', 'd', 'f', 'g', 'k', 'l', 'v', 'y'];
  const vocales = ['a', 'e', 'i', 'o', 'u'];
  
  // Añadimos una probabilidad de que salga "qu"
  if (Math.random() < 0.1) { // 10% de probabilidad de que salga "qu"
    const vocalSinU = vocales.filter(v => v !== 'u');
    return "qu" + vocalSinU[Math.floor(Math.random() * vocalSinU.length)];
  } else {
    const consonante = consonantesNormales[Math.floor(Math.random() * consonantesNormales.length)];
    const vocal = vocales[Math.floor(Math.random() * vocales.length)];
    return consonante + vocal;
  }
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
