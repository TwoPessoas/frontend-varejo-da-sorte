import HeroComponent from "./components/HeroComponent";
import AboutComponent from "./components/AboutComponent";
import BrandsComponent from "./components/BrandsComponent";
import RulesComponent from "./components/RulesComponent";
import FaqComponent from "./components/FaqComponent";
import FooterComponent from "./components/FooterComponent";
import { useEffect, useRef } from "react";
import { SECURITY_STORE_NAME } from "../../contexts/AuthContext";
import StringUtils from "../../utils/StringUtils";

export const DATA_FINAL_CAMPANHA = "2025-09-30";

export default function HomePage() {
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;

    const securityToken = localStorage.getItem(SECURITY_STORE_NAME);
    if (!securityToken) {
      localStorage.setItem(
        SECURITY_STORE_NAME,
        StringUtils.generateSecureToken(32)
      );
    }
  }, []);

  return (
    <>
      <HeroComponent />
      {/* <AboutComponent /> */}
      <BrandsComponent />
      <RulesComponent />
      <FaqComponent />
      <FooterComponent />
    </>
  );
}
