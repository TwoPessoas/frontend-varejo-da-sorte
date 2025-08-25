import { useEffect, useRef } from "react";
import FooterComponent from "../home/components/FooterComponent";

export default function WinnersPage() {
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;
  }, []);

  return (
    <>
    <div className="winner-page" >
      <section className="sec-hero winner-hero hero pt-8 scroll-pb-60 relative">
        <div className="container relative">
          <header className="hero-header ">
            <div className="logo_campaign mb-8">
              <img src="./imgs/logo-campanha.png" className="mx-auto max-w-[320px] w-full" />
            </div>            
          </header>

          

        </div>
      </section>

      {/* GANHADORES SEMANAIS */}
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
                  {/* LISTA DE GANHADORES SEMANAIS / NÚMERO PREMIADO */}
                  <ul className="winners-list text-start space-y-4">

                  {/* GANHADOR DO ÚLTIMO SORTEIO  */}
                  <li className="winner-item winner-atual border-2 border-white rounded-lg flex flex-wrap bg-primary">
                    <div className="number text-white">2</div>
                    <div className="draw-date">04/09/2025</div>
                    <div className="winner-name">
                      ANDRÉIA REGIS DOS SANTOS
                    </div>
                    <div className="winner-cpf">CPF: ***.***.*5-49</div>
                    <div className="winner-number">7850330</div>
                    <div className="valor text-secondary text-lg">R$30.000,00</div>
                  </li>

                   {/* GANHADORES DOS SORTEIOS ANTEIORES */}
                  <li className="winner-item flex flex-wrap rounded-lg bg-primary/20 border-2 border-primary/20">
                      <div className="number">1</div>
                      <div className="draw-date">04/09/2025</div>
                      <div className="winner-name">
                        JOSE CARLOS ALMEIDA
                      </div>
                      <div className="winner-cpf">CPF: ***.***.*5-53</div>
                      <div className="winner-number">7962851</div>
                      <div className="valor text-secondary text-lg">R$30.000,00</div>
                    </li>

                  </ul>
          </div>

        </div>
      </section>

      <section className="instant-winner pb-[120px]">
        <div className="container">
          {/* GANHADORES DO SORTEIO INSTANTÂNEO */}
          <div className="wrapper-ganhadores ganhadores-vales">
            <h4 className="title title-ganhadores text-2xl text-white">
              Ganhadores do Vale-compras de R$750,00
            </h4>
              
                <h5 className="text-gray-200 text-xl">
                  Ganhadores de 10/11 até [DATA]
                </h5>
                <ul  className="list-ganhadores d-flex text-start">
                  {/* LISTA DOS GANHADORES INSTANTÂNEOS */}
                  <li className="ganhador">
                    <div className="nome">
                      NOME DO GANHADOR
                    </div>
                    <div className="cpf">
                      CPF: ***.***.99-99
                    </div>
                    <div className="data">31/08/2025</div>
                    <div className="valor text-primary">R$750,00</div>
                  </li>
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
