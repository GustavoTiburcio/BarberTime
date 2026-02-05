import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
} from 'react-router-dom';
import Booking from '../pages/Booking';
import Header from './Header';
import Dashboard from '../pages/Dashboard';
import DashboardHome from '../pages/DashboardHome';
import Professionals from '../pages/Professionals';
import Services from '../pages/Services';
import Schedule from '../pages/Schedule';


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
        <Route element={<LayoutFixo />}>
          <Route path='/' element={<Booking />} />
        </Route>

        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path='professionals' element={<Professionals />} />
          <Route path='services' element={<Services />} />
          <Route path='schedule' element={<Schedule />} />
        </Route>
      </Routes>
    </Router>
  );
}


