import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainHero from '../components/sections/MainHero';
import HowItWorks from '../components/sections/HowItWorks';
import Benefits from '../components/sections/Benefits';
import UniversityPartners from '../components/sections/UniversityPartners';
import Testimonials from '../components/sections/Testimonials';
import UniversitySection from '../components/sections/UniversitySection';
import FinalCTA from '../components/sections/FinalCTA';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <MainHero />
        <HowItWorks />
        <Benefits />
        <UniversityPartners />
        <Testimonials />
        <UniversitySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
