import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth"; // <-- CORREÇÃO FINAL AQUI

// Páginas
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReadingDayMcCheyne from "./pages/ReadingDayMcCheyne";
import HowItWorks from "./pages/HowItWorks";
import Reflections from "./pages/Reflections";
import NotFound from "./pages/NotFound";
import Profiles from "./pages/Profiles";
import Settings from "./pages/Settings";
import Quiz from "./pages/Quiz";
import ProgressDetails from "./pages/ProgressDetails";
import Achievements from "./pages/Achievements";
import Verses from "./pages/Verses";
import BibleChapter from "./pages/BibleChapter";
import Statistics from "./pages/Statistics";
import Sermons from "./pages/Sermons";
import SermonEditor from "./pages/SermonEditor";
import Contribute from "./pages/Contribute";
import Devotional from "./pages/Devotional";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const ProtectedRoute = () => {
  const { session, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (!session) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/contribute" element={<Contribute />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reading/:day" element={<ReadingDayMcCheyne />} />
      <Route path="/reflections" element={<Reflections />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/progress" element={<ProgressDetails />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/verses" element={<Verses />} />
      <Route path="/bible/:book/:chapter" element={<BibleChapter />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/sermons" element={<Sermons />} />
      <Route path="/sermon-editor" element={<SermonEditor />} />
      <Route path="/sermon-editor/:id" element={<SermonEditor />} />
      <Route path="/devotional" element={<Devotional />} />
      <Route path="/admin" element={<Admin />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <ProgressProvider>
            <TooltipProvider>
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </ProgressProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;