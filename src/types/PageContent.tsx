export interface PageContent {
  title: string;
  content: string;
}

// Resposta de listagem com paginação
export interface PageContentResponse {
  data: PageContent;
  status: string;
  message: string;
}

// Estrutura de retorno do hook
export interface UsePageContent {
  isLoading: boolean;
  getContent: (slug: string) => Promise<PageContent | null>;
}
