import { createContext, useState, type ReactNode, useContext } from "react";
import type { Client, ClientContextType, Summary } from "../types/Client";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import type { InvoiceRequest, InvoiceResponse } from "../types/Invoice";

const ClientContext = createContext<ClientContextType | undefined>(undefined);
export const CLIENT_STORAGE_NAME = "authClientWebVarejoDaSorte";
export const SUMMARY_STORAGE_NAME = "sumaryClientWebVarejoDaSorte";

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const setStorageClient = async (client: Client) => {
    setClient(client);
    localStorage.setItem(CLIENT_STORAGE_NAME, JSON.stringify(client));
    await updateSummary();
  };

  const updateClient = async (
    clientData: Partial<Client>
  ): Promise<Client | null> => {
    setIsLoading(true);

    try {
      const response = await api.put<Client>(`/clients/web`, clientData);
      const clientUpdated = response.data;
      toast.success("Cliente atualizado com sucesso!");
      setStorageClient(clientUpdated);
      return clientUpdated;
    } catch (err: any) {
      console.error("Failed to update client:", err);
      toast.error("Falha ao atualizar o cliente. Tente novamente mais tarde!");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a single client by ID
  const getClient = async (): Promise<Client | null> => {
    setIsLoading(true);

    try {
      const response = await api.get<Client>(`/clients/web`);
      const clientUpdated = response.data;
      setStorageClient(clientUpdated);
      return clientUpdated;
    } catch (err: any) {
      console.error("Failed to fetch client:", err);
      toast.error("Failed to fetch client data. Please try again.");
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
      //localStorage.removeItem(CLIENT_STORAGE_NAME);

      const clientStoredString = localStorage.getItem(CLIENT_STORAGE_NAME);

      if (clientStoredString != null) {
        dataToStore = JSON.parse(clientStoredString) as Client;
      } else {
        // 3. Se não encontrar, busca da API (mais lento)
        dataToStore = await getClient();
      }

      if (!dataToStore) throw new Error("não foi possível recuperar o cliente");

      // Centraliza a atualização do estado e o retorno
      setClient(dataToStore);
      return dataToStore;
    } catch (error) {
      console.error(
        "[AuthContext][client] Falha ao obter ou processar dados do cliente:",
        error
      );
      //Limpar localStorage se o dado estiver corrompido
      clear();
      return null; // ou throw error, dependendo de como você quer lidar com a falha
    }
  };

  const updateSummary = async () => {
    try {
      const response = await api.get<Summary>(`/clients/summary`);
      const dataSummary = response.data;
      if (!dataSummary) return null;

      localStorage.setItem(SUMMARY_STORAGE_NAME, JSON.stringify(dataSummary));
      setSummary(dataSummary);
      return dataSummary;
    } catch (err: any) {
      toast.error("Não foi possível recuperar o sumário do cliente");
      return null;
    }
  };

  const getSummary = (): Summary | null => {
    // 1. Tenta obter da memória primeiro (mais rápido)
    if (summary) {
      return summary;
    }

    try {
      const storedString = localStorage.getItem(SUMMARY_STORAGE_NAME);
      if (!storedString) {
        return null;
      }

      const dataToStore = JSON.parse(storedString) as Summary;
      setSummary(dataToStore);
      return dataToStore;
    } catch (error) {
      console.error("Falha ao obter o sumário do cliente:", error);
      return null;
    }
  };

  const me = async () => {
    try {
      if (!isAuthenticated) return false;
      await api.get(`/clients/me`);
      const clientStored =  await getStorageClient();
      if (clientStored && clientStored?.isPreRegister && location.pathname !== "/atualizar-dados-cadastrais") {
        navigate("/atualizar-dados-cadastrais");
      }

      return true;
    } catch (err: any) {
      //Não autorizado
      if ((err.status = 401)) {
        clear();
      }
      return false;
    }
  };

  const clear = () => {
    setClient(null);
    localStorage.removeItem(CLIENT_STORAGE_NAME);
    localStorage.removeItem(SUMMARY_STORAGE_NAME);
    logout();
  };

  const addInvoice = async (
    invoiceData: Partial<InvoiceRequest>
  ) => {
    try {
      const response = await api.post<InvoiceResponse>(`/invoices/add`, invoiceData);
      await updateSummary();
      return response.data;
    } catch (err: any) {
      toast.error("Não foi possível inserir a nota fiscal");
      return null;
    }
  };

  const value = {
    client,
    me,
    isLoading,
    clear,
    updateSummary,
    getSummary,
    updateClient,
    addInvoice,
  };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within an ClientProvider");
  }
  return context;
};
