import { AuthProvider } from './Context';
import Booking from './Pages/Booking';
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