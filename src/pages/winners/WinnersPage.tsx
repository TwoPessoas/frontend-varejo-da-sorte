import { useEffect, useRef, useState } from "react";
import FooterComponent from "../home/components/FooterComponent";
import useVoucher from "../../hooks/useVoucher";
import type { VoucherDraw } from "../../types/Voucher";
import { is } from "zod/locales";

export default function WinnersPage() {
  const { isLoading, getVouchersDrawn } = useVoucher();
  const [vouchers, setVouchers] = useState<VoucherDraw[]>([]);
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;

    (async () => {
      const data = await getVouchersDrawn();
      if (data) setVouchers(data);
    })();
  }, []);

  return (
    <>
      <div className="winner-page">
        <section className="sec-hero winner-hero hero pt-20 scroll-pb-60 relative">
          <div className="container relative">
            <header className="hero-header ">
              <div className="logo_campaign mb-8">
                <img
                  src="./imgs/logo-campanha.png"
                  className="mx-auto max-w-[320px] w-full"
                />
              </div>
            </header>
          </div>
        </section>

        {/* GANHADORES SEMANAIS * /}
        <section className="wekly_winners">
          <div className="container">
            <div className="wrapper-ganhadores ganhadores-sorteio ">
              <div className="flex gap-2 mb-4 flex-col sm:flex-row">
                <h4 className="title title-ganhadores text-white text-2xl sm:w-3/5">
                  Ganhadores do Sorteio de R$30Mil
                </h4>
                <div className="next-draw-date ">
                  <div className="sorteio-data flex gap-2">
                    <h4 className="text-base text-white">Próximo sorteio:</h4>
                    <h3 className="text-base text-yellow-200">14/09/2025</h3>
                  </div>
                </div>
              </div>
              {/* LISTA DE GANHADORES SEMANAIS / NÚMERO PREMIADO * /}
              <ul className="winners-list text-start space-y-4">
                {isLoading ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Carregando...
                    </h2>
                  </div>
                ) : (
                  vouchers.map((voucher, index) => (
                    <li
                      key={"winner-${index}"}
                      className={`winner-item flex flex-wrap rounded-lg border-2 ${
                        index === 0 && "winner-atual"
                      } ${
                        index % 2 === 0
                          ? "border-white bg-primary"
                          : "bg-primary/20 border-primary/20"
                      }`}
                    >
                      <div className="number text-white">{index + 1}</div>
                      <div className="draw-date">{voucher.drawDate}</div>
                      <div className="winner-name">{voucher.name}</div>
                      <div className="winner-cpf">{`CPF: ${voucher.cpf}`}</div>
                      <div className="valor text-secondary text-lg">
                        R$30.000,00
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>*/}

        <section className="instant-winner pb-[120px]">
          <div className="container">
            {/* GANHADORES DO SORTEIO INSTANTÂNEO */}
            <div className="wrapper-ganhadores ganhadores-vales">
              <h4 className="title title-ganhadores text-2xl text-white">
                Ganhadores do Vale-compras de R$750,00
              </h4>

              <h5 className="text-gray-200 text-xl">
                {`Ganhadores de 10/11 até ${new Date().toLocaleDateString()}`}
              </h5>
              <ul className="list-ganhadores d-flex text-start">
                {/* LISTA DOS GANHADORES INSTANTÂNEOS */}
                {isLoading ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Carregando...
                    </h2>
                  </div>
                ) : (
                  <>
                    {vouchers.length === 0 ? (
                      <h5 className="">LISTA DISPONÍVEL EM BREVE</h5>
                    ) : (
                      vouchers.map((voucher, index) => (
                        <li key={"winner-item-${index}"} className="ganhador">
                          <div className="nome">{voucher.name}</div>
                          <div className="cpf">{`CPF: ${voucher.cpf}`}</div>
                          <div className="data">
                            {new Date(voucher.drawDate).toLocaleDateString()}
                          </div>
                          <div className="valor text-primary">R$750,00</div>
                        </li>
                      ))
                    )}
                  </>
                )}
              </ul>

              {/* <h5 className="">LISTA DISPONÍVEL A PARTIR DE 10/11</h5> */}
            </div>
          </div>
        </section>
      </div>

      <FooterComponent />
    </>
  );
}
