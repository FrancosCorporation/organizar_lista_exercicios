// Port fiel do Calculadoradeprobabilidade.java (Senac, 1º-2º semestre):
// C(n,x) via fatoriais + fórmulas de taxa do exercício original (mantidas 1:1).
export function fatorial(n) {
  let f = 1;
  while (n > 1) { f *= n; n--; }
  return f;
}

// probabilidade(x, n): combinação fatorial(n) / (fatorial(x) * fatorial(n-x))
export function combinacao(x, n) {
  return fatorial(n) / (fatorial(x) * fatorial(n - x));
}

// taxasucesso — fórmula fiel ao original (mantida mesmo sendo didaticamente estranha)
export function taxaSucesso(c, sucesso, insucesso) {
  return c * Math.pow(insucesso / 100, insucesso) * (c * Math.pow(sucesso / 100, sucesso));
}

// taxainsucesso — idem, fiel
export function taxaInsucesso(sucesso, insucesso) {
  return Math.pow(insucesso / 100, sucesso) * Math.pow(sucesso / 100, insucesso);
}
