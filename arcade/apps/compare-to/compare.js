// Port fiel do MetodoCompareTo.java: ordena nomes com o ALGORITMO ORIGINAL de ranking
// por compareToIgnoreCase — posição = (nº de "maiores") + (desempate case-sensitive)
// + (duplicados exatos anteriores) — não é Array.sort de propósito.
// Nota de folding: toLowerCase() do JS cobre o domínio ASCII dos nomes do exercício
// original; o case-folding completo do compareToIgnoreCase (Grego/Unicode especial)
// está fora do escopo didático, documentado aqui por transparência.
// Correções sobre o original: pré-cálculo do lowercase (eficiência) e guarda contra
// estouro/sobrescrita de posição com muitos duplicados.
import { validarEntrada } from '../../shared/validar.js';

export function ordenarPorCompareTo(entrada) {
  validarEntrada(entrada);
  const aux = [...entrada];
  const lower = aux.map((s) => s.toLowerCase()); // pré-cálculo: evita O(n²) toLowerCase
  const nome2 = new Array(aux.length).fill(null);

  for (let i = 0; i < aux.length; i++) {
    let vet = 0;
    for (let j = 0; j < aux.length; j++) {
      if (lower[i] > lower[j]) vet++;                              // compareToIgnoreCase > 0
      if (lower[i] === lower[j] && aux[i] > aux[j]) {
        vet++; // desempate case-sensitive, fiel ao compareTo
      }
    }
    // duplicados exatos anteriores ocupam as posições primeiro (fiel ao laço `l` do original)
    for (let l = 0; l < i; l++) {
      if (aux[l] === aux[i]) vet++;
    }
    // guarda de robustez: primeira posição livre a partir de vet (nunca sobrescreve/estoura)
    let pos = Math.min(vet, aux.length - 1);
    while (pos < aux.length && nome2[pos] !== null) pos++;
    if (pos >= aux.length) pos = nome2.findIndex((c) => c === null); // sempre existe: sobra ≥ 1 slot
    nome2[pos] = aux[i];
  }
  return nome2;
}

// compareTo didático: mesma semântica do Java (comparação por unidades de código UTF-16)
export function comparar(a, b) {
  const al = a.toLowerCase(), bl = b.toLowerCase();
  const r = al < bl ? -1 : al > bl ? 1 : 0;
  const exato = a < b ? -1 : a > b ? 1 : 0;
  return { ignoreCase: r, exato };
}
