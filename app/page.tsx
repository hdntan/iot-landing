import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Features from "@/app/components/features";
import HowItWorks from "@/app/components/how-it-works";
import UseCases from "@/app/components/use-cases";
import Testimonials from "@/app/components/testimonials";
import Pricing from "@/app/components/pricing";
import Faq from "@/app/components/faq";
import Stats from "@/app/components/stats";
import Footer from "@/app/components/footer";
import FrapButton from "@/app/components/frap-button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* <Stats /> */}
        <HowItWorks />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <FrapButton />
    </>
  );
}
