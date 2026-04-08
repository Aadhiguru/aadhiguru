import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Contact from './pages/Contact';
import Matrimony from './pages/Matrimony';
import ServiceDetails from './pages/ServiceDetails';
import Login from './pages/Login';
import CreateProfile from './pages/CreateProfile';
import Store from './pages/Store';
import PoruthamChecker from './pages/PoruthamChecker';
import Software from './pages/Software';
import AdminDashboard from './pages/AdminDashboard';
import AcceptBooking from './pages/AcceptBooking';
import RejectBooking from './pages/RejectBooking';
import PaymentPage from './pages/PaymentPage';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/matrimony" element={<Matrimony />} />
          <Route path="/matrimony/create-profile" element={<CreateProfile />} />
          <Route path="/matrimony/porutham" element={<PoruthamChecker />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/store" element={<Store />} />
          <Route path="/software" element={<Software />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/accept" element={<AcceptBooking />} />
          <Route path="/reject" element={<RejectBooking />} />
          <Route path="/pay" element={<PaymentPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
