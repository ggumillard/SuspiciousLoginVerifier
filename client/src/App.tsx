import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import WarningPage from "@/pages/WarningPage";
import FormPage from "@/pages/FormPage";
import SuccessPage from "@/pages/SuccessPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WarningPage} />
      <Route path="/verify" component={FormPage} />
      <Route path="/success" component={SuccessPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#F0F2F5] min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
