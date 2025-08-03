/*
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import type { Client, UseClient } from "../types/Client";

export default function useClient(): UseClient {
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch a single client by ID
  const getClient = async (): Promise<Client | null> => {
    setIsLoading(true);

    try {
      const response = await api.get<Client>(`/web-clients`);
      return response.data;
    } catch (err: any) {
      console.error("Failed to fetch client:", err);
      toast.error("Failed to fetch client data. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a client's information by ID
  const updateClient = async (
    clientData: Partial<Client>
  ): Promise<Client | null> => {
    setIsLoading(true);

    try {
      const response = await api.put<Client>(`/web-clients`, clientData);
      toast.success("Cliente atualizado com sucesso!");
      return response.data;
    } catch (err: any) {
      console.error("Failed to update client:", err);
      toast.error("Falha ao atualizar cliente. Por favor, tente novamente.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getStorageClient = async (): Promise<Client | null> => {
    // 1. Tenta obter da memória primeiro (mais rápido)
    if (client) {
      return client;
    }

    try {
      let dataToStore = null;

      // 2. Tenta obter do localStorage
      const clientStoredString = localStorage.getItem(
        "authClientWebVarejoDaSorte"
      );

      if (clientStoredString) {
        dataToStore = JSON.parse(clientStoredString) as Client;
      } else {
        // 3. Se não encontrar, busca da API (mais lento)
        dataToStore = await getClient();
        localStorage.setItem(
          "authClientWebVarejoDaSorte",
          JSON.stringify(dataToStore)
        );
      }

      // Centraliza a atualização do estado e o retorno
      setClient(dataToStore);
      return dataToStore;
    } catch (error) {
      console.error(
        "[AuthContext][client] Falha ao obter ou processar dados do cliente:",
        error
      );
      //Limpar localStorage se o dado estiver corrompido
      localStorage.removeItem("authClientWebVarejoDaSorte");
      return null; // ou throw error, dependendo de como você quer lidar com a falha
    }
  };

  return {
    isLoading,
    getClient,
    updateClient,
    getStorageClient
  };
}
*/