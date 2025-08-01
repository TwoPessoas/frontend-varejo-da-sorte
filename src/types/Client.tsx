export interface Client {
  isPreRegister: boolean;
  name: string;
  cpf: string;
  birthday: string | null;
  cel: string | null;
  email: string | null;
  isMegaWinner: boolean;
  emailSendedAt: string | null;
}