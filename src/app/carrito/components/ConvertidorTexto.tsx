
const convertirGrupo = (numero: number): string => {
  const unidades = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const decenas = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const decenasCompuestas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  let texto = '';
  const centena = Math.floor(numero / 100);
  const resto = numero % 100;

  if (centena > 0) {
    texto += centenas[centena];
  }

  if (resto > 0) {
    texto += (texto !== '' ? ' ' : '');

    if (resto < 10) {
      texto += unidades[resto];
    } else if (resto < 20) {
      texto += decenas[resto - 10];
    } else {
      const decena = Math.floor(resto / 10);
      const unidad = resto % 10;
      texto += decenasCompuestas[decena];
      if (unidad > 0) {
        texto += (decena === 2 ? 'i' : ' y ') + unidades[unidad];
      }
    }
  }

  return texto;
};

export const numeroATexto = (numero: number): string => {
  if (numero === 0) return 'cero pesos con 00 centavos m.n.';

  let texto = '';

  // Separar los pesos y centavos
  const numeroStr = numero.toFixed(2);
  const [pesosStr, centavosStr] = numeroStr.split('.');
  let pesos = parseInt(pesosStr.replace(/,/g, ''), 10);

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