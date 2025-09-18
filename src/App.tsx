import { AuthProvider } from './context';
import Booking from './pages/Booking';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Booking />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;