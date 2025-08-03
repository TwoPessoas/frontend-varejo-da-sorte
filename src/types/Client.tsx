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

// Hook return structure
export interface UseClient {
  isLoading: boolean;
  getClient: () => Promise<Client | null>;
  updateClient: (clientData: Partial<Client>) => Promise<Client | null>;
  getStorageClient: () => Promise<Client | null>;
}

export interface ClientContextType {
  me: () => Promise<boolean>;
  client: Client | null;
}
