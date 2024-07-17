import React, { useState, useEffect } from 'react';
import { palabrasNivel3 } from './palabras';
import { frasesNivel4 } from './frases';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const vocales = ['a', 'e', 'i', 'o', 'u'];


const combinacionesDosLetras = {
  "vc": [
    "al", "as", "an", "ar", "el", "en", "es", "et", "il", "in", "is", "it", "ol", "on", "or", "os", "ot", "ul", "un", "ur"
  ],
  "cv": [
    "ba", "be", "bi", "bo", "bu", "ca", "ce", "ci", "co", "cu", "da", "de", "di", "do", "du", "fa", "fe", "fi", "fo", "fu",
    "ga", "ge", "gi", "go", "gu", "ja", "je", "ji", "jo", "ju", "la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "mu",
    "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po", "pu", "ra", "re", "ri", "ro", "ru", "sa", "se", "si", "so", "su",
    "ta", "te", "ti", "to", "tu", "va", "ve", "vi", "vo", "vu", "ya", "ye", "yi", "yo", "yu", "za", "ze", "zi", "zo", "zu"
  ],
  "vv": [
    "ai", "au", "ei", "eu", "ia", "ie", "io", "iu", "oi", "ou", "ua", "ue", "ui", "uo"
  ],
  "cc": [
    "br", "bl", "cr", "cl", "dr", "fr", "fl", "gr", "gl", "pr", "pl", "tr", "tl"
  ]
};

const combinacionesTresLetras = {
  // Consonante + Vocal + Consonante (CVC)
  cvc: [
    'pan', 'sol', 'luz', 'mar', 'dos', 'fin', 'ves', 'dar', 'mes', 'sal',
    'bol', 'pez', 'red', 'sed', 'sur', 'paz', 'voz', 'fes', 'cal', 'pis',
    'casa', 'pata', 'sapo', 'lomo', 'luna', 'mesa', 'rama', 'taza', 'bola', 'duda'
  ],
  // Consonante + Diptongo (CD)
  cd: [
    'pie', 'fue', 'dio', 'vio', 'tia', 'mio', 'rie', 'soy', 'hoy', 'muy',
    'rey', 'ley', 'buey', 'guay', 'cien', 'bien', 'sien', 'fiel', 'miel', 'piau'
  ],
  // Grupo Consonántico + Vocal (GCV)
  gcv: [
    'pla', 'pre', 'tri', 'clo', 'gru', 'bra', 'fle', 'dri', 'glo', 'cru',
    'tra', 'ble', 'pli', 'fro', 'gra', 'cre', 'pri', 'tro', 'bru', 'fla'
  ],
  // Vocal + Consonante + Vocal (VCV)
  vcv: [
    'ala', 'ele', 'ilo', 'oto', 'unu', 'ara', 'ere', 'iri', 'oro', 'uru',
    'alo', 'eli', 'ilo', 'olo', 'ulu', 'amo', 'emo', 'imo', 'umo', 'emo'
  ],
  // Consonante + Vocal + Vocal (CVV)
  cvv: [
    'cao', 'lie', 'mio', 'rue', 'bue', 'pio', 'que', 'cio', 'dio', 'tue',
    'fie', 'lio', 'sio', 'cue', 'nie', 'mio', 'lie', 'tio', 'vie', 'lua'
  ]
};


const generarSilabaSimple = () => {
  const tipos = ['vc', 'cv'];
  const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];
  const combinacionAleatoria = combinacionesDosLetras[tipoAleatorio][Math.floor(Math.random() * combinacionesDosLetras[tipoAleatorio].length)];
  
  if (tipoAleatorio === 'vc') {
    return {
      consonante: combinacionAleatoria[1],
      vocal: combinacionAleatoria[0]
    };
  } else {
    return {
      consonante: combinacionAleatoria[0],
      vocal: combinacionAleatoria[1]
    };
  }
};

const generarContenidoNivel2 = () => {
  const categorias = Object.keys(combinacionesTresLetras);
  const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
  const combinacionAleatoria = combinacionesTresLetras[categoriaAleatoria][Math.floor(Math.random() * combinacionesTresLetras[categoriaAleatoria].length)];
  
  return {
    consonante: combinacionAleatoria.slice(0, -1),
    vocal: combinacionAleatoria.slice(-1)
  };
};

const MetodoLectura = () => {
  const [nivel, setNivel] = useState(1);
  const [contenido, setContenido] = useState({ consonante: 'e', vocal: 'r' });
  const [colorConsonante, setColorConsonante] = useState('');

const generarContenido = () => {
  let nuevoContenido;
  try {
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
  } catch (error) {
    console.error("Error generando contenido:", error);
    nuevoContenido = { consonante: 'e', vocal: 'r' }; // Valor por defecto en caso de error
  }
  
  setContenido(nuevoContenido);
  setColorConsonante(colores[Math.floor(Math.random() * colores.length)]);
};

  useEffect(() => {
    generarContenido();
  }, [nivel]);

const renderContenido = () => {
  if (!contenido) {
    return <span style={{fontSize: '6rem'}}>Error</span>;
  }

  const renderLetra = (letra, index) => (
    <span 
      key={index} 
      style={{
        color: vocales.includes(letra.toLowerCase()) ? 'black' : colorConsonante,
        fontSize: nivel === 4 ? '3rem' : '6rem',
        display: 'inline-block',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {letra}
    </span>
  );

  if ('frase' in contenido || 'palabra' in contenido) {
    const texto = contenido.frase || contenido.palabra;
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.5rem',
        maxWidth: '100%',
        overflowWrap: 'break-word'
      }}>
        {texto.split('').map(renderLetra)}
      </div>
    );
  } else if ('consonante' in contenido && 'vocal' in contenido) {
    return (
      <>
        {contenido.consonante.split('').map((letra, index) => renderLetra(letra, 'c'+index))}
        {contenido.vocal.split('').map((letra, index) => renderLetra(letra, 'v'+index))}
      </>
    );
  } else {
    return <span style={{fontSize: '6rem'}}>Error</span>;
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold text-center py-4 bg-gray-100">Leyendo sílabas en español</h1>
      <div className="px-6 py-8">
        <div className="text-center mb-8 h-48 flex items-center justify-center">
          {renderContenido()}
        </div>
        <button 
          onClick={generarContenido} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mb-6 transition duration-300"
        >
          Nuevo Contenido
        </button>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button 
              key={n} 
              onClick={() => setNivel(n)} 
              className={`py-2 px-3 rounded-lg font-semibold transition duration-300 ${
                nivel === n 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
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
