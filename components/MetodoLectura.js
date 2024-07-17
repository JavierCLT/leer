import React, { useState, useEffect } from 'react';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const vocales = ['a', 'e', 'i', 'o', 'u'];
const consonantesNormales = ['m', 'p', 's', 't', 'l', 'n', 'd', 'f', 'ch', 'll', 'j', 'r', 'b', 'h', 'z', 'x', 'c', 'd', 'f', 'g', 'k', 'l', 'v', 'y'];

const generarSilaba = () => {
const consonantesEspeciales = ['qu', 'gu', 'ch'];
const consonantesNormales = ['m', 'p', 's', 't', 'l', 'n', 'd', 'f', 'j', 'r', 'b', 'h', 'x', 'c', 'v', 'y'];
const vocales = ['a', 'e', 'i', 'o', 'u'];

const generarSilaba = () => {
  if (Math.random() < 0.25) { // 25% de probabilidad de que salga una consonante especial o 'z'
    if (Math.random() < 0.8) { // 80% de este 25% para consonantes especiales
      const consonanteEspecial = consonantesEspeciales[Math.floor(Math.random() * consonantesEspeciales.length)];
      let vocal;
      
      if (consonanteEspecial === 'qu' || consonanteEspecial === 'gu') {
        vocal = Math.random() < 0.5 ? 'e' : 'i';
      } else { // 'ch' puede ir con cualquier vocal
        vocal = vocales[Math.floor(Math.random() * vocales.length)];
      }
      
      return { consonante: consonanteEspecial, vocal };
    } else { // 20% de este 25% para 'z'
      const vocalesParaZ = ['a', 'o', 'u'];
      return {
        consonante: 'z',
        vocal: vocalesParaZ[Math.floor(Math.random() * vocalesParaZ.length)]
      };
    }
  } else {
    const consonante = consonantesNormales[Math.floor(Math.random() * consonantesNormales.length)];
    const vocal = vocales[Math.floor(Math.random() * vocales.length)];
    return { consonante, vocal };
  }
};

const MetodoLectura = () => {
  const [silaba, setSilaba] = useState({ consonante: '', vocal: '' });
  const [colorConsonante, setColorConsonante] = useState('');

  const nuevaSilaba = () => {
    setSilaba(generarSilaba());
    setColorConsonante(colores[Math.floor(Math.random() * colores.length)]);
  };

  useEffect(() => {
    nuevaSilaba();
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="text-center mb-6">
          <span style={{color: colorConsonante, fontSize: '8rem'}}>{silaba.consonante}</span>
          <span style={{color: 'black', fontSize: '8rem'}}>{silaba.vocal}</span>
        </div>
        <button onClick={nuevaSilaba} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Nueva Sílaba
        </button>
      </div>
    </div>
  );
};

export default MetodoLectura;
