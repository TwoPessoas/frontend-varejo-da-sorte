import { useState, useEffect, useRef } from "react";
import usePageContent from "../../../hooks/usePageContent";

interface RulesContent {
  participation: RuleContent;
  prizes: RuleContent;
}

interface RuleContent {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const RulesComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"participation" | "prizes">(
    "participation"
  );
  const [content, setContent] = useState<RulesContent | null>(null);
  const sectionRef = useRef(null);
  const isInited = useRef(false);
  const { isLoading, getContent } = usePageContent();

  // Intersection Observer para animações
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    initContent();

    return () => observer.disconnect();
  }, []);

  const initContent = async () => {
    if (isInited.current) return;
    isInited.current = true;

    const sorteioSemanal = await getContent("regulamento-sorteio-semanal");
    const valeCompras = await getContent("regulamento-vale-compras");

    const rulesContent: RulesContent = {
      participation: {
        title: "Sorteio Semanal",
        subtitle: "Requisitos e processo de participação",
        content: sorteioSemanal ? (
          sorteioSemanal.content
        ) : (
          <div className="regulamento-text text-gray-800">
            <h3 className="">Carregando.</h3>
          </div>
        ),
      },
      prizes: {
        title: "Vale-Compras",
        subtitle: "Informações detalhadas sobre premiação",
        content: valeCompras ? (
          valeCompras.content
        ) : (
          <div className="regulamento-text text-gray-800">
            <h3 className="">Carregando.</h3>
          </div>
        ),
      },
    };

    setContent(rulesContent);
  };

  const tabs = [
    {
      id: "participation",
      name: "Sorteio Semanal",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      id: "prizes",
      name: "Vale-Compras",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const currentContent = content
    ? activeTab === "participation"
      ? content.participation
      : content.prizes
    : {
        title: "",
        subtitle: "",
        content: isLoading ? (
          <p>Carregando...</p>
        ) : (
          <p>Conteúdo não disponível.</p>
        ),
      };

  return (
    <section
      id="rules"
      ref={sectionRef}
      className={`section relative z-10 transition-all duration-1000 delay-400 
          md:pb-36 ${isVisible ? "opacity-100 " : "opacity-100"}`}
    >
      <div
        className="ballon-wrapper justify-start -top-32  right-0 w-[30vw] 
                      md:w-[150px] md:-top-20"
      >
        <img
          src="./imgs/balao-laranja.png"
          alt=" "
          className="ballon ballon-animated ml-[50%]"
        />
      </div>

      <div
        className="ballon-wrapper justify-end bottom-32  left-0 w-[30vw]
                      md:w-[180px] md:bottom-20 md:left-[2vw]"
      >
        <img
          src="./imgs/balao-azul.png"
          alt=" "
          className="ballon ballon-animated mr-[30%] md:mr-0"
        />
      </div>

      <div className="container relative z-10">
        <header className="sec_header">
          <h1 className="title text-primary text-center mb-8 uppercase">
            Regulamento
          </h1>
        </header>

        {/* Tabs Navigation */}
        <div
          className={`mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-2 ">
            {tabs.map((tab, index) => (
              <button
                key={"tab-" + index}
                onClick={() =>
                  setActiveTab(
                    tab.id === "participation" ? "participation" : "prizes"
                  )
                }
                className={`flex items-center justify-center px-6 py-3  w-full md:w-auto  text-center rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-primary shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`transition-all duration-1000 delay-600 tab-content bg-white bg-opacity-50 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="max-w-4xl mx-auto py-8 px-6">
            {/* Content Header */}
            <header className="tab_content-header text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
              </h3>
              <p className="text-gray-600">{currentContent.subtitle}</p>
            </header>

            {/* Content  */}
            <div className="content text-gray-900" dangerouslySetInnerHTML={{__html: typeof currentContent.content === 'string' ? currentContent.content : ''}}>
            </div>
          </div>
        </div>

        {/* REGULAMENTO SORTEIO SEMANAL  */}
        <div className="regulamento-text">
            <h3 className="title">"ANIVERSÁRIO ATAKAREJO"</h3>
            <ol>
                <li>
                  <h4> EMPRESAS PROMOTORAS:</h4>
                  <ol>
                      <li>Empresa Mandatária
                          <ol>
                              <li>Razão Social: Pax Marketing e Eventos Ltda </li>
                              <li>Endereço: Av. Tancredo Neves, 620 – Caminho das Árvores – Salvador/BA</li>
                              <li>CNPJ nº. 34.394.645/0001-78 </li>
                          </ol>
                      </li>
                      <li>Empresa Aderente
                          <ol>
                              <li>Razão Social: Atakarejo Distribuidor de Alimentos e Bebidas S.A</li>
                              <li>Endereço: Av. Santiago de Compostela, 425 – Brotas – Salvador/BA – CEP: 40.279-1500</li>
                              <li>CNPJ nº. 73.849.952/0010-49</li>
                          </ol>
                      </li>
                      <p>A Empresa Mandatária e as Empresas Aderentes são referidas neste documento em conjunto como “Promotora”.</p>
                  </ol>
                </li>
                <li> 
                    <h4>CRITÉRIO DE PARTICIPAÇÃO:</h4>
                    <ol>
                      <li>Qualquer pessoa física com idade igual ou superior a 18 (dezoito) anos, residente e domiciliada nos estados da Bahia e Sergipe, poderá participar da presente promoção <b>“Aniversário Atakarejo”</b>, no período de 00h00 do dia 31 de agosto de 2025 até às 23h59 (horário de Brasília) do dia 30 de setembro de 2025, o que ocorrer primeiro, desde que atenda as condições previstas neste regulamento.
                        <ul>
                          <li>A presente promoção será realizada simultaneamente com outra promoção na modalidade de “Assemelhado a Sorteio”, cujo período, condições de participação, premiações e outras informações deverão ser verificadas no respectivo regulamento no site da promoção. 
                          </li>
                        </ul>
                      </li>
                      <li>
                        Para participar da promoção <b>“Aniversário Atakarejo”</b>, os clientes que informarem seu CPF no PDV no início da compra, efetuarem compras a partir de R$ 200,00 (duzentos reais) nas lojas Atakarejo e que efetuarem o cadastro na promoção através do Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a> no período de 00h00 do dia 31 de agosto de 2025 até às 23h59 (horário de Brasília) do dia 30 de setembro de 2025, terão direito a 01 (um) número da sorte.
                        <ol>
                          <li>Somente terão validade para a promoção as compras identificadas no PDV com CPF do participante que tenha realizado compras a partir de R$ 200 (duzentos reais), desde que, observadas as condições deste Regulamento.</li>
                          <li>Não poderão participar comprovantes de compras de produtos vedados pelo Art. 10º do Decreto 70951/72 sendo estes: medicamentos, armas e munições, explosivos, fogos de artifício ou de estampido, bebidas alcoólicas com teor alcoólico acima de 13º Gay Lussac, fumo e seus derivados.</li>
                        </ol>
                      </li>
                      <li>Os clientes que informarem seu CPF no PDV no início da compra, que realizarem as compras a cada R$ 200,00 (duzentos reais), terão direito a 01 (um) número da sorte, caso a compra contenha produtos das marcas participantes, o cliente terá direito a números da sorte em dobro, sendo que para ter acesso aos números da sorte é necessário que o cliente se cadastre no Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a>, conforme descrito na tabela abaixo, desde que, observadas as condições deste Regulamento.
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>Cadastro na promoção</th>
                                <th>Valor da compra</th>
                                <th>Tem produto das Marcas participantes</th>
                                <th>Se identificou no caixa informando o CPF</th>
                                <th>Qtd de número da sorte</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>                                            
                                <td><b>Não</b></td>
                                <td>R$ 200,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>0</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>
                                <td>R$ 200,00</td>
                                <td>Sim</td>
                                <td><b>Não</b></td>
                                <td><b>0</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 200,00</td>
                                <td><b>Não</b></td>
                                <td>Sim</td>
                                <td><b>1</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 200,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>2</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 400,00</td>
                                <td><b>Não</b></td>
                                <td>Sim</td>
                                <td><b>2</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 400,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>4</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 300,00</td>
                                <td><b>Não</b></td>
                                <td>Sim</td>
                                <td><b>3</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 600,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>6</b></td>                                          
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <ol>
                          <li>As marcas participantes da promoção estarão disponíveis para consulta no Anexo I do regulamento, disponível no Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a>.</li>
                        </ol>

                      </li>
                      <li>Não haverá limites de números da sorte por participante, podendo cada participante concorrer com quantos números da sorte tiver direito, desde que atenda as condições previstas neste regulamento, no entanto cada participante poderá ser contemplado apenas uma única vez durante toda a promoção. </li>
                      <li>Não poderão ser somados dois ou mais comprovantes de compra a fim de totalizar R$ 200,00 (duzentos reais) para obtenção a participação na promoção, da mesma forma que não serão cumulativos nem reaproveitados os valores residuais de determinado comprovante de compra para essa promoção.
                        <ol>
                          <li>Ficam os participantes, cientes, desde já, que a participação na promoção é individualizada, e não poderá, em hipótese alguma, transferir e/ou dividir com outro participante qualquer valor residual, independentemente do grau de parentesco e/ou amizade. Da mesma forma, não será admitida, por força de legislação fiscal, “divisão de valores de notas fiscais” entre participantes no ato da compra.</li>
                        </ol>
                      </li>
                      <li>Para o cadastro na promoção, o participante acessar o Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a> no período entre às 00h00 do dia 31 de agosto de 2025 até às 23h59 (horário de Brasília) do dia 30 de setembro de 2025 (horário oficial de Brasília) para efetuar o cadastro dos seus dados pessoais (Nome completo, CPF, Endereço completo, número de telefone, data de nascimento e e-mail). 
                        <ol>
                          <li>Após realizar o cadastro na promoção e realizado opt-in concordando com a participação na promoção, o participante deverá apenas informar o número do CPF no PDV no momento da compra, para que o cadastro do Cupom Fiscal/Nota Fiscal ocorra automaticamente na promoção em até 72h (setenta e duas horas). </li>
                          <li>Os dados pessoais serão cadastrados uma única vez durante toda a promoção, sendo imprescindível que os participantes forneçam dados corretos no ato do cadastro, uma vez que tais dados serão utilizados para contato e, consequentemente, entrega dos prêmios, caso venham a ser um dos ganhadores desta promoção. Desta forma, a empresa promotora não será responsável quando, em razão do fornecimento de dados incompletos ou incorretos, ficar impossibilitada de realizar a entrega do prêmio ao respectivo ganhador. </li>
                          <li>Em caso de cancelamento da compra (devolução dos produtos por desistência da compra) ou troca do produto, os números da sorte serão automaticamente invalidados para participação no sorteio da promoção. 
                          </li>
                        </ol>
                      </li>

                      <li>Em caso de dúvidas sobre a participação na promoção, o cliente poderá entrar em contato com o SAC Atakarejo através do telefone (71) 3460.8700 e/ou e-mail <a href="mailto:contato@atakarejo.com.br">contato@atakarejo.com.br</a>.</li>

                      <li>O participante poderá consultar os números da sorte gerados através do hotsite da promoção <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a> usando seu login e senha.</li>
                      <li>O número da sorte é composto por 7 (sete) algarismos, sendo o primeiro e segundo número representando a série, outros 5 (cinco) algarismos subsequentes representando o elemento sorteável.
                        <table>
                          <thead>
                            <tr>
                              <th colSpan={2}>Número da Sorte: 1234567</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Nº Série: 12</td>
                              <td>Nº de Ordem: 34567</td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                      <li>
                      Os participantes também não poderão utilizar-se de meios escusos para participar desta promoção e/ou de mecanismos que criem condições de cadastramento irregular, desleais ou que atentem contra os objetivos e condições de participação previstas neste regulamento, qual seja, a compra de produtos participantes. As situações descritas, quando identificadas, serão consideradas como infração aos termos do presente plano de operação, ensejando o impedimento da participação e/ou o imediato cancelamento da inscrição do participante, sem prejuízo, ainda, das medidas cabíveis e/ou ação de regresso a ser promovida pela promotora em face do infrator.</li>

                      <li>A empresa Promotora poderá ainda, por motivos de força maior e/ou problemas de TI, suspender por curto período a geração de números da sorte, mediante a autorização da SPA/MF, sendo certo que, nessa hipótese, a empresa Promotora tomará as medidas necessárias para solucionar o problema e retomar o sistema informatizado, o mais rápido possível, permanecendo inalteradas as regras e condições de validade de participação desta promoção.</li>
                      
                    </ol>
                </li>
                <li>
                    <h4>QUANTIDADE DE SÉRIES: </h4>
                    <ol>
                      <li>Serão emitidas 100 (cem) séries numeradas de “00” a “99”.</li>
                    </ol>
                </li>
                <li>
                    <h4>QUANTIDADE DE SÉRIES:</h4>
                    <ol>
                      <li>Cada série contém 100.000 (cem mil) números de ordem numerados de “00.000” (zero) a “99.999” (noventa e nove mil, novecentos e noventa e nove), totalizando 10.000.000 (dez milhões) de números da sorte.</li>
                    </ol>
                  
                </li>
                <li>
                    <h4>APURAÇÃO E DESCRIÇÃO DE PRÊMIOS:</h4>
                    <ol>
                      <li>Serão distribuídos 10 (dez) prêmios na promoção <b>“Mega Fim de Ano Atakarejo”</b>, conforme descritos abaixo: 
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>Período de Participação</th>
                                <th>Data da Loteria Federal</th>
                                <th>Data da Apuração</th>
                                <th>Qtde. e Ordem dos Prêmios</th>
                                <th>Descrição de Cada Prêmio</th>
                                <th>Série</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>31/08/2025 às 00h00 a 04/09/2025 às 23h59</td>
                                <td>06/09/2025</td>
                                <td>08/09/2025 às 14h00</td>
                                <td>01 prêmio sorteado</td>
                                <td>01 (um) Cartão no valor de R$ 30.000,00, sem função de saque.</td>
                                <td>00 a 99</td>
                              </tr>
                              <tr>
                                <td>31/08/2025 às 00h00 a 11/09/2025 às 23h59</td>
                                <td>13/09/2025</td>
                                <td>15/09/2025 às 14h00</td>
                                <td>01 prêmio sorteado</td>
                                <td>01 (um) Cartão no valor de R$ 30.000,00, sem função de saque.</td>
                                <td>00 a 99</td>
                              </tr>
                              <tr>
                                <td>31/08/2025 às 00h00 a 18/09/2025 às 23h59</td>
                                <td>20/09/2025</td>
                                <td>22/09/2025 às 14h00</td>
                                <td>01 prêmio sorteado</td>
                                <td>01 (um) Cartão no valor de R$ 30.000,00, sem função de saque.</td>
                                <td>00 a 99</td>
                              </tr>
                              <tr>
                                <td>31/08/2025 às 00h00 a 25/09/2025 às 23h59</td>
                                <td>27/09/2025</td>
                                <td>29/09/2025 às 14h00</td>
                                <td>01 prêmio sorteado</td>
                                <td>01 (um) Cartão no valor de R$ 30.000,00, sem função de saque.</td>
                                <td>00 a 99</td>
                              </tr>

                              <tr>
                                <td>31/08/2025 às 00h00 a 30/09/2025 às 23h59</td>
                                <td>04/10/2025</td>
                                <td>06/10/2025 às 14h00</td>
                                <td>01 prêmio sorteado</td>
                                <td>01 (um) Cartão no valor de R$ 30.000,00, sem função de saque.</td>
                                <td>00 a 99</td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </li>
                      <li>A apuração ocorrerá na Agência PQ Marketing, localizada na Rua Irará, 12 – Casa 12 – Rio Vermelho – Salvador/BA - 41940-630, conforme as datas e horários descritos na tabela acima.</li>
                    </ol>
                </li>
                <li>
                    <h4>PREMIAÇÃO TOTAL:</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Quantidade total de brindes</th>
                          <th>Valor total da promoção</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>06</td>
                          <td>R$ 180.000,00</td>
                        </tr>
                      </tbody>
                    </table>
                </li>
                <li>
                    <h4>FORMA DE APURAÇÃO</h4>
                    <ol>
                      <li>Os números da sorte serão distribuídos aos participantes de forma concomitante, aleatória e equivalente, reforçando que um número da sorte só será efetivamente válido para fins de recebimento de premiação por parte do contemplado, desde que cumpridos todos os requisitos constantes no presente Regulamento.</li>
                      <li>As apurações dos resultados da promoção <b>“Aniversário Atakarejo”</b> será com base no resultado da loteria federal, conforme previsto neste Regulamento.</li>
                      <li>Será considerado o contemplado, o elemento sorteável (“Número da Sorte” composto por 07 (sete) algarismos subsequentes que compõem o número de série formado pela dezena simples do 1º e 2º prêmio, lidos verticalmente de cima para baixo, seguidos pelo número de ordem formado pela unidade do 1º ao 5º prêmio, lidos verticalmente de cima para baixo, conforme exemplo I abaixo:

                        <h5>Exemplo I:</h5>
                        1o prêmio 123<span className="blue">0</span><span className="red">5</span><br /> 
                        2º prêmio 054<span className="blue">3</span><span className="red">7</span><br /> 
                        3º prêmio 1352<span className="red">6</span><br /> 
                        4º prêmio 0232<span className="red">9</span><br /> 
                        5º prêmio 1545<span className="red">8</span><br /> 

                        Exemplo de número de série: <span className="blue">03</span><br /> 
                        Exemplo de número de ordem: <span className="red">57698</span><br /> 
                        Exemplo de número da sorte contemplado: <span className="blue">03</span> <span className="red">57698</span>
                      </li>
                      <li>Na eventualidade do Número da Sorte sorteado (ex.: <span className="blue">03</span> <span className="red">57698</span>) não ter sido atribuído, o prêmio caberá ao portador do número da sorte imediatamente superior ou, na falta deste, novamente superior e assim sucessivamente até que se encontre a quantidade de números da sorte contemplados de acordo com a quantidade de prêmios sorteados na apuração.
                        <ol>
                          <li>A título exemplificativo: O critério para identificar o número da sorte contemplado será por aproximação inicialmente para cima com base no número da sorte sorteado (ex.: <span className="blue">03</span> <span className="red">57698</span>), de forma “Crescente”,  ou seja, caso o número da sorte (ex.:<span className="blue">03</span> <span className="red">57698</span>) não tenha disso distribuído na promoção o prêmio será entregue ao número imediatamente superior crescente (ex.:<span className="blue">03</span> <span className="red">57699</span>), caso o mesmo também não tenha sido distribuído na promoção será aplicado novamente a regra “ imediatamente superior crescente” (ex.: <span className="blue">03</span> <span className="red">57700</span>) até que se encontre a quantidade de números da sorte distribuídos em igualdade a quantidade de prêmios a ser distribuídos no respectivo sorteio.</li>
                          
                          <li>Caso a utilização da regra prevista no item anterior resulte no alcance do limite superior (ex.: <span className="blue">99</span><span className="red">99999</span>) do número da sorte, sem a obtenção da quantidade necessária de número da sorte distribuído em relação a quantidade de prêmios sorteado, a distribuição dos prêmios continuará a partir do número da sorte inicial (ex.: <span className="blue">00</span><span className="red">00000</span>), ou seja, (ex.: <span className="blue">00</span><span className="red">00000</span>) caso o mesmo também não tenha sido distribuído na promoção será aplicado novamente a regra “imediatamente superior crescente” (ex.: <span className="blue">00</span><span className="red">00001</span>) e assim sucessivamente até que se encontre a quantidade de números da sorte distribuídos em igualdade a quantidade de prêmios a ser distribuídos no respectivo sorteio.</li>
                        </ol>
                      </li>

                      <li>Caso a Extração da Loteria Federal não venha a ocorrer na data prevista, por qualquer motivo, será considerada para efeito de apuração do resultado desta promoção, a data da Extração da Loteria Federal subsequente, sendo que no caso de acúmulo de sorteios utilizando a mesma extração da Loteria Federal à distribuição dos prêmios será sequencial e cumulativa, prevalecendo a ordem decrescente dos prêmios, com base no valor dos prêmios.</li>
                      
                      <li>Todos os participantes da promoção serão gerenciados diretamente pelos sistemas da empresa promotora de forma integrada, considerando os dados e informações fornecidos pelos Participantes no momento do cadastro, o que permite através do banco de dados a identificação do contemplado.</li>
                      
                      <li>Caso todas as séries aqui previstas sejam utilizadas antes do prazo previsto de término da Promoção, a empresa promotora solicitará autorização para aumento da quantidade de séries junto à SPA/MF, através de aditamento que deverá ser encaminhado a SPA/MF em um prazo mínimo de 10 (dez) dias antes do encerramento das séries. Caso o aditamento não seja autorizado pela SPA/MF, a empresa promotora deverá informar o encerramento da Promoção, através dos mesmos meios de divulgação da Promoção, imediatamente após o término das séries.</li>

                    </ol>                                 
                </li>
                <li>
                    <h4>CRITÉRIOS DE DESCLASSIFICAÇÃO:</h4>
                    <ol>
                      <li>Os participantes poderão ser excluídos automaticamente da promoção em caso de comprovação de fraude, de não preenchimento dos requisitos previamente determinados e/ou cadastros que não apresentarem dados suficientes para a identificação e localização do participante e/ou em decorrência da prestação de informações incorretas ou equivocadas, de acordo com as regras do regulamento da promoção.</li>
                      <li>Todo participante que venha a infringir as regras deste Regulamento, bem como utilizar de fraude ou ardil, será automaticamente excluído da promoção, sem prejuízo da sua responsabilidade civil e criminal. </li>
                      <li>As tentativas de fraudes, tais como, mas não limitadas, ao uso de documentos falsos praticadas pelos participantes, se identificadas, implicarão no não recebimento e/ou cancelamento da compra, sem prejuízo da responsabilidade advinda de processo administrativo, cível ou penal cabível em razão dos atos praticados.</li>
                      <li>Os indícios de fraude e/ou as fraudes comprovadamente identificadas pela empresa promotora que praticadas ou incentivadas pelos participantes ou terceiros interessados na Promoção, que mantenham ou não vínculo com os participantes, se identificadas pela empresa promotora, implicarão no imediato cancelamento do cadastro e perderão o direito a participação nesta Promoção em decorrência do prejuízo da regular execução desta promoção e aos participantes que cumpram todos os requisitos deste Regulamento, sem prejuízo de serem responsabilizados cível e penalmente pelos atos praticados.</li>
                      <li>Ficará vedada a participação dos funcionários das Empresas Promotoras, bem como os funcionários das agências e outras empresas diretamente envolvidas nos processos de planejamento, elaboração e promoção desta campanha. O atendimento ao acima disposto será de inteira responsabilidade das Empresas Promotoras no momento da apuração, que automaticamente desclassificará os nomes de participantes impedidos mediante a verificação do CPF destes. Sendo que um novo contemplado será apurado em seu lugar, seguindo a regra de contemplação na promoção.</li>
                    </ol>
                </li>
                <li>
                    <h4>FORMA DE DIVULGAÇÃO DO RESULTADO:</h4>
                    <ol>
                      <li>O resultado da promoção (nome e número da sorte dos contemplados) será divulgado em até 10 (dez) dias úteis após a data de cada sorteio no site da promoção (<a href="http://www.aniversarioatakarejo.com.br)" target="_blank">www.aniversarioatakarejo.com.br)</a> e neste permanecerá por pelo menos 30 (trinta) dias. </li>
                      <li>Os contemplados serão comunicados no prazo de 10 (dez) dias úteis através de telefonema, mensagem de WhatsApp ou e-mail aos contemplados.</li>
                      <li>Os contemplados dessa promoção receberão um termo de consentimento de preenchimento facultativo para autorizar , a título gratuito e de forma definitiva e irrevogável, à empresa Promotora e aderentes os direitos de uso de sua imagem, som de sua voz e direitos conexos decorrentes de sua participação nesta promoção, autorizando a divulgação de sua imagem, som de voz e nome por quaisquer meios de divulgação e publicação, para utilização comercial ou não, publicitária, promocional e/ou institucional pela Promovente, sem limitação do número de veiculações, inclusive em filmes publicitários e institucionais veiculados em toda e qualquer forma de exploração audiovisual (inclusive, mas sem limitação, em filmes cinematográficos, fitas magnéticas ou digitais, DVD, home vídeo), televisão, em mídia eletrônica, site, além de fotos, cartazetes, anúncios veiculados em jornais e revistas ou em qualquer outra forma de mídia impressa e eletrônica em território nacional, pelo período de 12 (doze) meses, a contar da data de término desta promoção, reservando-se ao participante e seu convidado, se aplicável, apenas o direito de ter o seu nome sempre vinculado ao material produzido e veiculado e/ou publicado por qualquer outra forma de mídia impressa e eletrônica, ou qualquer outro suporte físico, digital ou virtual existente ou que venha a existir, para fins de divulgação desta Promoção.</li>
                    </ol>
                </li>
                <li>
                    <h4>ENTREGA DOS PRÊMIOS:</h4>
                    <ol>
                      <li>Para a entrega do prêmio, o ganhador deverá apresentar documentação comprobatória original do RG/CNH e CPF, sendo que o prêmio não poderá ser retirado por terceiros.</li>

                      <li>Caberá, ao contemplado submeter à análise da empresa promotora os documentos a seguir relacionados para a confirmação dos dados pessoais: RG, CPF, comprovante do domicílio e nota/cupom fiscal cadastrada, no prazo de até 72 horas, contados a partir da data do efetivo contato. O atendimento ao acima disposto será de inteira responsabilidade do participante, caso o mesmo não atenda às regras expostas no presente Regulamento, será automaticamente desclassificado.</li> 

                      <li>Os prêmios são pessoais e intransferíveis e serão entregues em data, hora e local previamente combinado com o contemplado, no prazo de até 30 (trinta) dias contados da data da apuração da promoção, de acordo com o Artigo 5º do Decreto 70.951/72. </li>

                      <li>Os prêmios distribuídos deverão ser livres e desembaraçados de qualquer ônus para os contemplados.</li>

                      <li>Nos termos da legislação em vigor, não será permitida a conversão do prêmio em dinheiro ou, ainda, a sua substituição por outro, bem como a transferência do prêmio à terceiros, que não o contemplado, em data anterior à sua efetiva entrega e integralização ao patrimônio deste.</li>

                      <li>O participante contemplado deverá apresentar e entregar, no ato do recebimento do prêmio, cópia do seu RG e do CPF, bem como assinar um recibo, o qual, de posse da Promotora, constituirá prova de entrega do prêmio. O recibo de entrega do prêmio será mantido sob guarda da Promotora pelo prazo de 05 (cinco) anos após o término da promoção.</li>

                      <li>Ocorrerá prescrição do direito ao prêmio dentro de 180 (cento e oitenta) dias após a data do sorteio da promoção. Ocorrendo a prescrição ora mencionada não caberá ao vencedor qualquer tipo de reclamação e/ou reivindicação, a qualquer título que seja. O prêmio ganho e não reclamados reverterão como Renda da União, no prazo de 10 (dez) dias, de acordo com o Art. 6º do Decreto nº 70951/72.</li>

                      <li>As obrigações e responsabilidade, se houver, da Empresa Mandatária e Aderentes com os participantes ganhadores encerram-se no momento da entrega do prêmio, que será comprovada mediante a assinatura do recibo de entrega do prêmio, não cabendo ao contemplado discutir ou redefinir as condições e/ou premissas da promoção ou do prêmio. As obrigações e responsabilidade, se houver, da empresa promotora com o participante ganhador encerram-se no momento da entrega do prêmio, que será comprovada mediante a assinatura do recibo de entrega do prêmio, não cabendo ao contemplado discutir ou redefinir as condições e/ou premissas da promoção ou do prêmio.
                      </li>
                    </ol>
                </li>
                <li>
                    <h4>DISPOSIÇÕES GERAIS:</h4>
                    <ol>
                      <li>O Regulamento da promoção será disponibilizado no Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a>.</li>
                      <li>Ao se cadastrar nesta promoção, o participante aceita todos os termos do presente Regulamento e autoriza o uso dos seus dados pessoais nos termos do Regulamento. </li>
                      <li>O Participante, autoriza e declara seu expresso consentimento quanto ao uso de seus dados pessoais coletados para fins dessa campanha e, ainda, a sua utilização para fins de recebimento de informes sobre campanhas promocionais, envio de ofertas e demais campanhas das promoventes (Aderentes). Os Participantes reservam-se o direito de revogar esta autorização a qualquer momento mediante pedido escrito direcionado à Promovente, através do Canal do DPO do Atakarejo: <a href="https://atakarejo.com.br/fale-com-o-dpo/" target="_blank">https://atakarejo.com.br/fale-com-o-dpo/</a></li>
                      <li>A Promotora, neste momento, assume o compromisso de proteger os dados pessoais cadastrados, mantendo absoluta confidencialidade sobre tais informações, garantindo que, excetuados os casos previstos em lei e ao fiel cumprimento da execução desta promoção, não serão compartilhados ou cedidos com terceiros a qualquer título.</li>
                      <li>Assim, os dados serão compartilhados apenas com as empresas contratadas pela Promotora, tais como: empresas responsáveis pelo sistema do banco de dados, pela contabilidade, pela auditoria, pela autorização e prestação de contas da promoção junto à SPA/MF, pela assessoria jurídica, pela entrega dos prêmios, todas com a finalidade exclusiva de executar e operacionalizar a presente promoção. Os dados também serão compartilhados com a SPA/MF, órgão público responsável pela autorização, regulação e fiscalização das promoções comerciais, em atenção à legislação que rege o tema.</li>
                      <li>A Promotora exige que todas as empresas responsáveis pela execução e operacionalização desta promoção utilizem referidos dados pessoais em conformidade com este Regulamento e como a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). </li>
                      <li>Internamente, os dados dos participantes serão acessados somente por colaboradores autorizados pela Promotora, respeitando os princípios inerentes ao tratamento de dados pessoais previstos na Lei Geral de Proteção de Dados, sempre com o objetivo de execução e operacionalização desta Promoção, além do compromisso de confidencialidade e preservação da privacidade, de acordo com este Regulamento. </li>
                      <li>E em atenção às diretrizes legais aplicáveis, a Promotora possibilitará aos participantes que revoguem a autorização para uso de seus dados, para fins de execução desta promoção, concedida nos termos do regulamento, bastando que solicitem através do Canal do DPO do Atakarejo: <a href="https://atakarejo.com.br/fale-com-o-dpo/" target="_blank">https://atakarejo.com.br/fale-com-o-dpo/</a>.</li>
                      <li>Na hipótese de a promoção ainda estar em curso, a revogação da autorização, pelos participantes, acarretará na sua imediata desclassificação e na cessação do envio de mensagens com os fins específicos descritos neste Regulamento. </li>
                      <li>Ao término da promoção, os dados pessoais de todos os participantes serão mantidos no banco de dados da Promotora pelo prazo de até 05 (cinco) anos, ou até que haja o cancelamento, de forma expressa, das autorizações de manutenção dos dados previstas no Regulamento, considerando o fato que ocorrer primeiro, sem prejuízo do disposto no item abaixo.</li>
                      <li>A Promotora, para fins de cumprimento legal e/ou defesa em eventual processo administrativo e/ou judicial, manterá, obrigatoriamente, em sua base de dados, os dados pessoais: (i) dos participantes contemplados: pelo prazo até 5 (cinco) anos, contados do término da promoção; e (ii) dos demais participantes inclusive daqueles que cancelaram a autorização para participar desta promoção: até o recebimento, pela Promotora, do ofício de homologação da prestação de contas a ser realizada perante a SPA/MF, no prazo legal. Findos os prazos ora estipulados, os dados serão ser deletados.</li>
                      <li>Os contemplados dessa promoção autorizam, desde já a utilização de seus nomes, imagens e sons de voz, pelas empresas promotoras, pelo prazo de 01 ano, sempre vinculado a esta promoção, em qualquer um dos meios por estes escolhidos, para divulgação desta promoção, sem nenhum ônus as empresas promotoras, ficando desde já estabelecido que este não se responsabilize pela autenticidade e veracidade dos dados fornecidos pelos participantes.</li>
                      <li>A empresa promotora não solicita nenhum dado bancário, cartão de crédito/débito, senha ou outras informações pessoais além das informações necessárias identificação e localização dos ganhadores. </li>
                      
                      <li>As dúvidas, omissões ou controvérsias oriundas da presente Promoção serão, preliminarmente, dirimidas por uma comissão composta por 03 (três) representantes das Empresas Promotoras. Na eventualidade de não se atingir um consenso após a atuação da comissão, a questão deverá, então, ser submetida à apreciação da SPA/MF. No silêncio injustificado das Empresas Promotoras, bem como em razão de decisão insatisfatória que esta vier a adotar quanto a eventuais solicitações de esclarecimentos que lhe forem apresentadas, poderão os consumidores participantes da Promoção, apresentar suas reclamações fundamentadas ao Procon local e/ou aos órgãos públicos integrantes do Sistema Nacional de Defesa do Consumidor.  </li>
                      <li>Conforme o disposto no art. 70, inciso 1º, “b”, da Lei nº. 11.196, de 05/06/05, a empresa promotora recolherá 20% de IRF sobre o valor dos prêmios, até o 3º dia útil subsequente ao decêndio de ocorrência dos fatos geradores, através de DARF, recolhida na rede bancária, com o código 0916.</li>
                      <li>Ocorrerá prescrição do direito ao prêmio dentro de 180 (cento e oitenta) dias após a data do sorteio da promoção. Ocorrendo a prescrição ora mencionada não caberá ao vencedor qualquer tipo de reclamação e/ou reivindicação, a qualquer título que seja. O prêmio ganho e não reclamados reverterão como Renda da União, no prazo de 10 (dez) dias, de acordo com o Art. 6º do Decreto nº 70951/72.</li>
                      <li>Findo o prazo da Promoção e/ou esgotado os números de sorte, qualquer compra/pagamento efetuado pelo consumidor, mesmo que atenda aos demais requisitos deste Regulamento, não ensejará ao mesmo o recebimento de qualquer número da sorte, brinde, dinheiro, troca por outro produto ou devolução do dinheiro gasto com os Produtos Participantes ou reembolso de qualquer outra despesa aqui não prevista.</li>
                      <li>A empresa encaminhará à SPA/MF a Lista de Participantes, anexando na aba "Apurações" do sistema SCPC, os nomes e números da sorte distribuídos, após o término de cada período de participação e antes da extração da Loteria.
                      </li>
                      <li>Esta promoção está de acordo com a legislação vigente (Lei n.º 5.768/71, regulamentada pelo Decreto n.º 70.951/72 e Portaria MF 7.638/22) e obteve o <b>Certificado de Autorização SPA/MF nº. 04.043818/2024</b> expedido pelo Ministério da Fazenda.</li>
                    </ol>
                </li>
            </ol>
        </div>




        {/* REGULAMENTO SORTEIO INSTANTÂNEO  */}
        <div className="regulamento-text">
          <h3 className="title">“ANIVERSÁRIO ATAKAREJO”</h3>
            <ol>
                <li>
                    <h4> EMPRESAS PROMOTORAS:</h4>
                    <ol>
                        <li>Empresa Mandatária
                            <ol>
                                <li>Razão Social: Pax Marketing e Eventos Ltda </li>
                                <li>Endereço: Av. Tancredo Neves, 620 – Caminho das Árvores – Salvador/BA</li>
                                <li>CNPJ nº. 34.394.645/0001-78 </li>
                            </ol>
                        </li>
                        <li>Empresa Aderente
                            <ol>
                                <li>Razão Social: Atakarejo Distribuidor de Alimentos e Bebidas S.A</li>
                                <li>Endereço: Av. Santiago de Compostela, 425 – Brotas – Salvador/BA – CEP: 40.279-1500</li>
                                <li>CNPJ nº. 73.849.952/0010-49</li>
                            </ol>
                        </li>
                        <p>A Empresa Mandatária e as Empresas Aderentes são referidas neste documento em conjunto como “Promotora”.  </p>
                    </ol>
                </li>
                <li>
                  <h4>ÁREA DE ABRANGÊNCIA:</h4>
                  <ol>
                    <li>
                      Nos estados da Bahia e Sergipe
                    </li>
                  </ol>
                </li>
                <li>
                    <h4>CRITÉRIO DE PARTICIPAÇÃO:</h4>
                    <ol>
                      <li>Qualquer pessoa física com idade igual ou superior a 18 (dezoito) anos, residente e domiciliada nos estados da Bahia e Sergipe, poderá participar da presente promoção <b>"Mega Fim de Ano Atakarejo"</b>, no período de 00h00 do dia 10 de novembro de 2024 até às 23h59 (horário de Brasília) do dia 01 de janeiro de 2025 ou até se esgotarem os brindes da promoção, o que ocorrer primeiro.</li>
                      <li>
                      Para participar da promoção <b>"Mega Fim de Ano Atakarejo"</b>, os clientes que informarem seu CPF no PDV no início da compra, efetuarem compras a partir de R$ 200,00 (cem reais) nas lojas Atakarejo e que efetuarem o cadastro na promoção através do Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a> no período de 00h00 do dia 31 de agosto de 2025 até às 23h59 (horário de Brasília) do dia 30 de setembro de 2025, poderá ser contemplado com um dos brindes da promoção.
                        <ol>
                          <li>Somente terão validade para a promoção as compras identificadas no PDV com CPF do participante que tenha realizado compras a partir de R$ 100,00 (cem reais), desde que, observadas as condições deste Regulamento.</li>
                          <li>Não poderão participar comprovantes de compras de produtos vedados pelo Art. 10º do Decreto 70951/72 sendo estes: medicamentos, armas e munições, explosivos, fogos de artifício ou de estampido, bebidas alcoólicas com teor alcoólico acima de 13º Gay Lussac, fumo e seus derivados.</li>
                        </ol>
                      </li>
                      <li>Os clientes que informarem seu CPF no PDV no início da compra, que realizarem as compras a cada R$ 100,00 (cem reais), terão direito a 01 (uma) Caixa de Presente (eletrônica), para descobrir se foi ou não contemplado na promoção, caso a compra contenha produtos das marcas participantes, o cliente terá direito aos balões promocionais em dobro, sendo que para ter acesso aos balões é necessário que o cliente se cadastre no Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a>, conforme descrito na tabela abaixo, desde que, observadas as condições deste Regulamento.
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>Cadastro na promoção</th>
                                <th>Valor da compra</th>
                                <th>Tem produto das Marcas participantes</th>
                                <th>Se identificou no caixa informando o CPF</th>
                                <th>Qtd de Balões</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><b>Não</b></td>
                                <td>R$ 200,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>0</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>
                                <td>R$ 200,00</td>
                                <td>Sim</td>
                                <td><b>Não</b></td>
                                <td><b>0</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 200,00</td>
                                <td><b>Não</b></td>
                                <td>Sim</td>
                                <td><b>1</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 200,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>2</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 400,00</td>
                                <td><b>Não</b></td>
                                <td>Sim</td>
                                <td><b>2</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 400,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>4</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 600,00</td>
                                <td><b>Não</b></td>
                                <td>Sim</td>
                                <td><b>3</b></td>                                          
                              </tr>
                              <tr>
                                <td>Sim</td>                                          
                                <td>R$ 600,00</td>
                                <td>Sim</td>
                                <td>Sim</td>
                                <td><b>6</b></td>                                          
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <ol>
                          <li>As marcas participantes da promoção estarão disponíveis para consulta no Anexo I do regulamento, disponível no Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a>.</li>
                        </ol>

                      </li>
                      <li>Não haverá limites de chances por participante, podendo cada participante concorrer com quantas chances tiver direito, desde que atenda as condições previstas neste regulamento, no entanto cada participante poderá ser contemplado apenas uma única vez na promoção.</li>
                      <li>Não poderão ser somados dois ou mais comprovantes de compra a fim de totalizar R$ 100,00 (cem reais) para obtenção a participação na promoção, da mesma forma que não serão cumulativos nem reaproveitados os valores residuais de determinado comprovante de compra para essa promoção.
                        <ol>
                          <li>Ficam os participantes, cientes, desde já, que a participação na promoção é individualizada, e não poderá, em hipótese alguma, transferir e/ou dividir com outro participante qualquer valor residual, independentemente do grau de parentesco e/ou amizade. Da mesma forma, não será admitida, por força de legislação fiscal, “divisão de valores de notas fiscais” entre participantes no ato da compra.</li>
                        </ol>
                      </li>
                      <li>Para o cadastro na promoção, o participante acessar o Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a> no período entre às 00h00 do dia 31 de agosto de 2025 até às 23h59 (horário de Brasília) do dia 30 de setembro de 2025 (horário oficial de Brasília) para efetuar o cadastro dos seus dados pessoais (Nome completo, CPF, Endereço completo, número de telefone, data de nascimento e e-mail). 
                        <ol>
                          <li>Após realizar o cadastro na promoção e realizado opt-in concordando com a participação na promoção, o participante deverá apenas informar o número do CPF no PDV no momento da compra, para que o cadastro do Cupom Fiscal/Nota Fiscal ocorra automaticamente na promoção em até 72h (setenta e duas horas). </li>
                          <li>Os dados pessoais serão cadastrados uma única vez durante toda a promoção, sendo imprescindível que os participantes forneçam dados corretos no ato do cadastro, uma vez que tais dados serão utilizados para contato e, consequentemente, entrega dos prêmios, caso venham a ser um dos ganhadores desta promoção. Desta forma, a empresa promotora não será responsável quando, em razão do fornecimento de dados incompletos ou incorretos, ficar impossibilitada de realizar a entrega do prêmio ao respectivo ganhador.</li>
                          <li>Em caso de cancelamento da compra (devolução dos produtos por desistência da compra) ou troca do produto, os balões promocionais serão automaticamente invalidados para participação na promoção. </li>
                        </ol>
                      </li>
                      <li>Em caso de dúvidas sobre a participação na promoção, o cliente poderá entrar em contato com o SAC Atakarejo através do telefone (71) 3460.8700 e/ou e-mail <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a>.</li>
                      <li>Os clientes da promoção concorrerão aos vales-compras instantâneos, indicados no item 4.1 deste regulamento, sendo que será contemplado o 1º cliente que “abrir” de forma eletrônica a “Caixa de Presente” no exato horário de contemplação pré-determinado pela empresa promotora conforme planilha sigilosa enviada ao Ministério da Fazenda e anexada ao Regulamento.

                        <ol>
                          <li>Para efeito de participação na promoção será contabilizado o horário em que o cliente “abrir” de forma eletrônica a “Caixa de Presente”, ou seja, será considerada a data, hora, minutos, segundos e milésimos em que o cliente abrir a “Caixa de Presente”. Caso não haja nenhuma participação no horário exato definido em sigilo com junto à SPA/MF, será considerado contemplado o 1º cliente que estourar após o horário definido através de hora, minuto, segundo e milésimos.</li>
                        </ol>

                      </li>
                      <li>Durante o período da promoção estão previstos a participação de aproximadamente 100.000 (cem mil) de cadastros, sendo que serão distribuídos durante toda a promoção 2.001 (dois mil e um) brindes, sendo que a proporção será de 1/50.</li>
                      <li>Os participantes também não poderão utilizar-se de meios escusos para participar desta promoção e/ou de mecanismos que criem condições de cadastramento irregular, desleais ou que atentem contra os objetivos e condições de participação previstas neste regulamento. As situações descritas, quando identificadas, serão consideradas como infração aos termos do presente regulamento, ensejando o impedimento da participação e/ou o imediato cancelamento da inscrição do participante, sem prejuízo, ainda, das medidas cabíveis e/ou ação de regresso a ser promovida pela promotora em face do infrator.</li>
                      <li>A empresa Promotora poderá ainda, por motivos de força maior e/ou problemas de TI, suspender por curto período a geração da “Caixa de Presente”, mediante a autorização da SPA/MF, sendo certo que, nessa hipótese, a empresa Promotora tomará as medidas necessárias para solucionar o problema e retomar o sistema informatizado, o mais rápido possível, permanecendo inalteradas as regras e condições de validade de participação desta promoção.</li>
                    </ol>
                </li>
                <li>
                    <h4>BRINDES</h4>
                    <ol>
                      <li>Serão distribuídos 2.000 (dois mil) brindes na promoção <b>“Aniversário Atakarejo”</b> durante o período entre o dia 10 de novembro de 2024 até dia 01 de janeiro de 2025 ou enquanto durar os estoques, o que ocorrer primeiro.

                        <table>
                          <thead>
                            <tr>
                              <th>Quantidade</th>
                              <th>Descrição do brinde</th>
                              <th>Valor do brinde</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>XX</td>
                              <td>01 (um) Vale-compras Atakarejo no valor de R$ 750,00 (quinhentos reais), sem função de saque, vinculado ao CPF do participante.</td>
                              <td>R$ 750,00</td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                    </ol>
                </li>
                <li>
                    <h4>Premiação Total</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Quantidade total de brindes</th>
                          <th>Valor total da promoção</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>XX</td>
                          <td>R$ R$ XXX</td>
                        </tr>
                      </tbody>
                    </table>
                </li>
                <li>
                    <h4>CRITÉRIOS DE DESCLASSIFICAÇÃO: </h4>
                    <ol>
                      <li>Os participantes poderão ser excluídos automaticamente da promoção em caso de comprovação de fraude, de não preenchimento dos requisitos previamente determinados e/ou cadastros que não apresentarem dados suficientes para a identificação e localização do participante e/ou em decorrência da prestação de informações incorretas ou equivocadas, de acordo com as regras do regulamento da promoção.</li>
                      <li>Todo participante que venha a infringir as regras deste Regulamento, bem como utilizar de fraude ou ardil, será automaticamente excluído da promoção, sem prejuízo da sua responsabilidade civil e criminal. </li>
                      <li>As tentativas de fraudes, tais como, mas não limitadas, ao uso de documentos falsos praticadas pelos participantes, se identificadas, implicarão no não recebimento e/ou cancelamento da compra, sem prejuízo da responsabilidade advinda de processo administrativo, cível ou penal cabível em razão dos atos praticados.</li>
                      <li>Os indícios de fraude e/ou as fraudes comprovadamente identificadas pela empresa promotora que praticadas ou incentivadas pelos participantes ou terceiros interessados na Promoção, que mantenham ou não vínculo com os participantes, se identificadas pela empresa promotora, implicarão no imediato cancelamento do cadastro e perderão o direito a participação nesta Promoção em decorrência do prejuízo da regular execução desta promoção e aos participantes que cumpram todos os requisitos deste Regulamento, sem prejuízo de serem responsabilizados cível e penalmente pelos atos praticados.</li>
                      <li>Ficará vedada a participação dos funcionários das Empresas Promotoras, bem como os funcionários das agências e outras empresas diretamente envolvidas nos processos de planejamento, elaboração e promoção desta campanha. O atendimento ao acima disposto será de inteira responsabilidade das Empresas Promotoras no momento da apuração, que automaticamente desclassificará os nomes de participantes impedidos mediante a verificação do CPF destes. Sendo que um novo contemplado será apurado em seu lugar, seguindo a regra de contemplação na promoção.</li>
                    </ol>
                </li>
                <li>
                    <h4>ENTREGA DOS PRÊMIOS:</h4>
                    <ol>
                      <li>O prêmio será vinculado automaticamente ao CPF do participante contemplado e estará disponível para usufruto em até 30 (trinta) dias contados da apuração, de acordo com o Artigo 5º do Decreto 70.951/72 e terá validade de até 180 (cento e oitenta) dias.</li>
                      <li>O respectivo prêmio será entregue livre e desembaraçado de qualquer ônus para o contemplado.</li>
                      <li>Nos termos da legislação em vigor, não será permitida a conversão do prêmio em dinheiro ou, ainda, a sua substituição por outro, bem como a transferência do prêmio à terceiros, que não o contemplado, em data anterior à sua efetiva entrega e integralização ao patrimônio deste.</li>
                      <li>As obrigações e responsabilidade, se houver, da Empresa Mandatária e Aderentes com os ganhadores encerram-se no momento da entrega do prêmio, não cabendo ao contemplado discutir ou redefinir as condições e/ou premissas da promoção ou do prêmio.</li>
                    </ol>
                </li>
                <li>
                    <h4>DISPOSIÇÕES GERAIS: </h4>
                    <ol>
                      <li>O Regulamento da promoção será disponibilizado no Web App <a href="http://www.aniversarioatakarejo.com.br" target="_blank">www.aniversarioatakarejo.com.br</a>.</li>
                      <li>Fim do prazo da Promoção e/ou esgotado os prêmios, qualquer compra/pagamento efetuado pelo consumidor, mesmo que atenda aos demais requisitos deste Regulamento, não ensejará ao mesmo o recebimento de qualquer brinde, dinheiro, troca por outro produto ou devolução do dinheiro gasto com os Produtos Participantes ou reembolso de qualquer outra despesa aqui não prevista.</li>
                      <li>Caso algum brinde não seja distribuído até o término da promoção, caducará e o valor correspondente será recolhido pela empresa mandatária ao Tesouro Nacional como Renda da União, no prazo subsequente de 10 (dez) dias, conforme decreto 70.951/72.</li>
                      <li>Ao se cadastrar nesta promoção, o participante aceita todos os termos do presente Regulamento e autoriza o uso dos seus dados pessoais nos termos do Regulamento. </li>
                      <li>O Participante, autoriza e declara seu expresso consentimento quanto ao uso de seus dados pessoais coletados para fins dessa campanha e, ainda, a sua utilização para fins de recebimento de informes sobre campanhas promocionais, envio de ofertas e demais campanhas das promoventes (Aderentes). Os Participantes reservam-se o direito de revogar esta autorização a qualquer momento mediante pedido escrito direcionado à Promovente, através do Canal do DPO do Atakarejo: <a href="https://atakarejo.com.br/fale-com-o-dpo/" target="_blank">https://atakarejo.com.br/fale-com-o-dpo/</a> </li>
                      <li>A Promotora, neste momento, assume o compromisso de proteger os dados pessoais cadastrados, mantendo absoluta confidencialidade sobre tais informações, garantindo que, excetuados os casos previstos em lei e ao fiel cumprimento da execução desta promoção, não serão compartilhados ou cedidos com terceiros a qualquer título.</li>
                      <li>Assim, os dados serão compartilhados apenas com as empresas contratadas pela Promotora, tais como: empresas responsáveis pelo sistema do banco de dados, pela contabilidade, pela auditoria, pela autorização e prestação de contas da promoção junto à SPA/MF, pela assessoria jurídica, pela entrega dos prêmios, todas com a finalidade exclusiva de executar e operacionalizar a presente promoção. Os dados também serão compartilhados com a SPA/MF, órgão público responsável pela autorização, regulação e fiscalização das promoções comerciais, em atenção à legislação que rege o tema.</li>
                      <li>A Promotora exige que todas as empresas responsáveis pela execução e operacionalização desta promoção utilizem referidos dados pessoais em conformidade com este Regulamento e como a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). </li>
                      <li>Internamente, os dados dos participantes serão acessados somente por colaboradores autorizados pela Promotora, respeitando os princípios inerentes ao tratamento de dados pessoais previstos na Lei Geral de Proteção de Dados, sempre com o objetivo de execução e operacionalização desta Promoção, além do compromisso de confidencialidade e preservação da privacidade, de acordo com este Regulamento. </li>
                      <li>E em atenção às diretrizes legais aplicáveis, a Promotora possibilitará aos participantes que revoguem a autorização para uso de seus dados, para fins de execução desta promoção, concedida nos termos do regulamento, bastando que solicitem através do Canal do DPO do Atakarejo: <a href="https://atakarejo.com.br/fale-com-o-dpo/" target="_blank">https://atakarejo.com.br/fale-com-o-dpo/</a>. </li>
                      <li>Na hipótese de a promoção ainda estar em curso, a revogação da autorização, pelos participantes, acarretará na sua imediata desclassificação e na cessação do envio de mensagens com os fins específicos descritos neste Regulamento. </li>
                      <li>Ao término da promoção, os dados pessoais de todos os participantes serão mantidos no banco de dados da Promotora pelo prazo de até 05 (cinco) anos, ou até que haja o cancelamento, de forma expressa, das autorizações de manutenção dos dados previstas no Regulamento, considerando o fato que ocorrer primeiro, sem prejuízo do disposto no item abaixo. </li>
                      <li>A Promotora, para fins de cumprimento legal e/ou defesa em eventual processo administrativo e/ou judicial, manterá, obrigatoriamente, em sua base de dados, os dados pessoais: (i) dos participantes contemplados: pelo prazo até 5 (cinco) anos, contados do término da promoção; e (ii) dos demais participantes inclusive daqueles que cancelaram a autorização para participar desta promoção: até o recebimento, pela Promotora, do ofício de homologação da prestação de contas a ser realizada perante a SPA/MF, no prazo legal. Findos os prazos ora estipulados, os dados serão ser deletados.</li>
                      <li>Os contemplados dessa promoção autorizam, desde já a utilização de seus nomes, imagens e sons de voz, pelas empresas promotoras, pelo prazo de 1 ano, sempre vinculado a esta promoção, em qualquer um dos meios por estes escolhidos, para divulgação desta promoção, sem nenhum ônus as empresas promotoras, ficando desde já estabelecido que este não se responsabilize pela autenticidade e veracidade dos dados fornecidos pelos participantes.</li>
                      <li>A empresa promotora não solicita nenhum dado bancário, cartão de crédito/débito, senha ou outras informações pessoais além das informações necessárias identificação e localização dos ganhadores. </li>
                      <li>As dúvidas, omissões ou controvérsias oriundas da presente Promoção serão, preliminarmente, dirimidas por uma comissão composta por 03 (três) representantes das Empresas Promotoras. Na eventualidade de não se atingir um consenso após a atuação da comissão, a questão deverá, então, ser submetida à apreciação da SPA/MF. No silêncio injustificado das Empresas Promotoras, bem como em razão de decisão insatisfatória que esta vier a adotar quanto a eventuais solicitações de esclarecimentos que lhe forem apresentadas, poderão os consumidores participantes da Promoção, apresentar suas reclamações fundamentadas ao Procon local e/ou aos órgãos públicos integrantes do Sistema Nacional de Defesa do Consumidor.</li>
                      <li>Fica, desde já, eleito o foro central da Comarca do participante para solução de quaisquer questões referentes ao Regulamento da presente promoção.</li>
                      <li>Esta promoção está de acordo com a legislação vigente (Lei n.º 5.768/71, regulamentada pelo Decreto n.º 70.951/72 e Portaria MF 7.638/22) e obteve o <b>Certificado de Autorização SPA/MF nº. 05.037869/2024</b> expedido pelo Ministério da Fazenda.</li>
                    </ol>
                </li>
            </ol>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-6 transition-all duration-1000 delay-1000 mb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="btn-outline inline-flex items-center hover-lift"
              >
                Voltar ao Início
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesComponent;


