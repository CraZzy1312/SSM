import Header from "../components/common/Header";
import Hero from "../components/landing/Hero";
import SobreNosotros from "../components/landing/SobreNosotros";
import Servicios from "../components/landing/Servicios";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header IS={true} />
      <Hero />
      <SobreNosotros />
      <Servicios />
      <Footer />
    </div>
  );
};

export default LandingPage;
