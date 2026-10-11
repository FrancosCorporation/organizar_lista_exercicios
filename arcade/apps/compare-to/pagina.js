import { ordenarPorCompareTo } from './compare.js';

const input = document.getElementById('nomes');
const output = document.getElementById('saida');

document.getElementById('ordenar').addEventListener('click', () => {
  try {
    const names = input.value.split('\n').map((name) => name.trim()).filter(Boolean);
    const sorted = ordenarPorCompareTo(names);
    const list = document.createElement('ol');
    for (const name of sorted) {
      const item = document.createElement('li');
      item.textContent = name;
      list.append(item);
    }
    output.replaceChildren(list);
    output.hidden = false;
  } catch (error) {
    output.textContent = error.message;
    output.hidden = false;
  }
});
