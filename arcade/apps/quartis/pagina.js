import { porcentagemPosicao } from './quartis.js';

const output = document.getElementById('saida');

document.getElementById('calcular').addEventListener('click', () => {
  try {
    const position = Number(document.getElementById('f').value);
    const count = Number(document.getElementById('n').value);
    const percentage = porcentagemPosicao(position, count);
    output.textContent = `A porcentagem da posição é: ${percentage}%`;
  } catch (error) {
    output.textContent = error.message;
  }
  output.hidden = false;
});
