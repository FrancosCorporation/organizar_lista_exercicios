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

console.log(falhas === 0 ? '\nTODOS OS TESTES PASSARAM ✔' : `\n${falhas} TESTE(S) FALHARAM ✘`);
process.exit(falhas === 0 ? 0 : 1);
