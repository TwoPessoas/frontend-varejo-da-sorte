import HeroComponent from "./components/HeroComponent";
import AboutComponent from "./components/AboutComponent";
import BrandsComponent from "./components/BrandsComponent";
import RulesComponent from "./components/RulesComponent";
import FaqComponent from "./components/FaqComponent";
import FooterComponent from "./components/FooterComponent";

export const DATA_FINAL_CAMPANHA = '2025-09-30';

export default function HomePage() {
  
  return (
    <>
      <HeroComponent />
      <AboutComponent />
      <BrandsComponent />
      <RulesComponent />
      <FaqComponent />
      <FooterComponent />
    </>
  );
}
