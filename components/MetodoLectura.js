import React, { useState, useEffect } from 'react';
import { palabrasNivel3 } from './palabras';
import { frasesNivel4 } from './frases';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const vocales = ['a', 'e', 'i', 'o', 'u'];

const combinacionesDosLetras = {
vc: [
    'ab', 'ad', 'ag', 'al', 'am', 'an', 'ar', 'as',
    'eb', 'ed', 'el', 'em', 'en', 'er', 'es',
    'ib', 'id', 'il', 'im', 'in', 'ir', 'is',
    'ob', 'od', 'ol', 'om', 'on', 'or', 'os',
    'ub', 'ud', 'ul', 'um', 'un', 'ur', 'us'
  ],
  cv: 
    [
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
    'wa', 'we', 'wi', 'wo', 'wu',
    'xa', 'xe', 'xi', 'xo', 'xu',
    'ya', 'ye', 'yi', 'yo', 'yu',
    'za', 'ce', 'ci', 'zo', 'zu'
  ],
  
  vv: [
    'ai', 'au', 'ei', 'eu', 'ia', 'ie', 'io', 'iu', 'oi', 'ou', 'ua', 'ue', 'ui', 'uo'
  ],
  
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

  return {
    consonante: tipoAleatorio === 'vc' ? combinacionAleatoria[1] : combinacionAleatoria[0],
    vocal: tipoAleatorio === 'vc' ? combinacionAleatoria[0] : combinacionAleatoria[1]
  };
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
  const [contenido, setContenido] = useState({});
  const [colorConsonante, setColorConsonante] = useState('');

  const generarContenido = () => {
    let siguiente;
    try {
      switch(nivel) {
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
      return <span style={{ fontSize: '6rem' }}>Error</span>;
    }

    const renderLetra = (letra, index, isLastInWord = false) => (
      <span
        key={index}
        style={{
          color: vocales.includes(letra.toLowerCase()) ? 'black' : colorConsonante,
          fontSize: nivel === 4 ? '2.5rem' : '6rem',
          display: 'inline-block',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          marginRight: isLastInWord && nivel === 4 ? '0.2rem' : '0'
        }}
      >
        {letra}
      </span>
    );

    if ('frase' in contenido) {
      return (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.2rem',
          maxWidth: '100%',
          overflowWrap: 'break-word',
          minHeight: '12rem'
        }}>
          {contenido.frase.split(' ').map((palabra, idx) => (
            <div key={idx} style={{ display: 'flex', marginRight: '0.2rem' }}>
              {palabra.split('').map((letra, letraIdx, arr) =>
                renderLetra(letra, `${idx}-${letraIdx}`, letraIdx === arr.length - 1)
              )}
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
    } else if ('consonante' in contenido && 'vocal' in contenido) {
      return (
        <>
          {contenido.consonante.split('').map((letra, index) => renderLetra(letra, 'c' + index))}
          {contenido.vocal.split('').map((letra, index) => renderLetra(letra, 'v' + index))}
        </>
      );
    } else {
      return <span style={{ fontSize: '6rem' }}>Error</span>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-8 py-10">
        <div className="text-center mb-8 min-h-[12rem] flex items-center justify-center">
          {renderContenido()}
        </div>
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
