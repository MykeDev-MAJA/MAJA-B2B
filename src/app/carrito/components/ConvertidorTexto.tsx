// Configuración de números en español
const NUMEROS_CONFIG = {
  unidades: ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'],
  decenas: ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'],
  decenasCompuestas: ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'],
  centenas: ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos']
} as const;

/**
 * Convierte un grupo de números (1-999) a texto en español
 * @param numero - Número a convertir (debe estar entre 0 y 999)
 * @returns Texto representando el número en español
 */
const convertirGrupo = (numero: number): string => {
  if (numero < 0 || numero > 999) {
    throw new Error('El número debe estar entre 0 y 999');
  }

  let texto = '';
  const centena = Math.floor(numero / 100);
  const resto = numero % 100;

  if (centena > 0) {
    // Caso especial para el 100
    if (centena === 1 && resto === 0) {
      return 'cien';
    }
    texto += NUMEROS_CONFIG.centenas[centena];
  }

  if (resto > 0) {
    texto += (texto !== '' ? ' ' : '');

    if (resto < 10) {
      texto += NUMEROS_CONFIG.unidades[resto];
    } else if (resto < 20) {
      texto += NUMEROS_CONFIG.decenas[resto - 10];
    } else {
      const decena = Math.floor(resto / 10);
      const unidad = resto % 10;
      texto += NUMEROS_CONFIG.decenasCompuestas[decena];
      if (unidad > 0) {
        texto += (decena === 2 ? 'i' : ' y ') + NUMEROS_CONFIG.unidades[unidad];
      }
    }
  }

  return texto;
};

/**
 * Convierte un número decimal a su representación en texto en formato monetario
 * @param numero - Número decimal a convertir
 * @returns Texto representando el monto en pesos mexicanos
 * @throws {Error} Si el número es negativo o mayor a 999999.99
 */
export const numeroATexto = (numero: number): string => {
  if (numero < 0) {
    throw new Error('El número no puede ser negativo');
  }

  if (numero > 999999.99) {
    throw new Error('El número es demasiado grande para procesar');
  }

  if (numero === 0) {
    return 'cero pesos con 00 centavos m.n.';
  }

  // Separar los pesos y centavos
  const numeroStr = numero.toFixed(2);
  const [pesosStr, centavosStr] = numeroStr.split('.');
  let pesos = parseInt(pesosStr.replace(/,/g, ''), 10);

  let texto = '';

  // Convertir la parte de pesos
  if (pesos >= 1000) {
    const miles = Math.floor(pesos / 1000);
    texto += (miles === 1 ? 'mil' : `${convertirGrupo(miles)} mil`);
    pesos %= 1000;
  }

  if (pesos > 0) {
    texto += (texto !== '' ? ' ' : '') + convertirGrupo(pesos);
  }

  texto = texto.trim();
  
  return `Son ${texto} pesos con ${centavosStr} centavos m.n.`.replace(/\s+/g, ' ').trim();
};

const ConvertidorTexto = () => {
  return null;
};

export default ConvertidorTexto;