import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import MapPage from "./pages/MapPage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [studentMode, setStudentMode] = useState(() => {
    try {
      return localStorage.getItem("locallift-student-mode") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("locallift-student-mode", String(studentMode));
  }, [studentMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar studentMode={studentMode} onStudentModeChange={setStudentMode} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/discover" element={<Discover studentMode={studentMode} />} />
            <Route path="/map" element={<MapPage studentMode={studentMode} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
