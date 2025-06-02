import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

// Import pages
import ModernIndex from "./pages/ModernIndex";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PortalSupplier from "./pages/PortalSupplier";
import PortalFunder from "./pages/PortalFunder";
import PortalFreelancer from "./pages/PortalFreelancer";
import GovernancePortal from "./pages/GovernancePortal";
import ProposalView from "./pages/ProposalView";

// Import dashboard components
import { DashboardLayout } from "./components/dashboard/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<ModernIndex />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Portal routes */}
            <Route path="/portals/supplier" element={<PortalSupplier />} />
            <Route path="/portals/funder" element={<PortalFunder />} />
            <Route path="/portals/freelancer" element={<PortalFreelancer />} />
            <Route path="/governance" element={<GovernancePortal />} />
            <Route path="/governance/proposals/:id" element={<ProposalView />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
