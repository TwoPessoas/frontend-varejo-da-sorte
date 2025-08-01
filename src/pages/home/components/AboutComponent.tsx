const AboutComponent = () => {
  return (
    <section className="about sec_about">
      <div className="container position-relative">
        <div className="sec_inner sec_content" id="como-participar">
          <ol className="d-flex flex-column flex-md-row sec_list flex-md-wrap row">
            <li className="list_item col-md-6 col-lg-3">
              <img src="./images/icon-market.png" className="img-fluid" />
              <div className="list_content">
                <div className="list_content-inner">
                  A cada <span className="font-lg d-block">R$ 100</span>{" "}
                  <span className="highlight">em compras</span>
                </div>
              </div>
            </li>
            <li className="list_item col-md-6 col-lg-3">
              <img src="./images/icon-note.png" className="img-fluid" />
              <div className="list_content">
                <div className="list_content-inner">
                  Cadastre <span className="highlight">a sua nota no site</span>
                </div>
              </div>
            </li>
            <li className="list_item col-md-6 col-lg-3">
              <img src="./images/icon-present.png" className="img-fluid" />
              <div className="list_content">
                <div className="list_content-inner">
                  <span className="highlight">Abra o saco de presente e</span>{" "}
                  concorra a vales-compras!
                </div>
              </div>
            </li>
            <li className="list_item col-md-6 col-lg-3">
              <img src="./images/icon-hand.png" className="img-fluid" />
              <div className="list_content">
                <div className="list_content-inner">
                  <span className="font-lg">2x</span> mais chances{" "}
                  <span className="highlight ">com produtos de</span> marcas
                  participantes!
                </div>
              </div>
            </li>
          </ol>
        </div>
        <div className="date  text-center pb-4">
          Campanha válida de 10/11/24 a 04/01/25 em todas as lojas Atakarejo
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
