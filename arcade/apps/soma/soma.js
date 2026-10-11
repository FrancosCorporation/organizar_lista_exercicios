import { readInteger, showMessage } from '../shared.js';

const form = document.getElementById('form-soma');
const message = document.getElementById('mensagem');
const result = document.getElementById('resultado');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  result.hidden = true;
  try {
    const first = readInteger(document.getElementById('primeiro'), 'Primeiro número');
    const second = readInteger(document.getElementById('segundo'), 'Segundo número');
    result.textContent = `${first} + ${second} = ${(BigInt(first) + BigInt(second)).toString()}`;
    result.hidden = false;
    showMessage(message, 'Soma calculada.', 'success');
  } catch (error) {
    showMessage(message, error.message, 'error');
  }
});

document.getElementById('limpar').addEventListener('click', () => {
  form.reset();
  result.hidden = true;
  showMessage(message, '');
  document.getElementById('primeiro').focus();
});
