import { readDecimal, readInteger, showMessage } from '../shared.js';

const form = document.getElementById('form-motos');
const message = document.getElementById('mensagem');
const summary = document.getElementById('resumo');
const details = document.getElementById('detalhes');
const rows = document.getElementById('linhas');
const amount = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });

function addMetric(label, value) {
  const item = document.createElement('div');
  const term = document.createElement('dt');
  const description = document.createElement('dd');
  term.textContent = label;
  description.textContent = value;
  item.append(term, description);
  summary.append(item);
}

function addCell(row, value) {
  const cell = document.createElement('td');
  cell.textContent = value;
  row.append(cell);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  summary.hidden = true;
  details.hidden = true;
  summary.replaceChildren();
  rows.replaceChildren();

  try {
    const tokyoInitial = readInteger(document.getElementById('tokio'), 'Quantidade de Tóquio');
    const aparecidaInitial = readInteger(document.getElementById('aparecida'), 'Quantidade de Aparecida');
    const tokyoRate = readDecimal(document.getElementById('taxa-tokio'), 'Crescimento de Tóquio');
    const aparecidaRate = readDecimal(document.getElementById('taxa-aparecida'), 'Crescimento de Aparecida');
    if (tokyoInitial < 1 || aparecidaInitial < 1 || tokyoInitial > 1_000_000_000 || aparecidaInitial > 1_000_000_000) {
      throw new Error('Informe populações inteiras entre 1 e 1.000.000.000.');
    }
    if (tokyoRate < 0 || aparecidaRate < 0 || aparecidaRate <= tokyoRate || aparecidaRate > 100) {
      throw new Error('A taxa de Aparecida precisa ser maior que a de Tóquio e ambas devem ficar entre 0% e 100%.');
    }

    let tokyo = tokyoInitial;
    let aparecida = aparecidaInitial;
    const tokyoFactor = 1 + tokyoRate / 100;
    const aparecidaFactor = 1 + aparecidaRate / 100;
    const fragment = document.createDocumentFragment();
    let months = 0;
    while (aparecida < tokyo && months < 1_200) {
      tokyo *= tokyoFactor;
      aparecida *= aparecidaFactor;
      months += 1;
      if (!Number.isFinite(tokyo) || !Number.isFinite(aparecida)) throw new Error('A projeção excedeu a faixa numérica do navegador.');
      const row = document.createElement('tr');
      addCell(row, `${months} (${Math.floor(months / 12)} anos e ${months % 12} meses)`);
      addCell(row, amount.format(tokyo));
      addCell(row, amount.format(aparecida));
      fragment.append(row);
    }

    rows.replaceChildren(fragment);
    addMetric('Tempo até ultrapassar', months ? `${months} meses` : 'Já ultrapassou no início');
    addMetric('Tóquio no período', amount.format(tokyo));
    addMetric('Aparecida no período', amount.format(aparecida));
    summary.hidden = false;
    details.hidden = months === 0;

    if (months === 1_200 && aparecida < tokyo) {
      showMessage(message, 'A ultrapassagem não ocorreu dentro do limite de 100 anos.', 'error');
    } else {
      showMessage(message, 'Projeção calculada mês a mês.', 'success');
    }
  } catch (error) {
    showMessage(message, error.message, 'error');
  }
});
