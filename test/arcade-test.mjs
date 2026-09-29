// Teste da 1ª sala do arcade (port do Calculadoradeprobabilidade.java). Uso: npm test
import { fatorial, combinacao, taxaSucesso, taxaInsucesso } from '../arcade/apps/estatistica/estatistica.js';

let falhas = 0;
function check(nome, cond) {
  console.log(`${cond ? 'PASS' : 'FAIL'} - ${nome}`);
  if (!cond) falhas++;
}

check('fatorial(5) = 120', fatorial(5) === 120);
check('fatorial(0) = 1 (loop não executa)', fatorial(0) === 1);
check('fatorial(1) = 1', fatorial(1) === 1);
check('C(3,10) = 120 (combinacao fiel ao original)', combinacao(3, 10) === 120);
check('C(2,5) = 10', combinacao(2, 5) === 10);
check('C(0,10) = 1', combinacao(0, 10) === 1);
check('C(10,10) = 1', combinacao(10, 10) === 1);

// taxas: fórmulas fiéis (verificadas contra o Java com mesmos valores)
const c = combinacao(3, 10);
check('taxaSucesso(120, 60, 40) bate com a fórmula original',
  Math.abs(taxaSucesso(c, 60, 40) - (120 * Math.pow(0.4, 40) * (120 * Math.pow(0.6, 60)))) < 1e-300);
check('taxaInsucesso(60, 40) = 0.4^60 * 0.6^40',
  Math.abs(taxaInsucesso(60, 40) - Math.pow(0.4, 60) * Math.pow(0.6, 40)) < 1e-300);

// ---------- SALA 2: Conversor de Bases (Logica_1.java) ----------
import { converter } from '../arcade/apps/conversor-bases/conversor.js';
{
  const r = converter('255', 10);
  check('conversor: 255 dec -> bin 11111111', r.binario === '11111111');
  check('conversor: 255 dec -> hex FF', r.hexadecimal === 'FF');
  check('conversor: 255 dec -> octal 377', r.octal === '377');
  const b = converter('1010', 2);
  check('conversor: 1010 bin -> dec 10', b.decimal === '10');
  const h = converter('ff', 16);
  check('conversor: ff hex -> dec 255', h.decimal === '255');
  let erros = 0;
  for (const [v, base] of [['xyz', 2], ['123abc', 10], ['0xFF', 16], ['9', 8], ['', 10], ['1', 5], [42, 10], ['FFFFFFFFFFFFFFFFFF', 16]]) {
    try { converter(v, base); } catch { erros++; }
  }
  check('conversor: parciais/prefixos/base inválida/tipo errado/estouro de int32 lançam erro (fiel ao Java)', erros === 8);
}

// ---------- SALA 3: Quartis (Estatistica_calc_quartis.java) ----------
import { porcentagemPosicao } from '../arcade/apps/quartis/quartis.js';
{
  check('quartis: f=3, n=10 -> 25.00 (fiel ao ((f-0.5)/n)*100)', porcentagemPosicao(3, 10) === '25.00');
  check('quartis: f=1, n=4 -> 12.50', porcentagemPosicao(1, 4) === '12.50');
  check('quartis: formato %.2f (duas casas)', porcentagemPosicao(2, 7) === '21.43');
  let erros = 0;
  for (const args of [[0, 10], [1, 0], [2.5, 10], [1, 3.7], ['x', 10]]) {
    try { porcentagemPosicao(...args); } catch { erros++; }
  }
  check('quartis: n/f inválidos, não-inteiros e tipos errados rejeitados (fiel ao nextInt)', erros === 5);
}

// ---------- SALA 4: CompareTo (MetodoCompareTo.java) ----------
import { ordenarPorCompareTo, comparar } from '../arcade/apps/compare-to/compare.js';
{
  const ordenados = ordenarPorCompareTo(['Rodolfo', 'ana', 'Bruna', 'carlos']);
  check('compareTo: ordena case-insensitive (algoritmo original)', JSON.stringify(ordenados) === JSON.stringify(['ana', 'Bruna', 'carlos', 'Rodolfo']));
  const comDup = ordenarPorCompareTo(['b', 'B', 'a']);
  check('compareTo: desempate case-sensitive (B antes de b, fiel ao compareTo)', JSON.stringify(comDup) === JSON.stringify(['a', 'B', 'b']));
  const triplo = ordenarPorCompareTo(['a', 'a', 'a', 'b']);
  check('compareTo: 3 duplicados exatos sem estouro de posição', JSON.stringify(triplo) === JSON.stringify(['a', 'a', 'a', 'b']));
  check('comparar("a","A"): ignoreCase=0, exato=1 (positivo, fiel ao compareTo Java/UTF-16)', comparar('a', 'A').ignoreCase === 0 && comparar('a', 'A').exato === 1);
  let erros = 0;
  for (const e of [[], ['ok', 42], ['ok', ''], 'não-array']) {
    try { ordenarPorCompareTo(e); } catch { erros++; }
  }
  check('compareTo: entradas inválidas (vazio/não-string/string solta) rejeitadas', erros === 4);
}

// ---------- SALA 5: Diálogo + Data (CaixaDialogoComReturn/ClasseDeCalculo) ----------
import { validarDiaMes, dentroDoLimite } from '../arcade/apps/dialogo-data/dialogo.js';
{
  check('data: 30/2 inválido (fevereiro > 29), mensagem fiel', validarDiaMes(30, 2).valido === false);
  check('data: 29/2 válido', validarDiaMes(29, 2).valido === true);
  check('data: 15/8 válido', validarDiaMes(15, 8).valido === true);
  check('verificador: 5 dentro de 1..10', dentroDoLimite(5, 1, 10) === true);
  check('verificador: 99 fora de 1..10', dentroDoLimite(99, 1, 10) === false);
  let erros = 0;
  for (const args of [[0, 5], [32, 5], [15, 0], [15, 13], [2.5, 5], ['x', 5]]) {
    try { validarDiaMes(...args); } catch { erros++; }
  }
  check('data: dia/mes fora das faixas 1..31/1..12 ou não inteiros rejeitados', erros === 6);
}

console.log(falhas === 0 ? '\nTODOS OS TESTES PASSARAM ✔' : `\n${falhas} TESTE(S) FALHARAM ✘`);
process.exit(falhas === 0 ? 0 : 1);
