import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Beneficiarios from "./pages/Beneficiarios";
import BeneficiarioPerfil from "./pages/BeneficiarioPerfil";
import Prontuario from "./pages/Prontuario";
import Financeiro from "./pages/Financeiro";
import Atividades from "./pages/Atividades";
import PrestacaoContas from "./pages/PrestacaoContas";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/beneficiarios" element={<Beneficiarios />} />
                      <Route path="/beneficiarios/:id" element={<BeneficiarioPerfil />} />
                      <Route path="/prontuario" element={<Prontuario />} />
                      <Route path="/financeiro" element={<Financeiro />} />
                      <Route path="/atividades" element={<Atividades />} />
                      <Route path="/prestacao-de-contas" element={<PrestacaoContas />} />
                      <Route path="/configuracoes" element={<Configuracoes />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
