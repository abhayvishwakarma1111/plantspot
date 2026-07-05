import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyRegister from "@/components/home/WhyRegister";
import PlantGrid from "@/components/home/PlantGrid";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyRegister />
      <PlantGrid />
      <Footer />
    </>
  );
}
