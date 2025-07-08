
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/autodj" element={<AutoDJ />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/streaming" element={<Streaming />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/database" element={<Database />} />
        <Route path="/email" element={<EmailManager />} />
        <Route path="/resellers" element={<Resellers />} />
        <Route path="/store" element={<Store />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/api" element={<ApiIntegration />} />
        <Route path="/install" element={<InstallScript />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
