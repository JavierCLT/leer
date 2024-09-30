const colores = ['#c1121f', '#2a9d8f', '#e9c46a', '#219ebc', '#f4a261', '#e76f51'];
const vocales = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
let lastConsonantColor = '';  // Track the last consonant color applied

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
    'ha', 'he', 'hi', 'ho', 'hu',
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

const palabrasNivel3 = [
  'casa', 'perro', 'gato', 'árbol', 'flor', 'sol', 'luna', 'estrella',
  'agua', 'fuego', 'tierra', 'aire', 'libro', 'mesa', 'silla', 'cama',
  'puerta', 'ventana', 'coche', 'bici', 'tren', 'avión', 'barco', 'pez',
  'pájaro', 'mano', 'pie', 'ojo', 'nariz', 'boca', 'oreja', 'diente',
  'pelo', 'brazo', 'pierna', 'dedo', 'uña', 'corazón', 'cerebro', 'hueso',
  'rojo', 'azul', 'verde', 'amarillo', 'blanco', 'negro', 'rosa', 'naranja',
  'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'
];

const frasesNivel4 = [
  'El sol brilla', 'La luna es blanca', 'El perro ladra', 'El gato maulla',
  'La flor es roja', 'El cielo es azul', 'La casa es grande', 'El árbol es alto',
  'El pez nada', 'El pájaro vuela', 'La niña corre', 'El niño salta',
  'La mesa es marrón', 'La silla es verde', 'El libro es nuevo',
  'La puerta está abierta', 'La ventana está cerrada', 'El coche es rápido',
  'La bici es pequeña', 'El tren es largo', 'Una casa bonita',
  'La pared es blanca', 'Un parque para niños', 'Un libro pequeño',
  'Mi amigo se llama Michael', 'Mi padre es mayor que yo',
  'Mis zapatos están limpios', 'La moto hace mucho ruido'
];

class MetodoLectura {
  constructor() {
    this.nivel = 1;
    this.contenido = {};
    this.consonantColors = {};
    this.colorIndex = 0;
    this.init();
  }

  init() {
    this.generarContenido();
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    document.getElementById('nextButton').addEventListener('click', () => this.generarContenido());
    document.querySelectorAll('.level-button').forEach(button => {
      button.addEventListener('click', (e) => this.setNivel(parseInt(e.target.dataset.level)));
    });
  }

  generarSilabaSimple() {
    const tipos = ['vc', 'cv', 'vv'];
    const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];
    const combinacionAleatoria = combinacionesDosLetras[tipoAleatorio].shift();
    combinacionesDosLetras[tipoAleatorio].push(combinacionAleatoria);

