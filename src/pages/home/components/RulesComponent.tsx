const RulesComponent = () => {
  return (
    <section className="sec sec_regulamento">
      <div className="container">
        <header className="sec_header">
          <h2 className="title sec_title">REGULAMENTO</h2>
        </header>
        <div className="sec_content">
          <div id="regulamento-tab" className="tabs">
            <div title="SORTEIO" className="tab p-4">
              <div className="regulamento-text">
                <h3 className="title">"MEGA FIM DE ANO"</h3>
                <ol>
                  <li>
                    Empresa Mandatária
                    <ol>
                      <li>Razão Social: Pax Marketing e Eventos Ltda </li>
                      <li>
                        Endereço: Av. Tancredo Neves, 620 – Caminho das Árvores
                        – Salvador/BA
                      </li>
                      <li>CNPJ nº. 34.394.645/0001-78 </li>
                    </ol>
                  </li>
                  <li>
                    Empresa Aderente
                    <ol>
                      <li>
                        Razão Social: Atakarejo Distribuidor de Alimentos e
                        Bebidas S.A
                      </li>
                      <li>
                        Endereço: Av. Santiago de Compostela, 425 – Brotas –
                        Salvador/BA – CEP: 40.279-1500
                      </li>
                      <li>CNPJ nº. 73.849.952/0010-49</li>
                    </ol>
                  </li>
                  <p>
                    A Empresa Mandatária e as Empresas Aderentes são referidas
                    neste documento em conjunto como “Promotora”.{" "}
                  </p>
                </ol>
              </div>
            </div>
            <div title="VALES-COMPRAS" className="tab p-4">
              <div className="regulamento-text">
                <h3 className="title">"MEGA FIM DE ANO"</h3>
                <ol>
                  <li>
                    Empresa Mandatária
                    <ol>
                      <li>Razão Social: Pax Marketing e Eventos Ltda </li>
                      <li>
                        Endereço: Av. Tancredo Neves, 620 – Caminho das Árvores
                        – Salvador/BA
                      </li>
                      <li>CNPJ nº. 34.394.645/0001-78 </li>
                    </ol>
                  </li>
                  <li>
                    Empresa Aderente
                    <ol>
                      <li>
                        Razão Social: Atakarejo Distribuidor de Alimentos e
                        Bebidas S.A
                      </li>
                      <li>
                        Endereço: Av. Santiago de Compostela, 425 – Brotas –
                        Salvador/BA – CEP: 40.279-1500
                      </li>
                      <li>CNPJ nº. 73.849.952/0010-49</li>
                    </ol>
                  </li>
                  <p>
                    A Empresa Mandatária e as Empresas Aderentes são referidas
                    neste documento em conjunto como “Promotora”.{" "}
                  </p>
                </ol>
              </div>
            </div>
          </div>
          <div className="d-flex justify-end">
            <a
              href="/regulamento"
              className="btn btn-primary btn-lg mt-2 ms-auto"
            >
              Conferir Regulamento completo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesComponent;
