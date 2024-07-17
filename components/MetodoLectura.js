import React, { useState, useEffect } from 'react';

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
const palabrasCortas = ['sol', 'mar', 'luz', 'pan', 'flor', 'tren', 'pez', 'luna', 'casa', 'perro'];
const frasesCortas = ['El sol brilla', 'La luna es blanca', 'El perro ladra', 'La flor es roja', 'El tren va rápido'];

const generarSilabaSimple = () => {
  const randomNum = Math.random();
  
  if (randomNum < 0.2) { // 20% de probabilidad de generar una combinación vocal+consonante
    const combinacion = combinacionesVC[Math.floor(Math.random() * combinacionesVC.length)];
    return { 
      consonante: combinacion[1], 
      vocal: combinacion[0]
    };
  } else if (randomNum < 0.44) { // ~24% de probabilidad de que salga una consonante especial o 'z'
    if (Math.random() < 0.8) { // 80% de este 24% para consonantes especiales
      const consonanteEspecial = consonantesEspeciales[Math.floor(Math.random() * consonantesEspeciales.length)];
      let vocal;
      
      if (consonanteEspecial === 'qu' || consonanteEspecial === 'gu') {
        vocal = Math.random() < 0.5 ? 'e' : 'i';
      } else { // 'ch' puede ir con cualquier vocal
        vocal = vocales[Math.floor(Math.random() * vocales.length)];
      }
      
      return { consonante: consonanteEspecial, vocal };
    } else { // 20% de este 24% para 'z'
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

const generarContenidoNivel2 = () => {
  const tipo = Math.random();
  
  if (tipo < 0.33) {
    // Sílaba con grupo consonántico
    const grupo = gruposConsonantesComunes[Math.floor(Math.random() * gruposConsonantesComunes.length)];
    const vocal = vocales[Math.floor(Math.random() * vocales.length)];
    return { consonante: grupo, vocal: vocal };
  } else if (tipo < 0.66) {
    // Sílaba con diptongo
    const diptongo = diptongos[Math.floor(Math.random() * diptongos.length)];
    const consonante = consonantesNormales[Math.floor(Math.random() * consonantesNormales.length)];
    return { consonante: consonante, vocal: diptongo };
  } else {
    // Palabra bisílaba
    return { palabra: palabrasBisilabas[Math.floor(Math.random() * palabrasBisilabas.length)] };
  }
};

const MetodoLectura = () => {
  const [nivel, setNivel] = useState(1);
  const [contenido, setContenido] = useState({ consonante: '', vocal: '' });
  const [colorConsonante, setColorConsonante] = useState('');

  const nuevaSilaba = () => {
    setSilaba(generarSilaba());
    setColorConsonante(colores[Math.floor(Math.random() * colores.length)]);
  };

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
      nuevoContenido = { palabra: palabrasCortas[Math.floor(Math.random() * palabrasCortas.length)] };
      break;
    case 4:
      nuevoContenido = { frase: frasesCortas[Math.floor(Math.random() * frasesCortas.length)] };
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
  if ('frase' in contenido) {
    return (
      <span style={{fontSize: '3rem'}}>
        {contenido.frase.split('').map((letra, index) => (
          <span key={index} style={{color: vocales.includes(letra.toLowerCase()) ? 'black' : colorConsonante}}>
            {letra}
          </span>
        ))}
      </span>
    );
  } else if ('palabra' in contenido) {
    return (
      <span style={{fontSize: '4rem'}}>
        {contenido.palabra.split('').map((letra, index) => (
          <span key={index} style={{color: vocales.includes(letra.toLowerCase()) ? 'black' : colorConsonante}}>
            {letra}
          </span>
        ))}
      </span>
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
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
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
