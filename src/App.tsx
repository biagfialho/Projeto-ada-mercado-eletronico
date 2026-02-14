import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { toast } from "sonner";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const News = lazy(() => import("./pages/News"));
const Profile = lazy(() => import("./pages/Profile"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Simulador = lazy(() => import("./pages/Simulador"));
const Aprendizado = lazy(() => import("./pages/Aprendizado"));
const Gamificacao = lazy(() => import("./pages/Gamificacao"));
const Institucional = lazy(() => import("./pages/Institucional"));
const Contato = lazy(() => import("./pages/Contato"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <UserPreferencesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Navigate to="/analise" replace />} />
                <Route path="/analise" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/simulador" element={
                  <ProtectedRoute>
                    <Simulador />
                  </ProtectedRoute>
                } />
                <Route path="/noticias" element={
                  <ProtectedRoute>
                    <News />
                  </ProtectedRoute>
                } />
                <Route path="/aprendizado" element={
                  <ProtectedRoute>
                    <Aprendizado />
                  </ProtectedRoute>
                } />
                <Route path="/gamificacao" element={
                  <ProtectedRoute>
                    <Gamificacao />
                  </ProtectedRoute>
                } />
                <Route path="/institucional" element={
                  <ProtectedRoute>
                    <Institucional />
                  </ProtectedRoute>
                } />
                <Route path="/contato" element={
                  <ProtectedRoute>
                    <Contato />
                  </ProtectedRoute>
                } />
                <Route path="/perfil" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
        </UserPreferencesProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
