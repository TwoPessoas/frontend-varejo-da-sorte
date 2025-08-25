import { useEffect, useRef } from "react";
import FooterComponent from "../home/components/FooterComponent";

export default function RulesPage() {
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;
  }, []);

  return (
    <>
      <div className="rules-page">
        <div className="container">
          <h1>Regras</h1>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
