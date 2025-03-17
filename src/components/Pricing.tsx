
import { useEffect, useState } from "react";

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("kainos");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="kainos" className="section-padding">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Kelmų naikinimo kaina ir ją lemiantys veiksniai</h2>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8">
          <div className="p-8 border-b border-gray-200">
            <p className="text-gray-700 mb-6">
              Kelmų naikinimo kaina priklauso nuo kelių pagrindinių veiksnių:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-forest-500 mr-2 font-bold">•</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Kelmų dydis ir skaičius:</span> didesniems 
                  kelmams reikia daugiau laiko ir pastangų;
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-forest-500 mr-2 font-bold">•</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Sklypo reljefas ir dirvožemio būklė:</span> kuo sklypas 
                  yra nelygesnis (kalvotas) ir akmenuotas, tuo ilgiau užtrunka tvarkymo darbai. 
                  Sudėtingesnis reljefas reikalauja daugiau technikos pritaikymo ir darbo sąnaudų, 
                  todėl tai gali turėti įtakos galutinei kainai.
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-forest-50 p-8">
            <div className="flex items-center">
              <div className="mr-4 bg-forest-500 rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-forest-700 font-medium">
                Šiai paslaugai nėra sezoniškumo – kelmų frezavimas ir naikinimas gali būti atliekamas visais metų laikais!
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="#kontaktai"
            className="btn-primary"
          >
            Sužinoti kainą
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
