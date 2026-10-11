import { showMessage } from '../shared.js';

const form = document.getElementById('form-contato');
const rows = document.getElementById('linhas');
const message = document.getElementById('mensagem');
const contacts = [];

function renderContacts() {
  rows.replaceChildren();
  if (contacts.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 3;
    cell.className = 'empty-row';
    cell.textContent = 'Nenhum contato adicionado nesta sessão.';
    row.append(cell);
    rows.append(row);
    return;
  }

  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');
    for (const value of [contact.name, contact.email]) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    }
    const actionCell = document.createElement('td');
    const remove = document.createElement('button');
    remove.className = 'secondary';
    remove.type = 'button';
    remove.textContent = 'Remover';
    remove.setAttribute('aria-label', `Remover contato ${contact.name}`);
    remove.addEventListener('click', () => {
      contacts.splice(index, 1);
      renderContacts();
      showMessage(message, 'Contato removido da tabela.');
    });
    actionCell.append(remove);
    row.append(actionCell);
    rows.append(row);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('nome').value.trim();
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();
  if (!name || !emailInput.validity.valid) {
    showMessage(message, 'Informe um nome e um endereço de e-mail válido.', 'error');
    (!name ? document.getElementById('nome') : emailInput).focus();
    return;
  }
  contacts.push({ name, email });
  renderContacts();
  form.reset();
  document.getElementById('nome').focus();
  showMessage(message, `${name} foi adicionado à tabela.`, 'success');
});

renderContacts();
