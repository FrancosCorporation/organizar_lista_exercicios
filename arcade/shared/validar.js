// Validações de entrada compartilhadas pelas salas do arcade (portas dos exercícios Java).
export function validarEntrada(entrada) {
  if (!Array.isArray(entrada)) throw new Error('Entrada deve ser um array');
  for (const item of entrada) {
    if (typeof item !== 'string' || !item.trim()) {
      throw new Error('Todos os itens devem ser strings não vazias');
    }
  }
  if (entrada.length === 0) throw new Error('Array vazio');
  return true;
}

export function validarInteiros(valor, nome, { min = -Infinity, max = Infinity } = {}) {
  if (!Number.isInteger(valor)) throw new Error(`${nome} deve ser inteiro`);
  if (valor < min || valor > max) throw new Error(`${nome} deve estar entre ${min} e ${max}`);
  return true;
}
