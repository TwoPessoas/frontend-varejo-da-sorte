export interface DrawNumber {
  id: number;
  number: number;
  fiscalCode?: string;
  updatedAt: string;
}

// Resposta de listagem com paginação
export interface DrawNumberResponse {
  data: DrawNumber[];
  status: string;
  message: string;
}

// Estrutura de retorno do hook
export interface UseDrawNumber {
  isLoading: boolean;
  drawNumbers: DrawNumber[];
  getMyDrawNumbers: () => Promise<DrawNumber[] | null>;
  clearDrawNumbers: () => void;
}
