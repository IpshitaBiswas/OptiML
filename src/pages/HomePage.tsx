
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Welcome from "../components/home/Welcome";
import HowItWorks from "../components/home/HowItWorks";
import Services from "../components/home/Services";
import WhyChoose from "../components/home/WhyChoose";
import GetStarted from "../components/home/GetStarted";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <GetStarted />
        <Welcome />
        <HowItWorks />
        <WhyChoose />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
