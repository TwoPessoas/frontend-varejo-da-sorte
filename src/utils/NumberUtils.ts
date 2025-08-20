import { useMemo } from "react";

export const useCurrencyFormatter = (locale = 'pt-BR') => {
  const formatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [locale]);
  
  const formatCurrency = (value: any) => {
    if (isNaN(value)) return '0,00';
    return formatter.format(value);
  };
  
  return { formatCurrency };
};