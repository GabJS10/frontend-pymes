import { NavBar } from "@/components/NavBarLanding";
import { SectionLanding } from "@/components/SectionLanding";
import { AboutLanding } from "@/components/AboutLanding";
import { RatioLanding } from "@/components/RatioLanding";
import { SectionFooter } from "@/components/SectionFooter";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <>
      <NavBar />
      <SectionLanding />
      <AboutLanding />
      <RatioLanding />
      <SectionFooter />
      <Footer />
    </>
  );
}
