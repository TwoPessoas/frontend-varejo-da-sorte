import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { ClientProvider } from "./contexts/ClientContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ClientProvider>
          <Outlet />
        </ClientProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
