
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
import Resellers from "./pages/Resellers";
import ApiIntegration from "./pages/ApiIntegration";
import EmailManager from "./pages/EmailManager";
import Users from "./pages/Users";
import Store from "./pages/Store";
import Billing from "./pages/Billing";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
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
            <Route path="/resellers" element={<Resellers />} />
            <Route path="/api-integration" element={<ApiIntegration />} />
            <Route path="/email-manager" element={<EmailManager />} />
            <Route path="/users" element={<Users />} />
            <Route path="/store" element={<Store />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
