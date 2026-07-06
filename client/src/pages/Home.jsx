import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LiveStats from "../components/LiveStats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import RecentReports from "../components/RecentReports";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-950">
        <Hero />

        <Features />

        <HowItWorks />

        <LiveStats />

        <RecentReports />

        <Testimonials />

        <FAQ />

        <Contact />

        <Footer />
      </main>
    </>
  );
}

export default Home;