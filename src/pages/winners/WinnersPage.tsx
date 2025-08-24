import { useEffect, useRef } from "react";

export default function WinnersPage() {
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;
  }, []);

  return (
    <>
      <h1>Ganhadores</h1>
    </>
  );
}
