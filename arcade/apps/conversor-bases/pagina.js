import { converter } from './conversor.js';

const output = document.getElementById('saida');

document.getElementById('calcular').addEventListener('click', () => {
  try {
    const result = converter(document.getElementById('valor').value.trim(), Number(document.getElementById('base').value));
    output.textContent = `Decimal: ${result.decimal}\nBinário: ${result.binario}\nOctal: ${result.octal}\nHexadecimal: ${result.hexadecimal}`;
  } catch (error) {
    output.textContent = error.message;
  }
  output.hidden = false;
});
