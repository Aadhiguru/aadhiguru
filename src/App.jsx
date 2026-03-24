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
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
