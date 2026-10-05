import About from "@/components/About";
import Connect from "@/components/Connect";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Parents from "@/components/Parents";
import Staff from "@/components/Staff";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="wrap" id="top">
        <Hero />
        <Gallery />
        <About />
        <Events />
        <Staff />
        <Parents />
        <Connect />
        <Footer />
      </main>
    </>
  );
}
