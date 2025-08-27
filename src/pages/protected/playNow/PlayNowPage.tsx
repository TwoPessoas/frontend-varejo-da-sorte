import { useState, useEffect, useRef } from "react";
import { useClient } from "../../../contexts/ClientContext";
import { useNavigate } from "react-router-dom";
import type { VoucherResponse } from "../../../types/Voucher";

const PlayNowPage = () => {
  const { updateSummary, getSummary, tryMyLuck } = useClient();
  const [voucherData, setVoucherData] = useState<VoucherResponse | null>(null);
  const [gameState, setGameState] = useState("ready"); // ready, playing, result
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;
    updateSummary();
  }, []);

  // Função para simular o jogo
  const playGame = async () => {
    if ((getSummary()?.opportunitiesNotUsed || 0) <= 0) {
      alert("Você não tem chances disponíveis!");
      return;
    }

    setGameState("playing");

    // Simular processamento do jogo (3-5 segundos)
    const processingTime = Math.random() * 2000 + 3000; // 3-5 segundos
    await new Promise((resolve) => setTimeout(resolve, processingTime));

    const response = await tryMyLuck();
    setGameState("result");
    setVoucherData(response);

    // Se ganhou, mostrar confetti
    if ((response?.win || false) == true) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const resetGame = () => {
    setGameState("ready");
    setShowConfetti(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const goToHome = () => {
    navigate("/area-cliente");
  };

  console.log("[GameState]", gameState);

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 1}s`,
              }}
            />
          ))}
        </div>
      )}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center pt-6 dashboard-area">

        <div className="container">
          {/* Header Info */}
          <div className="text-center mb-8">
             <img src="./imgs/logo-campanha.png" className="mb-6 max-w-[280px] mx-auto" alt="" />
            <h1 className="text-3xl md:text-4xl font-bold text-white  mb-4">
              Abra o seu Presente Atakarejo
            </h1>
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-soft">
              <div className="flex items-center space-x-2">
                
                <span className="font-bold text-gray-900">
                  Chances restantes:
                </span>
                <span className="text-primary font-bold text-lg">
                  {getSummary()?.opportunitiesNotUsed || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="bg-white rounded-2xl shadow-strong overflow-hidden">
            {/* Game State: Ready */}
            {gameState === "ready" && (
              <div className="p-8 md:p-12 text-center">
                <div className="w-32 h-32 bg-secondary-700 border-primary border-2 rounded-full flex items-center justify-center mx-auto mb-8">
                  <img src="./imgs/presente.png" alt="" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Preparado?
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                  Clique no botão abaixo para abrir os seus presentes desponíveis. E boa sorte!
                </p>

                <div className="space-y-4">
                  <button
                    onClick={playGame}
                    disabled={(getSummary()?.opportunitiesNotUsed || 0) <= 0}
                    className="btn-primary text-xl px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-200"
                  >
                    {(getSummary()?.opportunitiesNotUsed || 0) > 0 ? (
                      <>Abrir meus presentes</>
                    ) : (
                      "Sem chances disponíveis"
                    )}
                  </button>

                  {(getSummary()?.opportunitiesNotUsed || 0) <= 0 && (
                    <p className="text-red-600 text-sm">
                      Você precisa de mais chances para jogar. Cadastre notas
                      fiscais para ganhar mais chances!
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Game State: Playing */}
            {gameState === "playing" && (
              <div className="p-8 md:p-12 text-center">
                <div className="w-32 h-32 border-8 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Abrindo a Caixa da Sorte...
                </h2>
                <p className="text-gray-600 text-lg">
                  Aguarde enquanto processamos sua jogada
                </p>

                <div className="mt-8 flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Game State: Result */}
            {gameState === "result" && (
              <div className="relative">
                {/* Video Area */}
                <div className="relative bg-gray-900 aspect-video">
                  {(voucherData?.win || false) === true ? (
                    // Vídeo de Vitória (placeholder)
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600">
                      <video src="./videos/victory.mp4" autoPlay muted></video>

                      {/* <div className="text-center text-white">
                        <div className="text-8xl mb-4">🎉</div>
                        <h3 className="text-4xl font-bold mb-2">PARABÉNS!</h3>
                        <p className="text-xl">{voucherData?.gift || ""}</p>
      
                        <div className="mt-4 text-2xl font-mono font-bold">
                          Número: {voucherData?.voucher}
                        </div> 

                      </div>
                       */}
                    </div>
                  ) : (
                    // Vídeo de "Não foi dessa vez" (placeholder)
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                      <video src="./videos/try-again.mp4" autoPlay muted></video>
                      {/*                       
                      <div className="text-center text-white">
                        <div className="text-8xl mb-4">🎯</div>
                        <h3 className="text-4xl font-bold mb-2">
                          Não foi dessa vez!
                        </h3>
                        <p className="text-xl">
                          Tente novamente. A sorte pode estar ao seu lado!
                        </p>
                      </div> 
                      */}

                    </div>
                  )}

                  {/* Aqui você colocaria o vídeo real */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    onEnded={() => console.log("Vídeo terminou")}
                  >
                    <source
                      src={
                        (voucherData?.win || false) === true
                          ? "/videos/victory.mp4"
                          : "/videos/try-again.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>

                {/* Result Info */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    {(voucherData?.win || false) === true ? (
                      <div>
                        <h2 className="text-3xl font-bold text-green-600 mb-4">
                          🏆 Você ganhou um voucher!
                        </h2>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
                          O seu voucher foi enviado para o seu e-mail cadastrado.
                          {/* <div className="text-green-800 font-bold text-sm mb-1">
                            SEU VOUCHER
                          </div>
                          <div className="text-3xl font-mono font-bold text-green-600">
                            {voucherData?.voucher}
                          </div> */}


                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">
                          Continue tentando!
                        </h2>
                        <p className="text-gray-600 text-lg mb-4">
                          Não desanime!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={resetGame}
                      disabled={(getSummary()?.opportunitiesNotUsed || 0) <= 0}
                      className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {(getSummary()?.opportunitiesNotUsed || 0) > 0
                          ? "Jogar Novamente"
                          : "Sem chances restantes"}
                      </span>
                    </button>

                    <button
                      onClick={goToHome}
                      className="btn-outline flex items-center justify-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span>Voltar a área do cliente</span>
                    </button>
                  </div>

                  
                </div>
              </div>
            )}
          </div>
          {/* Quick Stats */}
            {/* 
          {gameState === "ready" && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-soft">
                <div className="text-2xl font-bold text-primary">
                  {getSummary()?.opportunitiesNotUsed || 0}
                </div>
                <div className="text-sm text-gray-600">Chances Restantes</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-soft">
                <div className="text-2xl font-bold text-secondary">
                  {getSummary()?.drawNumbersTotal || 0}
                </div>
                <div className="text-sm text-gray-600">Números da Sorte</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-soft">
                <div className="text-2xl font-bold text-green-600">
                  {getSummary()?.invoicesTotal || 0}
                </div>
                <div className="text-sm text-gray-600">Notas Cadastradas</div>
              </div>
            </div>
          )}
            */}

        </div>
      </div>
    </>
  );
};

export default PlayNowPage;
