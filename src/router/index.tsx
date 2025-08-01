import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App"; // 1. Importe o novo componente App
import ProtectedRoute from "../contexts/ProtectedRoute";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestLayout from "../layouts/GuestLayout";
import HomePage from "../pages/home/HomePage";
import ClientAreaPage from "../pages/protected/clientArea/ClientAreaPage";

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
        ],
      },
    ],
  },
]);

export default router;
