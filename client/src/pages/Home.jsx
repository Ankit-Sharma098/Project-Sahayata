import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LiveStats from "../components/LiveStats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import RecentReports from "../components/RecentReports";

function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-950">
        <Hero />
        <LiveStats />
        <Features />
        <HowItWorks />
        <RecentReports />
      </main>
    </>
  );
}

export default Home;