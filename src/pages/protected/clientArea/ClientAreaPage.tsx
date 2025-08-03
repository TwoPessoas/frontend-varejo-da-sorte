import { useEffect, useRef } from "react";
import { useClient } from "../../../contexts/ClientContext";

export default function ClientAreaPage() {
  const { me, client } = useClient();
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;

    isInited.current = true;
    const getMe = async () => {
      await me();
      console.log("[client]", client);
    };

    getMe();
  }, []);
  return <></>;
}
