
import './i18n';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RoleProvider } from "@/components/auth/RoleBasedAccess";

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
import Workspace from "./pages/Workspace";

// Import new gateway and portal pages
import GatewaysHub from "./pages/GatewaysHub";
import GatewayDetails from "./pages/GatewayDetails";
import VotingPortal from "./pages/VotingPortal";
import ContractsPortal from "./pages/ContractsPortal";
import NotificationsPortal from "./pages/NotificationsPortal";

// Import new pages
import GroupCreation from "./pages/GroupCreation";
import GroupDetails from "./pages/GroupDetails";
import SystemComponents from "./pages/SystemComponents";

// Import dashboard components
import { DashboardLayout } from "./components/dashboard/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
        <RoleProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<ModernIndex />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Gateway routes */}
              <Route path="/gateways" element={<GatewaysHub />} />
              <Route path="/gateways/:gatewayId" element={<GatewayDetails />} />
              <Route path="/gateways/:gatewayId/create" element={<GroupCreation />} />
              
              {/* Group management routes */}
              <Route path="/groups/:groupId" element={<GroupDetails />} />
              
              {/* Portal routes */}
              <Route path="/portals/supplier" element={<PortalSupplier />} />
              <Route path="/portals/funder" element={<PortalFunder />} />
              <Route path="/portals/freelancer" element={<PortalFreelancer />} />
              
              {/* Governance & Voting routes */}
              <Route path="/governance" element={<GovernancePortal />} />
              <Route path="/governance/proposals/:id" element={<ProposalView />} />
              <Route path="/voting" element={<VotingPortal />} />
              
              {/* Contract & Document Management */}
              <Route path="/contracts" element={<ContractsPortal />} />
              
              {/* Notifications */}
              <Route path="/notifications" element={<NotificationsPortal />} />
              
              {/* System Components */}
              <Route path="/system" element={<SystemComponents />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RoleProvider>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
