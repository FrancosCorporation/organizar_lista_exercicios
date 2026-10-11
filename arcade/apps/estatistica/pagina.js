import { combinacao, taxaSucesso, taxaInsucesso } from './estatistica.js';

const output = document.getElementById('saida');

document.getElementById('calcular').addEventListener('click', () => {
  try {
    const fields = ['n', 'x', 'sucesso', 'insucesso'].map((id) => document.getElementById(id));
    if (fields.some((field) => field.value.trim() === '')) throw new Error('Preencha todos os campos.');
    const [n, x, success, failure] = fields.map((field) => Number(field.value));
    if (fields.some((field) => !Number.isFinite(Number(field.value)))) throw new Error('Use valores numéricos válidos.');
    const combinations = combinacao(x, n);
    output.textContent = `Resultado fatorial: ${combinations}\nTaxa de sucesso: ${taxaSucesso(combinations, success, failure)}\nTaxa de insucesso: ${taxaInsucesso(success, failure)}`;
  } catch (error) {
    output.textContent = error.message;
  }
  output.hidden = false;
});
