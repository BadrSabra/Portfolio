import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import HomePage from '@/pages/HomePage';
import ProjectTutorRL from '@/pages/ProjectTutorRL';
import ProjectMarketplace from '@/pages/ProjectMarketplace';
import ProjectSystemCore from '@/pages/ProjectSystemCore';
import CVPage from '@/pages/CVPage';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/projects/tutorrl" component={ProjectTutorRL} />
      <Route path="/projects/marketplace" component={ProjectMarketplace} />
      <Route path="/projects/system-core" component={ProjectSystemCore} />
      <Route path="/cv" component={CVPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme" attribute="class">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
