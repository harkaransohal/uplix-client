import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Index from "./pages/Index";
import RepositoryInfo from "./pages/RepositoryInfo";
import ScoredRepos from "./pages/ScoredRepos";
import RepoDetail from "./pages/RepoDetail";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page: only visible if signed out */}
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <Index />
                </SignedOut>
                <SignedIn>
                  <Navigate to="/get-score" replace />
                </SignedIn>
              </>
            }
          />

          <Route path="/waitlist" element={<Waitlist />} />

          {/* Protected routes */}
          <Route
            path="/get-score"
            element={
              <>
                <SignedIn>
                  <RepositoryInfo />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/scored-repos"
            element={
              <>
                <SignedIn>
                  <ScoredRepos />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/scored-repos/:id"
            element={
              <>
                <SignedIn>
                  <RepoDetail />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
