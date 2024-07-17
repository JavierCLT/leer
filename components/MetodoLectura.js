import React, { useState, useEffect } from 'react';
import { palabrasNivel3 } from './palabras';
import { frasesNivel4 } from './frases';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const vocales = ['a', 'e', 'i', 'o', 'u'];
const consonantesEspeciales = ['qu', 'gu', 'ch'];
const consonantesNormales = ['m', 'p', 's', 't', 'l', 'n', 'd', 'f', 'j', 'r', 'b', 'h', 'x', 'c', 'v', 'y'];
const combinacionesVC = [
  'an', 'en', 'in', 'on', 'un',
  'as', 'es', 'is', 'os', 'us',
  'al', 'el', 'il', 'ol', 'ul',
  'ar', 'er', 'ir', 'or', 'ur',
  'ad', 'ed', 'id', 'ud',
  'az', 'ez', 'iz', 'oz', 'uz'
];

const gruposConsonantesComunes = ['br', 'bl', 'cr', 'cl', 'dr', 'fl', 'fr', 'gr', 'gl', 'pr', 'pl', 'tr'];
const diptongos = ['ia', 'ie', 'io', 'iu', 'ai', 'ei', 'oi', 'ui', 'au', 'eu', 'ou'];
const palabrasBisilabas = ['casa', 'perro', 'mesa', 'silla', 'libro', 'árbol', 'pato', 'gato', 'oso', 'ala', 'uva', 'isla', 'nube', 'rosa', 'pera'];

const generarSilabaSimple = () => {
  const randomNum = Math.random();
  
  if (randomNum < 0.2) { // 20% de probabilidad de generar una combinación vocal+consonante
    const combinacion = combinacionesVC[Math.floor(Math.random() * combinacionesVC.length)];
    return { 
      consonante: combinacion[1], 
      vocal: combinacion[0]
    };
  } else if (randomNum < 0.4) { // 20% de probabilidad de empezar con vocal
    const vocal = vocales[Math.floor(Math.random() * vocales.length)];
    const consonante = consonantesNormales[Math.floor(Math.random() * consonantesNormales.length)];
    return { consonante: '', vocal: vocal + consonante };
  } else if (randomNum < 0.64) { // ~24% de probabilidad de que salga una consonante especial o 'z'
    // ... (mantén el código existente para consonantes especiales y 'z')
  } else {
    const consonante = consonantesNormales[Math.floor(Math.random() * consonantesNormales.length)];
    const vocal = vocales[Math.floor(Math.random() * vocales.length)];
    return { consonante, vocal };
  }
};

const generarContenidoNivel2 = () => {
  const tipo = Math.random();
  
  if (tipo < 0.5) {
    // Sílaba con grupo consonántico
    const grupo = gruposConsonantesComunes[Math.floor(Math.random() * gruposConsonantesComunes.length)];
    const vocal = vocales[Math.floor(Math.random() * vocales.length)];
    return { consonante: grupo, vocal: vocal };
  } else {
    // Sílaba con diptongo
    const diptongo = diptongos[Math.floor(Math.random() * diptongos.length)];
    const consonante = consonantesNormales[Math.floor(Math.random() * consonantesNormales.length)];
    return { consonante: consonante, vocal: diptongo };
  }
};

const MetodoLectura = () => {
  const [nivel, setNivel] = useState(1);
  const [contenido, setContenido] = useState({ consonante: '', vocal: '' });
  const [colorConsonante, setColorConsonante] = useState('');

  const generarContenido = () => {
    let nuevoContenido;
    switch(nivel) {
      case 1:
        nuevoContenido = generarSilabaSimple();
        break;
      case 2:
        nuevoContenido = generarContenidoNivel2();
        break;
      case 3:
        nuevoContenido = { palabra: palabrasNivel3[Math.floor(Math.random() * palabrasNivel3.length)] };
        break;
      case 4:
        nuevoContenido = { frase: frasesNivel4[Math.floor(Math.random() * frasesNivel4.length)] };
        break;
      default:
        nuevoContenido = generarSilabaSimple();
    }
    setContenido(nuevoContenido);
    setColorConsonante(colores[Math.floor(Math.random() * colores.length)]);
  };

  useEffect(() => {
    generarContenido();
  }, [nivel]);

const renderContenido = () => {
  const renderLetra = (letra, index) => (
    <span key={index} style={{color: vocales.includes(letra.toLowerCase()) ? 'black' : colorConsonante, fontSize: '8rem', display: 'inline-block'}}>
      {letra}
    </span>
  );

  if ('frase' in contenido) {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.5rem',
        maxWidth: '100%',
        overflowWrap: 'break-word'
      }}>
        {contenido.frase.split(' ').map((palabra, idx) => (
          <div key={idx} style={{display: 'flex'}}>
            {palabra.split('').map(renderLetra)}
          </div>
        ))}
      </div>
    );
  } else if ('palabra' in contenido) {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '100%',
        overflowWrap: 'break-word'
      }}>
        {contenido.palabra.split('').map(renderLetra)}
      </div>
    );
  } else {
    return (
      <>
        <span style={{color: colorConsonante, fontSize: '8rem'}}>{contenido.consonante}</span>
        <span style={{color: 'black', fontSize: '8rem'}}>{contenido.vocal}</span>
      </>
    );
  }
};


  return (
    <div className="max-w-full mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <div className="px-6 py-4">
        <div className="text-center mb-6">
          {renderContenido()}
        </div>
        <button onClick={generarContenido} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Nuevo Contenido
        </button>
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((n) => (
            <button 
              key={n} 
              onClick={() => setNivel(n)} 
              className={`px-4 py-2 rounded ${nivel === n ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              Nivel {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MetodoLectura;
