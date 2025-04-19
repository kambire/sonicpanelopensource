import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Stations from "./pages/Stations";
import AutoDJ from "./pages/AutoDJ";
import Streaming from "./pages/Streaming";
import Database from "./pages/Database";
import Statistics from "./pages/Statistics";
import InstallScript from "./pages/InstallScript";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/autodj" element={<AutoDJ />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/database" element={<Database />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/install" element={<InstallScript />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
