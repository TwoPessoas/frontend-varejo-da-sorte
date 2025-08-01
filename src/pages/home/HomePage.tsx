import HeaderComponent from "./components/HeaderComponent";
import AboutComponent from "./components/AboutComponent";
import BrandsComponent from "./components/BrandsComponent";
import RulesComponent from "./components/RulesComponent";
import FaqComponent from "./components/FaqComponent";
import FooterComponent from "./components/FooterComponent";

export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      <AboutComponent />
      <BrandsComponent />
      <RulesComponent />
      <FaqComponent />
      <FooterComponent />
    </>
  );
}
