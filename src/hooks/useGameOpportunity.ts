import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import type {
  GameOpportunity,
  GameOpportunityResponse,
  UseGameOpportunity,
} from "../types/GameOpportunity";
import { useClient } from "../contexts/ClientContext";

export default function useGameOpportunity(): UseGameOpportunity {
  const { clear } = useClient();
  const [opportunities, setOpportunities] = useState<GameOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyOpportunities = async (): Promise<GameOpportunity[] | null> => {
    setIsLoading(true);

    try {
      const response = await api.get<GameOpportunityResponse>(
        "/opportunities/list"
      );
      setOpportunities(response.data.data);
      return response.data.data;
    } catch (err: any) {
      if (err.response.status === 401) {
        clear();
      }
      toast.error(
        "Falha ao buscar números da sorte. Por favor, tente novamente."
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearOpportunities = () => {
    setOpportunities([]);
  };


  return {
    getMyOpportunities,
    opportunities,
    isLoading,
    clearOpportunities,
  };
}
