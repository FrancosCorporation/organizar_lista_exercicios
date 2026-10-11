export function showMessage(element, message, kind = '') {
  element.textContent = message;
  element.className = `message${kind ? ` ${kind}` : ''}`;
  element.setAttribute('role', kind === 'error' ? 'alert' : 'status');
}

export function readInteger(input, label) {
  const raw = input.value.trim();
  if (!/^[+-]?\d+$/.test(raw)) throw new Error(`${label}: informe um número inteiro.`);
  const value = Number(raw);
  if (!Number.isSafeInteger(value)) throw new Error(`${label}: o número está fora da faixa segura.`);
  return value;
}

export function readDecimal(input, label) {
  const raw = input.value.trim().replace(',', '.');
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(raw)) throw new Error(`${label}: informe um número válido.`);
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(`${label}: o número está fora da faixa permitida.`);
  return value;
}
