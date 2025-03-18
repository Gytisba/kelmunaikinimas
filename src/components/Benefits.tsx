
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const Benefits = () => {
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

    const element = document.getElementById("privalumai");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const benefits = [
    "Dirba profesionalų komanda su patikima įranga",
    "Teikiamos garantijos visiems atliktiems darbams",
    "Paslaugos teikiamos visus metus, nepriklausomai nuo sezono",
    "Naudojama šiuolaikinė technika užtikrina aukštą darbų kokybę",
    "Atliekami darbai ir sunkiai pasiekiamose vietose",
    "Specialistai laikosi visų saugumo standartų",
    "Tinkama įranga bet kokio dydžio projektams",
    "Patirtis dirbant tiek su privačiais, tiek su verslo klientais"
  ];

  return (
    <section id="privalumai" className="section-padding bg-accent">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Kodėl verta rinktis mus?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-start border border-forest-100 hover:border-forest-300 transition-colors duration-300"
            >
              <div className="mr-4 mt-1">
                <div className="bg-forest-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-gray-700">{benefit}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
