const FooterComponent = () => {
  return (
    <footer className="main-footer bg-color-2 text-center" id="mainFooter">
      <div className="container">
        <div className="pb-4">
          <a className="navbar-brand" href="/">
            <img
              src="./images/logo.svg"
              alt="Anivesário Atakarejo"
              className="img-fluid brand"
            />
          </a>
        </div>

        <div className="social-nav">
          <ul className="nav">
            <li className="social-item">
              <a
                href="https://www.instagram.com/oficialatakarejo/"
                target="_blank"
              >
                {" "}
                <i className="icon-instagram"></i>{" "}
              </a>
            </li>
            <li className="social-item">
              <a
                href="https://pt-br.facebook.com/oficialatakarejo/"
                target="_blank"
              >
                <i className="icon-facebook"></i>{" "}
              </a>
            </li>
            <li className="social-item">
              <a
                href="https://www.youtube.com/oficialatakarejo"
                target="_blank"
              >
                <i className="icon-youtube-play"></i>{" "}
              </a>
            </li>
          </ul>
        </div>
        <div className="contatos">
          <p>
            Para dúvidas ou Suporte entre em contato através dos nossos canais
            de comunicação:
          </p>
          <ul className="">
            <li>71 3460-8700</li>
            <li>
              <a href="mailto:contato@atakarejo.com.br">
                contato@atakarejo.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
