import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // 1. Importe o novo componente App
import ProtectedRoute from "../contexts/ProtectedRoute";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestLayout from "../layouts/GuestLayout";
import HomePage from "../pages/home/HomePage";
import ClientAreaPage from "../pages/protected/clientArea/ClientAreaPage";
import PlayNowPage from "../pages/protected/playNow/PlayNowPage";
import DrawNumberPage from "../pages/protected/drawNumber/DrawNumberPage";
import GameOpportunitiePage from "../pages/protected/gameOpportunitie/GameOpportunitiePage";
import SecurityChangeConsentPage from "../pages/SecurityChangeConsent/SecurityChangeConsentPage";

const router = createBrowserRouter([
  {
    // 2. Use o App como o elemento raiz de tudo
    element: <App />,
    children: [
      // Rotas Protegidas (agora filhas do App)
      {
        element: (
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/area-cliente",
            element: <ClientAreaPage />,
          },
          {
            path: "/jogar-agora",
            element: <PlayNowPage />,
          },
          {
            path: "/numeros-da-sorte",
            element: <DrawNumberPage />,
          },
          {
            path: "/lista-de-chances",
            element: <GameOpportunitiePage />,
          },
        ],
      },
      // Rotas Públicas (agora filhas do App)
      {
        element: <GuestLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/consentir-alteracao-seguranca",
            element: <SecurityChangeConsentPage />
          }
        ],
      },
    ],
  },
]);

export default router;
