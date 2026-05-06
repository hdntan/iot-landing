import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import Features from "@/app/components/features";
import HowItWorks from "@/app/components/how-it-works";
import UseCases from "@/app/components/use-cases";
import Testimonials from "@/app/components/testimonials";
import Pricing from "@/app/components/pricing";
import Faq from "@/app/components/faq";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
