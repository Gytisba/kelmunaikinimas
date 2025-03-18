
import { useEffect, useState } from "react";

const OurExpertise = () => {
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

    const element = document.getElementById("specializacija");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const expertiseAreas = [
    {
      title: "Aplinkos tvarkymas ir priežiūra",
      items: [
        "Teritorijų valymas ir priežiūra",
        "Vejų įrengimas ir priežiūra",
        "Želdinių formavimas ir sodinimas",
        "Sezoniniai priežiūros darbai"
      ],
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Arboristų paslaugos",
      items: [
        "Medžių genėjimas ir formavimas",
        "Pavojingų medžių šalinimas",
        "Medžių ligų diagnostika ir gydymas",
        "Medžių sodinimas ir priežiūra"
      ],
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Pramoninis alpinizmas",
      items: [
        "Darbai aukštyje sudėtingomis sąlygomis",
        "Pastatų fasadų valymas ir priežiūra",
        "Specialūs tvarkymo darbai sunkiai pasiekiamose vietose",
        "Aukštuminiai statybos ir remonto darbai"
      ],
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="specializacija" className="section-padding bg-muted">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Mūsų paslaugos</h2>
        <p className="section-text max-w-3xl mb-10">
          Mūsų komanda teikia visapusiškas aplinkos tvarkymo ir priežiūros paslaugas, apjungiančias profesionalių 
          arboristų žinias su pramoninio alpinizmo įgūdžiais. Mūsų ekspertai pasirengę įgyvendinti sudėtingiausius 
          projektus, užtikrindami aukščiausią kokybę ir saugumą.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {expertiseAreas.map((area, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={area.image} 
                  alt={area.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-forest-600 mb-4">{area.title}</h3>
                <ul className="space-y-2">
                  {area.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-forest-500 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurExpertise;
