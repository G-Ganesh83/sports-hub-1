import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/AuthContext';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Scout from "./pages/Scout";
import Fan from "./pages/Fan";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Details from "./pages/Details";
import PrivateRoute from "./components/PrivateRoute";
import Test from "./pages/Test";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ProfileProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
              <Route path="/test" element={<Test />} />
              <Route path="/signup" element={<Navigate to="/auth?mode=register" replace />} />
              <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />
              {/* Protected */}
              <Route element={<PrivateRoute />}>
                <Route path="/details" element={<Details />} />
              </Route>
              {/* Home page at root */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/scout" element={<Scout />} />
              <Route path="/fan" element={<Fan />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </ProfileProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
