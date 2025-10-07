import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import Index from "./pages/Index";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProfileProvider>
      <ProgressProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reading/:day" element={<ReadingDayMcCheyne />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/reflections" element={<Reflections />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/progress" element={<ProgressDetails />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/verses" element={<Verses />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProgressProvider>
    </ProfileProvider>
  </QueryClientProvider>
);

export default App;
