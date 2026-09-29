// Port fiel do Estatistica_calc_quartis.java (Senac): f e n são inteiros lidos via
// Scanner.nextInt() — por isso a validação de inteiros é FIEL ao original.
// Fórmula: porcentagem = ((f - 0.5) / n) * 100, exibida com String.format("%.2f").
// Nota de arredondamento: Java "%.2f" usa HALF_UP; JS toFixed em números positivos
// arredonda half away from zero — resultados idênticos no domínio desta fórmula
// (f,n > 0 => porcentagem sempre positiva), por isso toFixed é fiel aqui.
export function porcentagemPosicao(f, n) {
  if (!Number.isInteger(f) || !Number.isInteger(n)) {
    throw new Error('f e n devem ser inteiros (fiel ao Scanner.nextInt do original)');
  }
  if (n <= 0) throw new Error('O número total da sequência (n) deve ser maior que zero');
  if (f <= 0) throw new Error('A posição (f) deve ser maior que zero');
  const v = ((f - 0.5) / n) * 100;
  // String.format("%.2f") do original
  return v.toFixed(2);
}
