
import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="pagrindinis"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div
          className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2000&q=80')",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div
          className={`max-w-3xl transition-all duration-1000 delay-300 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block py-1 px-3 mb-6 bg-forest-500 bg-opacity-80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            Profesionalios paslaugos
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Kelmų naikinimas – efektyvus būdas išvalyti teritoriją
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl">
            Profesionalios paslaugos visoje Lietuvoje
          </p>
          <a
            href="#kontaktai"
            className="inline-flex items-center btn-primary text-lg"
          >
            Susisiekite
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-8 h-8 text-white opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
