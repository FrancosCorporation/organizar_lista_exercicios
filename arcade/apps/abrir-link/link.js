import { showMessage } from '../shared.js';

const form = document.getElementById('form-link');
const input = document.getElementById('url');
const message = document.getElementById('mensagem');
const result = document.getElementById('resultado');
const link = document.getElementById('link-validado');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  result.hidden = true;

  try {
    const address = new URL(input.value.trim());
    if (!['http:', 'https:'].includes(address.protocol)) throw new Error('Use um endereço iniciado por http:// ou https://.');
    if (address.username || address.password) throw new Error('Remova usuário e senha do endereço antes de continuar.');

    link.href = address.href;
    showMessage(message, 'Endereço válido. Ele só será aberto quando você clicar no botão abaixo.', 'success');
    result.hidden = false;
  } catch (error) {
    showMessage(message, error instanceof TypeError ? 'Informe um endereço web válido, como https://exemplo.com.' : error.message, 'error');
  }
});
