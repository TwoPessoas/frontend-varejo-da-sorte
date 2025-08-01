const FaqComponent = () => {
  return (
    <section id="faq" className="sec sec_faq">
      <div className="overlay top-lights">
        <img src="./images/faq-top-bg-luz.png" alt="" className="" />
      </div>
      <div className="container">
        <div className="sec_top-images">
          <div className="faq-prize prize-1">
            <img
              src="./images/faq-bola-50mil.png"
              className="animate animate-rotate img-fluid"
            />
          </div>
          <div className="faq-prize prize-2">
            <img
              src="./images/faq-bolao-1milhao.png"
              className="animate animate-rotate img-fluid"
            />
          </div>
        </div>
        <div className="sec_content">
          <header className="sec_header mb-4">
            <h2 className="title sec_title">PERGUNTAS FREQUENTES</h2>
          </header>
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqComponent;
