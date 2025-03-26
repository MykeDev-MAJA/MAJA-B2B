import NavigationButtonInApp from "../shared/NavigationButton/NavigationButtonInApp";

const FullScreenContent = () => {
    return (
        <div className="relative bg-gray-200" style={{ height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
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
                    className="text-white py-3 sm:py-0 text-4xl sm:text-7xl md:text-7xl font-semibold text-center w-1/2"
                    style={{ textRendering: 'optimizeLegibility' }}
                >
                    Representa el valor de tu empresa
                </h1>
                <h2 
                    className="text-white py-3 sm:py-0 text-xl sm:text-2xl md:text-2xl font-light text-center w-1/2"
                    style={{ textRendering: 'optimizeLegibility' }}
                >
                    Un catálogo con la mejor selección de nuestras prendas, especiales para tu empresa y equipo de trabajo
                </h2>
                <NavigationButtonInApp scrollTo="productsSeccion" buttonText="CONÓCENOS" />
            </div>
        </div>
    );
};

export default FullScreenContent; 