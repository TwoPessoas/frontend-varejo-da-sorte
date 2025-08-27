export interface Voucher {
  win: boolean;
  gift: string;
  voucher?: number
}

export interface VoucherDraw {
  drawDate: string;
  name: string;
  cpf: string;
}

export interface VoucherResponse {
  data: VoucherDraw[];
  status: string;
  message: string;
}

export interface UseVoucher {
  isLoading: boolean;
  getVouchersDrawn: () => Promise<VoucherDraw[] | null>;
}