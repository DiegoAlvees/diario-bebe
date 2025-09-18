import { intervalToDuration } from 'date-fns';

export function calcularDiasDeVida(dataNascimento: string): string {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  const duracao = intervalToDuration({ start: nascimento, end: hoje });

  let resultado = '';
  if (duracao.years) resultado += `${duracao.years} ano${duracao.years > 1 ? 's' : ''} `;
if (duracao.months) resultado += `${duracao.months} ${duracao.months > 1 ? 'meses' : 'mês'} `;
  if (duracao.days) resultado += `${duracao.days} dia${duracao.days > 1 ? 's' : ''}`;

  return resultado.trim() || '0 dias';
}
