import { showMessage } from '../shared.js';

const form = document.getElementById('form-saudacao');
const nameInput = document.getElementById('nome');
const message = document.getElementById('mensagem');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    showMessage(message, 'Digite seu nome para continuar.', 'error');
    nameInput.focus();
    return;
  }
  showMessage(message, `Olá, ${name}! Seja bem-vindo ao mundo das interfaces gráficas.`, 'success');
});

document.getElementById('limpar').addEventListener('click', () => {
  form.reset();
  showMessage(message, '');
  nameInput.focus();
});
