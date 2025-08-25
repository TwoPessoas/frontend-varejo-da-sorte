import { useState } from "react";
import type {
  PageContent,
  PageContentResponse,
  UsePageContent,
} from "../types/PageContent";
import api from "../services/api";

export default function usePageContent(): UsePageContent {
  const [isLoading, setIsLoading] = useState(false);

  // Busca todos os números da sorte com parâmetros de consulta opcionais
  const getContent = async (slug: string): Promise<PageContent | null> => {
    setIsLoading(true);

    try {
      const response = await api.get<PageContentResponse>(
        `/pages-content/get-content-by-slug/${slug}`
      );
      return response.data.data || null;
    } catch (err: any) {
      console.error("Falha ao guscar o conteúdo.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

   return {
    isLoading,
    getContent,
  };
}
