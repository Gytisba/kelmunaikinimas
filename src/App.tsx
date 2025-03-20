
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ServiceTreeCutting from "./pages/ServiceTreeCutting";
import ServiceStumpGrinding from "./pages/ServiceStumpGrinding";
import ServiceIndustrialClimbing from "./pages/ServiceIndustrialClimbing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/paslauga/pavojingu-medziu-pjovimas" element={<ServiceTreeCutting />} />
          <Route path="/paslauga/kelmu-frezavimas" element={<ServiceStumpGrinding />} />
          <Route path="/paslauga/pramoninis-alpinizmas" element={<ServiceIndustrialClimbing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<Navigate to="/admin" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
