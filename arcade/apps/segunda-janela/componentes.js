import { showMessage } from '../shared.js';

const form = document.getElementById('form-componentes');
const textInput = document.getElementById('texto');
const details = document.getElementById('detalhes');
const message = document.getElementById('mensagem');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = textInput.value.trim();
  if (!text) {
    showMessage(message, 'Digite uma mensagem para exibir.', 'error');
    textInput.focus();
    return;
  }
  const explanation = details.checked ? ' A caixa de seleção acrescenta esta explicação à mensagem.' : '';
  showMessage(message, `Mensagem exibida: ${text}.${explanation}`, 'success');
});

document.getElementById('limpar').addEventListener('click', () => {
  form.reset();
  showMessage(message, '');
  textInput.focus();
});
