import { dentroDoLimite, validarDiaMes } from './dialogo.js';

const element = (id) => document.getElementById(id);
const modal = element('modal');
const confirmButton = element('confirmar');
const cancelButton = element('cancelar');
let previousFocus;

function recordAnswer(answer) {
  const output = element('saida');
  output.hidden = false;
  output.textContent += `${answer}\n`;
}

function closeDialog(answer) {
  modal.hidden = true;
  recordAnswer(answer ? 'true' : 'false');
  previousFocus?.focus();
}

element('perguntar').addEventListener('click', () => {
  previousFocus = document.activeElement;
  modal.hidden = false;
  confirmButton.focus();
});
confirmButton.addEventListener('click', () => closeDialog(true));
cancelButton.addEventListener('click', () => closeDialog(false));
modal.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeDialog(false);
  } else if (event.key === 'Tab') {
    const first = event.shiftKey ? cancelButton : confirmButton;
    const last = event.shiftKey ? confirmButton : cancelButton;
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

element('validar-data').addEventListener('click', () => {
  const day = Number(element('dia').value);
  const month = Number(element('mes').value);
  let text;
  try {
    if (!dentroDoLimite(month, 1, 12)) text = 'Informe um mês entre 1 e 12.';
    else if (!dentroDoLimite(day, 1, 31)) text = 'Informe um dia entre 1 e 31.';
    else {
      const result = validarDiaMes(day, month);
      text = result.valido ? `Data válida: ${day}/${month}` : result.mensagem;
    }
  } catch (error) {
    text = error.message;
  }
  const output = element('saida');
  output.hidden = false;
  output.textContent = text;
});
