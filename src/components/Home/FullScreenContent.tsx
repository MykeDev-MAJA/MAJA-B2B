import IniciarSesion from "./Components/IniciarSesion";

const FullScreenContent = () => {
    return (
        <>
        <div className="flex items-center text-sm justify-center bg-gray-200 w-full h-9">
Envio gratis a todo México       </div>
              <div className="relative bg-gray-200" style={{ height: 'calc(100vh - 60px - 36px)', overflow: 'hidden' }}>
            <video 
                src="https://majasportswear.com/wp-content/uploads/2024/09/MAJA_CORP_BANNER_WEBSITE_AdobeExpress1.mp4" 
                autoPlay 
                loop 
                muted 
                preload="auto"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div className="relative z-10 flex flex-col items-center justify-center gap-12 h-full">
                <h1 
                    className="text-white py-3 sm:py-0 text-2xl sm:text-4xl md:text-6xl font-semibold text-center w-[88%] md:w-[64%]"
                    style={{ textRendering: 'optimizeLegibility' }}
                >
                    REPRESENTA EL VALOR DE TU EMPRESA
                </h1>
                <h2 
                    className="text-white py-3 sm:py-0 text-sm sm:text-2xl md:text-2xl font-light text-center w-[88%] md:w-1/2 "
                    style={{ textRendering: 'optimizeLegibility' }}
                >
UN CATÁLOGO CON LA MEJOR SELECCIÓN DE NUESTRAS PRENDAS, ESPECIALES PARA TU EMPRESA Y EQUIPO DE TRABAJO                </h2>
                <IniciarSesion />
           </div>
        </div>
        </>
  
    );
};

export default FullScreenContent; 