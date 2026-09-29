// Port fiel do Conversor de Bases (Logica_1.java): converte entre bases 2/8/10/16
// replicando a semântica de Integer.parseInt(n, base) — que lança NumberFormatException
// para strings parciais/inválidas e respeita o intervalo de int (−2³¹..2³¹−1) —
// mais toString(base)/toHexString do Java.
// Escopo didático (como na UI NewFrontEnd original): valores positivos; a saída em
// complemento de dois de números negativos do Java não é reproduzida.
const REGEX_BASE = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^[0-9]+$/,
  16: /^[0-9a-fA-F]+$/
};
const LIMITE_INT = 2 ** 31; // intervalo de int do Java

export function converter(valor, baseEntrada) {
  if (typeof valor !== 'string' || !valor.trim()) {
    throw new Error('Valor inválido: informe uma cadeia não vazia');
  }
  if (!(baseEntrada in REGEX_BASE)) {
    throw new Error('Base inválida: use 2, 8, 10 ou 16');
  }
  const texto = valor.trim();
  // Integer.parseInt lança NumberFormatException em "123abc"/"0xFF" — replicamos
  if (!REGEX_BASE[baseEntrada].test(texto)) {
    throw new Error(`Valor "${texto}" inválido para a base ${baseEntrada}`);
  }
  const decimal = parseInt(texto, baseEntrada);
  // Integer.parseInt lança NumberFormatException fora do intervalo de int
  if (decimal > LIMITE_INT - 1) {
    throw new Error('Valor fora do intervalo de int Java (−2³¹..2³¹−1)');
  }
  return {
    decimal: String(decimal),
    binario: decimal.toString(2),        // toBinaryString
    octal: decimal.toString(8),          // toOctalString
    hexadecimal: decimal.toString(16).toUpperCase() // toHexString (upper p/ exibição, como na UI do NewFrontEnd)
  };
}
