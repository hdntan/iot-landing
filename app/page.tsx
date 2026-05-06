import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Features from "@/app/components/features";
import HowItWorks from "@/app/components/how-it-works";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
