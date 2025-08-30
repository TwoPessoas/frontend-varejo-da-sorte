import HeroComponent from "./components/HeroComponent";
import BrandsComponent from "./components/BrandsComponent";
import RulesComponent from "./components/RulesComponent";
import FaqComponent from "./components/FaqComponent";
import FooterComponent from "./components/FooterComponent";
import { useEffect, useRef } from "react";
import { SECURITY_STORE_NAME } from "../../contexts/AuthContext";
import StringUtils from "../../utils/StringUtils";
import { useClient } from "../../contexts/ClientContext";

export const DATA_INICIAL_CAMPANHA = "2025-08-31";
export const DATA_FINAL_CAMPANHA = "2025-09-30";

export default function HomePage() {
  const { clear } = useClient();
  const isInited = useRef(false);
  const initDate = new Date(DATA_INICIAL_CAMPANHA);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;

    if (new Date() < initDate) {
      clear();
    }

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
      <HeroComponent showForm={new Date() >= initDate} />
      {/* <AboutComponent /> */}
      <BrandsComponent />
      <RulesComponent />
      <FaqComponent />
      <FooterComponent />
    </>
  );
}
