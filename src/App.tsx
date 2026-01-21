import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ClientesPage from "./pages/Clientes";
import AlvarasPage from "./pages/Alvaras";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated, isInitializing } = useAuth();
  const isLoginPage = location.pathname === "/";
  const isPublicPage = isLoginPage;

  // Enquanto está inicializando, não redireciona
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Redireciona para login se não autenticado em páginas protegidas
  if (!isAuthenticated && !isPublicPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar - mobile: top, desktop: left - hidden on login page */}
      {!isPublicPage && <Sidebar />}
      {/* Main content - com margin left no desktop para não sobrepor o sidebar fixo */}
      <div className="flex-1 w-full lg:ml-64">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/alvaras" element={<AlvarasPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
