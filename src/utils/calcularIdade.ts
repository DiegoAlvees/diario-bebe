import { differenceInDays } from 'date-fns';

export function calcularDiasDeVida(dataNascimento: string): number {
  return differenceInDays(new Date(), new Date(dataNascimento));
}
