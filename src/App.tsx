
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AutoDJ from "./pages/AutoDJ";
import Stations from "./pages/Stations";
import Streaming from "./pages/Streaming";
import Statistics from "./pages/Statistics";
import Users from "./pages/Users";
import Database from "./pages/Database";
import EmailManager from "./pages/EmailManager";
import Resellers from "./pages/Resellers";
import Store from "./pages/Store";
import Billing from "./pages/Billing";
import ApiIntegration from "./pages/ApiIntegration";
import InstallScript from "./pages/InstallScript";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Componente para rutas solo de administrador
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Componente para rutas públicas (solo cuando no está autenticado)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              
              {/* Rutas protegidas */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/autodj" element={<ProtectedRoute><AutoDJ /></ProtectedRoute>} />
              <Route path="/stations" element={<ProtectedRoute><Stations /></ProtectedRoute>} />
              <Route path="/streaming" element={<ProtectedRoute><Streaming /></ProtectedRoute>} />
              <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
              
              {/* Rutas solo para administradores */}
              <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
              <Route path="/database" element={<AdminRoute><Database /></AdminRoute>} />
              <Route path="/email" element={<AdminRoute><EmailManager /></AdminRoute>} />
              <Route path="/resellers" element={<AdminRoute><Resellers /></AdminRoute>} />
              <Route path="/store" element={<AdminRoute><Store /></AdminRoute>} />
              <Route path="/billing" element={<AdminRoute><Billing /></AdminRoute>} />
              <Route path="/api" element={<AdminRoute><ApiIntegration /></AdminRoute>} />
              <Route path="/install" element={<AdminRoute><InstallScript /></AdminRoute>} />
              
              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
