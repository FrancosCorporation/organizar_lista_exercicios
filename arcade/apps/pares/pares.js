import { readInteger, showMessage } from '../shared.js';

const form = document.getElementById('form-pares');
const message = document.getElementById('mensagem');
const result = document.getElementById('resultado');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  result.hidden = true;
  try {
    const limit = readInteger(document.getElementById('limite'), 'Limite');
    if (limit < 2 || limit > 100_000) throw new Error('Informe um inteiro entre 2 e 100.000.');
    const firstEven = limit % 2 === 0 ? limit : limit - 1;
    const values = [];
    for (let value = firstEven; value >= 2; value -= 2) values.push(value);
    result.textContent = values.join('\n');
    result.hidden = false;
    showMessage(message, `${values.length} números pares, em ordem decrescente.`, 'success');
  } catch (error) {
    showMessage(message, error.message, 'error');
  }
});
