import moment from "moment";
import PreRegistrationForm from "./PreRegistrationForm";

const HeaderComponent = () => {
  const showRegisterForm = () => {
    //if (!IS_PRODUCTION) return true;

    let now = Number.parseInt(moment().format("YYYYMMDD"));
    return now >= 20250801;
  };

  return (
    <div className="">
      <section className="">
        <div className="hero-image hero-image-top ">
          <div className="img-wrapper">
            <img src="./images/guirlanda-top.png" className="" />
          </div>
        </div>

        <div className="containe hero-inner">
          <div className="position-relative">
            <header className="hero-header">
              <div className="logo_campaign ">
                <img src="./images/logo-campanha.png" className="img-fluid" />
              </div>
              <div className="rewards d-none d-md-flex  align-items-start overflow-hidden">
                <img
                  src="./images/bola-1.5m.png"
                  srcSet="./images/bola-1.5m@2x.png"
                  className="ball ball-15"
                />
                <img
                  src="./images/bola-1m.png"
                  srcSet="./images/bola-1m@2x.png"
                  className="ball ball-1"
                />
                <img
                  src="./images/bola-50mil.png"
                  srcSet="./images/bola-50mil@2x.png"
                  className="ball  ball-50"
                />
              </div>
            </header>

            <div className="form_area ms-md-auto">
              {showRegisterForm() ? (
                <PreRegistrationForm />
              ) : (
                <div className="d-none">
                  <h3>Campanha inicia no dia 01/08/2025</h3>
                </div>
              )}
            </div>

            <div className="rewards align-items-start d-flex d-md-none overflow-hidden">
              <img
                src="./images/bola-1.5m.png"
                srcSet="./images/bola-1.5m@2x.png"
                className="ball ball-15"
              />
              <img
                src="./images/bola-1m.png"
                srcSet="./images/bola-1m@2x.png"
                className="ball ball-1"
              />
              <img
                src="./images/bola-50mil.png"
                srcSet="./images/bola-50mil@2x.png"
                className="ball  ball-50"
              />
            </div>

            <div className="hero-image hero-image-bottom ">
              <img src="./images/santa.png" className="left" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeaderComponent;
