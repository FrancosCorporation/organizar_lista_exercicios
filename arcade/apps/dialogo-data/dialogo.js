// Port fiel do CaixaDialogoComReturn.java + ClasseDeCalculo.java (CalculadoraDeData):
// - validarDiaMes replica verificarMes do original, que valida APENAS fevereiro (dia > 29).
//   O original não validava outros meses/ano bissexto — mantido por fidelidade didática.
// - dentroDoLimite replica o verificador(limitDown, limitUp) que re-pergunta quando fora.
import { validarInteiros } from '../../shared/validar.js';

export function validarDiaMes(dia, mes) {
  validarInteiros(dia, 'dia', { min: 1, max: 31 });
  validarInteiros(mes, 'mes', { min: 1, max: 12 });
  // verificarMes do ClasseDeCalculo: fevereiro não aceita dia > 29
  if (mes === 2 && dia > 29) {
    return {
      valido: false,
      mensagem: 'Voce inseriu um dia superior ao permitido para o Mes de Fevereiro'
    };
  }
  return { valido: true, mensagem: null };
}

// verificador(limitDown, limitUp) do original: valor deve estar dentro dos limites
export function dentroDoLimite(valor, limitDown, limitUp) {
  return valor >= limitDown && valor <= limitUp;
}
