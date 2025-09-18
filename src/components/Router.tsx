import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
} from 'react-router-dom';
import Booking from '../pages/Booking';
import Header from './Header';
import Dashboard from '../pages/Dashboard';
import Professionals from '../pages/Professionals';
import Services from '../pages/Services';


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
        </Route>
      </Routes>
    </Router>
  );
}