    if (tipoAleatorio === 'vc') {
      return { consonante: combinacionAleatoria[1], vocal: combinacionAleatoria[0] };
    } else if (tipoAleatorio === 'cv') {
      return { consonante: combinacionAleatoria[0], vocal: combinacionAleatoria[1] };
    } else {
      return { consonante: combinacionAleatoria[0], vocal: combinacionAleatoria[1] };
    }
  }

  generarContenidoNivel2() {
    const combinacionAleatoria = combinacionesTresLetras.cvc.shift();
    combinacionesTresLetras.cvc.push(combinacionAleatoria);

    return {
      consonante: combinacionAleatoria.slice(0, -1),
      vocal: combinacionAleatoria.slice(-1)
    };
  }

  generarContenido() {
    let siguiente;
    try {
      switch (this.nivel) {
        case 1:
          siguiente = this.generarSilabaSimple();
          break;
        case 2:
          siguiente = this.generarContenidoNivel2();
          break;
        case 3:
          siguiente = { palabra: palabrasNivel3[Math.floor(Math.random() * palabrasNivel3.length)] };
          break;
        case 4:
          siguiente = { frase: frasesNivel4[Math.floor(Math.random() * frasesNivel4.length)] };
          break;
        default:
          siguiente = this.generarSilabaSimple();
      }
    } catch (error) {
      console.error("Error generando contenido:", error);
      siguiente = { consonante: 'e', vocal: 'r' };
    }

    this.contenido = siguiente;
    this.render();
  }

  setNivel(newNivel) {
    this.nivel = newNivel;
    this.generarContenido();
    this.updateLevelButtons();
  }

  updateLevelButtons() {
    document.querySelectorAll('.level-button').forEach(button => {
      const buttonLevel = parseInt(button.dataset.level);
      if (buttonLevel === this.nivel) {
        button.classList.add('active-level');
      } else {
        button.classList.remove('active-level');
      }
    });
  }

  
  
  getConsonantColor(consonant) {
  // Handle special cases like "ch", "ll", "rr", "cc"
  if (consonant.toLowerCase() === 'ch' || consonant.toLowerCase() === 'll' || consonant.toLowerCase() === 'rr' || consonant.toLowerCase() === 'cc') {
    consonant = consonant.toLowerCase();
  }

  if (!this.consonantColors[consonant]) {
    let newColor;
    // Ensure new color is not the same as the last applied consonant color
    do {
      newColor = colores[this.colorIndex];
      this.colorIndex = (this.colorIndex + 1) % colores.length;
    } while (newColor === lastConsonantColor);  // Avoid assigning the same color consecutively
    
    this.consonantColors[consonant] = newColor;
    lastConsonantColor = newColor;  // Set the last consonant color
  }

  return this.consonantColors[consonant];
}

  renderLetra(letra, index, isLastInWord = false) {
  const span = document.createElement('span');
  
  // Detect if "ch", "ll", "rr", or "cc" is at this position and treat them as a unit
  const nextLetra = this.contenido.consonante && this.contenido.consonante[index + 1];
  
  // Handle special consonant combinations
  if ((letra === 'c' && nextLetra === 'h') || 
      (letra === 'l' && nextLetra === 'l') ||
      (letra === 'r' && nextLetra === 'r') ||
      (letra === 'c' && nextLetra === 'c')) {
    letra = letra + nextLetra;  // Combine the special case into a single unit
    this.contenido.consonante = this.contenido.consonante.slice(0, index + 1) + this.contenido.consonante.slice(index + 2); // Skip the next letter
  }

  span.textContent = letra;

  // Check if the letter is a consonant
  const isConsonant = !vocales.includes(letra.toLowerCase());
  
  if (isConsonant) {
    span.style.color = this.getConsonantColor(letra.toLowerCase());
  } else {
    span.style.color = 'black';
  }

  span.style.display = 'inline-block';
  span.style.fontWeight = 'bold';
  span.style.marginRight = isLastInWord && this.nivel === 4 ? '1rem' : '0';
  span.style.fontFamily = 'Andika Basic';
  span.style.textShadow = 'none';
  span.className = this.nivel === 1 ? 'text-3xl' : this.nivel === 2 ? 'text-2xl' : this.nivel === 3 ? 'text-xl' : 'text-4xl';

  return span;
}

  renderContenido() {
    const container = document.getElementById('contenidoContainer');
    container.innerHTML = '';
    container.className = `text-container ${this.nivel === 4 ? 'margin-left' : ''}`;

    if ('frase' in this.contenido) {
      this.contenido.frase.split(' ').forEach((palabra, idx) => {
        const palabraDiv = document.createElement('div');
        palabraDiv.style.display = 'flex';
        palabraDiv.style.marginRight = '1rem';
        palabra.split('').forEach((letra, letraIdx, arr) => {
          palabraDiv.appendChild(this.renderLetra(letra, `${idx}-${letraIdx}`, letraIdx === arr.length - 1));
        });
        container.appendChild(palabraDiv);
      });
    } else if ('palabra' in this.contenido) {
      this.contenido.palabra.split('').forEach((letra, index) => {
        container.appendChild(this.renderLetra(letra, index));
      });
    } else if ('consonante' in this.contenido && 'vocal' in this.contenido) {
      this.contenido.consonante.split('').forEach((letra, index) => {
        container.appendChild(this.renderLetra(letra, 'c' + index));
      });
      this.contenido.vocal.split('').forEach((letra, index) => {
        container.appendChild(this.renderLetra(letra, 'v' + index));
      });
    } else {
      const errorSpan = document.createElement('span');
      errorSpan.textContent = 'Error';
      errorSpan.className = 'text-3xl';
      container.appendChild(errorSpan);
    }
  }

  render() {
    this.renderContenido();
    this.updateLevelButtons();
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MetodoLectura();
});
