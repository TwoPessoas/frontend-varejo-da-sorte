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

export interface Summary {
  opportunitiesTotal: number;
  opportunitiesNotUsed: number;
  drawNumbersTotal: number;
  invoicesTotal: number;
}

// Hook return structure
export interface UseClient {
  isLoading: boolean;
  getClient: () => Promise<Client | null>;
  updateClient: (clientData: Partial<Client>) => Promise<Client | null>;
  getStorageClient: () => Promise<Client | null>;
}

export interface ClientContextType {
  isLoading: boolean;
  client: Client | null;
  me: () => Promise<boolean>;
  clear: () => void;
  updateSummary: () => Promise<Summary | null>;
  getSummary: () => Summary | null;
  updateClient: (clientData: Partial<Client>) => Promise<Client | null>;
}
