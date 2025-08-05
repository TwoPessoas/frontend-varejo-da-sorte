export interface GameOpportunity {
  id: number;
  gift: string | null;
  usedAt: string | null;
  createdAt: string;
  fiscalCode?: string | null;
}

export interface GameOpportunityResponse {
  data: GameOpportunity[];
  status: string;
  message: string;
}

export interface UseGameOpportunity {
  isLoading: boolean;
  opportunities: GameOpportunity[];
  getMyOpportunities: () => Promise<GameOpportunity[] | null>;
  clearOpportunities: () => void;
}
