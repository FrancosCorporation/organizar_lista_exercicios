import { readInteger, showMessage } from '../shared.js';

const form = document.getElementById('form-sequencia');
const message = document.getElementById('mensagem');
const result = document.getElementById('resultado');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  result.hidden = true;
  try {
    const limit = readInteger(document.getElementById('limite'), 'Limite');
    if (limit < 2 || limit > 1_000_000_000) throw new Error('Informe um inteiro entre 2 e 1.000.000.000.');
    const n = BigInt(limit);
    result.textContent = `1 + 2 + … + ${limit} = ${((n * (n + 1n)) / 2n).toString()}`;
    result.hidden = false;
    showMessage(message, 'Soma calculada pela fórmula da progressão aritmética.', 'success');
  } catch (error) {
    showMessage(message, error.message, 'error');
  }
});
