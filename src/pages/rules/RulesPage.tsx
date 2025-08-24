import { useEffect, useRef } from "react";

export default function RulesPage() {
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;
  }, []);

  return (
    <>
      <h1>Regras</h1>
    </>
  );
}
