
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import OurExpertise from '@/components/OurExpertise';
import Benefits from '@/components/Benefits';
import WorkSamples from '@/components/WorkSamples';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Services />
      <OurExpertise />
      <Benefits />
      <WorkSamples />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
