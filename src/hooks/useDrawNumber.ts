import { useState } from "react";
import type {
  DrawNumber,
  DrawNumberResponse,
  UseDrawNumber,
} from "../types/DrawNumber";
import toast from "react-hot-toast";
import api from "../services/api";
import { useClient } from "../contexts/ClientContext";

export default function useDrawNumber(): UseDrawNumber {
  const { clear } = useClient();
  const [drawNumbers, setDrawNumbers] = useState<DrawNumber[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Busca todos os números da sorte com parâmetros de consulta opcionais
  const getMyDrawNumbers = async (): Promise<DrawNumber[] | null> => {
    setIsLoading(true);

    try {
      const response = await api.get<DrawNumberResponse>("/draw-numbers/list");
      setDrawNumbers(response.data.data);
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

  const clearDrawNumbers = () => {
    setDrawNumbers([]);
  };

  return {
    getMyDrawNumbers,
    drawNumbers,
    isLoading,
    clearDrawNumbers,
  };
}
