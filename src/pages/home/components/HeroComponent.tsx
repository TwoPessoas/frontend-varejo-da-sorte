import PreRegistrationForm from "./PreRegistrationForm";

const HeroComponent = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center  overflow-hidden"
    >

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8 fade-in">
            <h1><img src="./imgs/logo-campanha.png" alt="Aniversário Atakarejo" className=""/></h1>
            
          </div>

          {/* Form Card */}
          <PreRegistrationForm />

          {/* Call to Action */}
          <div className="mt-12 fade-in">
            <img src="./imgs/texto-campanha.png" alt="Aniversário Atakarejo" className=""/>            
          </div>

          {/* Rules*/}
          <div className="rules grid md:grid-cols-2 lg:grid-cols-4 gap-16 items-center mt-20 fade-in overflow-hidden" >
            <div className="rule text-center flex items-center">
              <img src="./imgs/icon-market.png" alt="" className="mx-auto mb-4" />
              <div className="content">
                <h3 className="text-lg font-semibold text-white"><span className="highlight">A cada <span className="text-2xl">R$200</span></span> em compras.</h3>
                
              </div>
            </div>

          </div>


        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
