import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditorPage } from './pages/EditorPage';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EditorPage />
    </QueryClientProvider>
  );
}

export default App;
