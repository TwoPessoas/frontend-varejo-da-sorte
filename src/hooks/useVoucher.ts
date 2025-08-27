import { useState } from "react";
import type {
  UseVoucher,
  VoucherDraw,
  VoucherResponse,
} from "../types/Voucher";
import api from "../services/api";
import toast from "react-hot-toast";

export default function useVoucher(): UseVoucher {
  const [isLoading, setIsLoading] = useState(false);

  // Busca todos os vouchers sorteados
  const getVouchersDrawn = async (): Promise<VoucherDraw[] | null> => {
    setIsLoading(true);

    try {
      const response = await api.get<VoucherResponse>("/vouchers/drawn");
      return response.data.data;
    } catch (err: any) {
      toast.error("Falha ao buscar os vouchers sorteados.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getVouchersDrawn,
  };
}
