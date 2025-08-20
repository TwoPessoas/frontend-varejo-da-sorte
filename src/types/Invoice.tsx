import type { Product } from "./Product";

export interface Invoice {
  fiscalCode: string;
  invoceValue: number;
  hasItem: boolean;
  hasCreditcard: boolean;
  hasPartnerCode: boolean;
  pdv: number;
  store: number;
  numCoupon: string;
}

export interface InvoiceResponse {
  data?: {
    invoice: Invoice;
    totalInvoices: number;
    totalGameChances: number;
    invoiceGameChances: number;
    drawNumbers: string[];
    products: Product[];
  };
  status: string;
  message: string;
}

export interface InvoiceRequest {
  fiscalCode: string;
}