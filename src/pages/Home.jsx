import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import Testimonials from '../components/Testimonials';
import AppointmentForm from '../components/AppointmentForm';

const Home = () => {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <Testimonials />
      <AppointmentForm />
    </main>
  );
};

export default Home;
