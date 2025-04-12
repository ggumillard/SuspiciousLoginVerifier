import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import WarningPage from "@/pages/WarningPage";
import FormPage from "@/pages/FormPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import Verify2FAPage from "@/pages/Verify2FAPage";
import SuccessPage from "@/pages/SuccessPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WarningPage} />
      <Route path="/verify" component={FormPage} />
      <Route path="/change-password" component={ChangePasswordPage} />
      <Route path="/verify-2fa" component={Verify2FAPage} />
      <Route path="/success" component={SuccessPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#F0F2F5] min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-4xl">
          <Router />
        </div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
