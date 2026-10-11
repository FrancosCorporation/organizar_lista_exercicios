import { readDecimal, readInteger, showMessage } from '../shared.js';

const form = document.getElementById('form-ingressos');
const message = document.getElementById('mensagem');
const table = document.getElementById('tabela');
const rows = document.getElementById('linhas');
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function cents(input, label) {
  const value = readDecimal(input, label);
  if (value < 0 || value > 100_000) throw new Error(`${label}: use um valor entre R$ 0,00 e R$ 100.000,00.`);
  return Math.round(value * 100);
}

function addCell(row, text) {
  const cell = document.createElement('td');
  cell.textContent = text;
  row.append(cell);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  table.hidden = true;
  rows.replaceChildren();

  try {
    let price = cents(document.getElementById('preco'), 'Preço inicial');
    let quantity = readInteger(document.getElementById('quantidade'), 'Ingressos iniciais');
    const expenses = cents(document.getElementById('despesas'), 'Despesas');
    const reduction = cents(document.getElementById('reducao'), 'Redução por etapa');
    const addedQuantity = readInteger(document.getElementById('aumento'), 'Ingressos extras por etapa');
    if (price < 100 || reduction < 1 || quantity < 1 || quantity > 1_000_000 || addedQuantity < 1 || addedQuantity > 1_000_000) {
      throw new Error('Use preço inicial de pelo menos R$ 1,00, redução positiva e quantidades entre 1 e 1.000.000.');
    }

    const fragment = document.createDocumentFragment();
    let scenarios = 0;
    for (let step = 0; step < 5_000 && price >= 100; step += 1) {
      const profit = price * quantity - expenses;
      if (!Number.isSafeInteger(profit)) throw new Error('Os valores geram um resultado fora da faixa segura.');
      if (profit <= 0) break;
      const row = document.createElement('tr');
      addCell(row, money.format(price / 100));
      addCell(row, quantity.toLocaleString('pt-BR'));
      addCell(row, money.format(profit / 100));
      fragment.append(row);
      scenarios += 1;
      price -= reduction;
      quantity += addedQuantity;
      if (!Number.isSafeInteger(quantity)) throw new Error('A quantidade acumulada excedeu a faixa segura.');
    }

    rows.replaceChildren(fragment);
    table.hidden = false;
    showMessage(message, scenarios ? `${scenarios} cenário${scenarios === 1 ? '' : 's'} com lucro positivo.` : 'Nenhum cenário atende ao limite de preço e lucro.', scenarios ? 'success' : '');
  } catch (error) {
    showMessage(message, error.message, 'error');
  }
});
