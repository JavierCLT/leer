import React, { useState, useEffect } from 'react';
import { palabrasNivel3 } from './palabras';
import { frasesNivel4 } from './frases';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const vocales = ['a', 'e', 'i', 'o', 'u','á','é' ,'í' ,'ó' , 'ú'];

const combinacionesDosLetras = {
  vc: [
    'al', 'an', 'ar', 'as',
    'el', 'em', 'en', 'er', 'es',
    'id', 'im', 'in', 'ir', 'is',
    'ob', 'ol', 'om', 'on', 'or', 'os',
    'ul', 'un', 'ur'
  ],
  cv: [
    'ba', 'be', 'bi', 'bo', 'bu',
    'ca', 'ce', 'ci', 'co', 'cu',
    'da', 'de', 'di', 'do', 'du',
    'fa', 'fe', 'fi', 'fo', 'fu',
    'ga', 'ge', 'gi', 'go', 'gu',
    'ja', 'je', 'ji', 'jo', 'ju',
    'ka', 'ke', 'ki', 'ko', 'ku',
    'la', 'le', 'li', 'lo', 'lu',
    'ma', 'me', 'mi', 'mo', 'mu',
    'na', 'ne', 'ni', 'no', 'nu',
    'pa', 'pe', 'pi', 'po', 'pu',
    'que', 'qui',
    'ra', 're', 'ri', 'ro', 'ru',
    'sa', 'se', 'si', 'so', 'su',
    'ta', 'te', 'ti', 'to', 'tu',
    'va', 've', 'vi', 'vo', 'vu',
    'xa', 'xe', 'xi', 'xo', 'xu',
    'ya', 'ye', 'yi', 'yo', 'yu',
    'za', 'ce', 'ci', 'zo', 'zu'
  ],
  vv: [
    'ai', 'au', 'ei', 'eu', 'ia', 'ie', 'io', 'iu', 'oi', 'ou', 'ua', 'ue', 'ui', 'uo'
  ],
};

const combinacionesTresLetras = {
  cvc: [
    'sol', 'mar', 'pan', 'sal', 'luz', 'fin', 'rey', 'voz', 'pie', 'paz', 
    'té', 'rey', 'cal', 'del', 'hay', 'mis', 'ver', 'oro', 'sur', 'zar', 
    'son', 'uno', 'dos', 'tres', 'muy', 'sin', 'las', 'por', 'más', 'ser',
    'con', 'bra', 'bre', 'bri', 'bro', 'bru',
    'cla', 'cle', 'cli', 'clo', 'clu',
    'cra', 'cre', 'cri', 'cro', 'cru',
    'dra', 'dre', 'dri', 'dro', 'dru',
    'fra', 'fre', 'fri', 'fro', 'fru',
    'gra', 'gre', 'gri', 'gro', 'gru',
    'pla', 'ple', 'pli', 'plo', 'plu',
    'pra', 'pre', 'pri', 'pro', 'pru',
    'tra', 'tre', 'tri', 'tro', 'tru',
    'bla', 'ble', 'bli', 'blo', 'blu',
    'cha', 'che', 'chi', 'cho', 'chu',
  ],
};

const generarSilabaSimple = () => {
  const tipos = ['vc', 'cv', 'vv'];
  const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];
  const combinacionAleatoria = combinacionesDosLetras[tipoAleatorio].shift();
  combinacionesDosLetras[tipoAleatorio].push(combinacionAleatoria);

  if (tipoAleatorio === 'vc') {
    return { consonante: combinacionAleatoria[1], vocal: combinacionAleatoria[0] };
  } else if (tipoAleatorio === 'cv') {
    return { consonante: combinacionAleatoria[0], vocal: combinacionAleatoria[1] };
  } else {
    return { consonante: combinacionAleatoria[0], vocal: combinacionAleatoria[1] }; // Para vv, no hay consonante
  }
};

const generarContenidoNivel2 = () => {
  const combinacionAleatoria = combinacionesTresLetras.cvc.shift();
  combinacionesTresLetras.cvc.push(combinacionAleatoria);

  return {
    consonante: combinacionAleatoria.slice(0, -1),
    vocal: combinacionAleatoria.slice(-1)
  };
};

const MetodoLectura = () => {
  const [nivel, setNivel] = useState(1);
  const [contenido, setContenido] = useState({});
  const [colorConsonante, setColorConsonante] = useState('');

  const generarContenido = () => {
    let siguiente;
    try {
      switch (nivel) {
        case 1:
          siguiente = generarSilabaSimple();
          break;
        case 2:
          siguiente = generarContenidoNivel2();
          break;
        case 3:
          siguiente = { palabra: palabrasNivel3[Math.floor(Math.random() * palabrasNivel3.length)] };
          break;
        case 4:
          siguiente = { frase: frasesNivel4[Math.floor(Math.random() * frasesNivel4.length)] };
          break;
        default:
          siguiente = generarSilabaSimple();
      }
    } catch (error) {
      console.error("Error generando contenido:", error);
      siguiente = { consonante: 'e', vocal: 'r' }; // Valor por defecto en caso de error
    }

    setContenido(siguiente);
    setColorConsonante(colores[Math.floor(Math.random() * colores.length)]);
  };

  useEffect(() => {
    generarContenido();
  }, [nivel]);

  const renderContenido = () => {
    if (!contenido) {
      return <span className="text-3xl">Error</span>;
    }

    const renderLetra = (letra, index, isLastInWord = false) => (
      <span
        key={index}
        className={nivel === 1 ? 'text-3xl' : nivel === 2 ? 'text-2xl' : nivel === 3 ? 'text-xl' : 'text-4xl'}
    style={{
      color: vocales.includes(letra.toLowerCase()) ? 'black' : colorConsonante,
      display: 'inline-block',
      fontWeight: 'bold',
      marginRight: isLastInWord && nivel === 4 ? '0.5rem' : '0',
      fontFamily: 'Andika Basic',
      textShadow: 'none' // Eliminar sombra
        }}
      >
        {letra}
      </span>
    );

    if ('frase' in contenido) {
      return (
        <div className="text-container">
          {contenido.frase.split(' ').map((palabra, idx) => (
            <div key={idx} style={{ display: 'flex', marginRight: '0.5rem' }}>
              {palabra.split('').map((letra, letraIdx, arr) =>
                renderLetra(letra, `${idx}-${letraIdx}`, letraIdx === arr.length - 1)
              )}
            </div>
          ))}
        </div>
      );
    } else if ('palabra' in contenido) {
      return (
        <div className="text-container">
          {contenido.palabra.split('').map(renderLetra)}
        </div>
      );
    } else if ('consonante' in contenido && 'vocal' in contenido) {
      return (
        <div className="text-container">
          {contenido.consonante.split('').map((letra, index) => renderLetra(letra, 'c' + index))}
          {contenido.vocal.split('').map((letra, index) => renderLetra(letra, 'v' + index))}
        </div>
      );
    } else {
      return <span className="text-3xl">Error</span>;
    }
  };

  return (
    <div className="container">
      <h1>Leyendo en Español</h1>
      {renderContenido()}
      <div className="button-container">
        <button
          onClick={generarContenido}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mb-6 transition duration-300"
        >
          Siguiente
        </button>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setNivel(n)}
              className={`py-2 px-3 rounded-lg font-semibold transition duration-300 ${nivel === n ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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
