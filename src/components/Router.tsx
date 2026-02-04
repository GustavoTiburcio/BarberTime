import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
} from 'react-router-dom';
import Booking from '../pages_temp/Booking';
import Header from './Header';
import Dashboard from '../pages_temp/Dashboard';
import Professionals from '../pages_temp/Professionals';
import Services from '../pages_temp/Services';
import Schedule from '../pages_temp/Schedule';


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
          <Route path='professionals' element={<Professionals />} />
          <Route path='services' element={<Services />} />
          <Route path='schedule' element={<Schedule />} />
        </Route>
      </Routes>
    </Router>
  );
}


