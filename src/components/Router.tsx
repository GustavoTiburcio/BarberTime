import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
  Navigate,
} from 'react-router-dom';
import Booking from '../pages/Booking';
import Header from './Header';
import Menu from '../pages/Menu';
import Dashboard from '../pages/Dashboard';
import Professionals from '../pages/Professionals';
import Services from '../pages/Services';
import Schedule from '../pages/Schedule';
import Login from '../pages/Login';
import { ProtectedRoute } from './ProtectedRoute';


function LayoutFixo() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path='/login' element={<Login />} />

        <Route element={<LayoutFixo />}>
          <Route path='/' element={<Booking />} />
        </Route>

        {/* Rotas protegidas */}
        <Route path='/menu' element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to='dashboard' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='professionals' element={<Professionals />} />
          <Route path='services' element={<Services />} />
          <Route path='schedule' element={<Schedule />} />
        </Route>
      </Routes>
    </Router>
  );
}


