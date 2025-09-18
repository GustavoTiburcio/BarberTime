import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
} from 'react-router-dom';
import Booking from '../pages/Booking';
import Header from './Header';


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
      </Routes>
    </Router>
  );
}
