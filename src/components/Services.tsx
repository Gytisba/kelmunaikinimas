
import { useEffect, useState } from "react";

const Services = () => {
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

    const element = document.getElementById("paslaugos");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="paslaugos" className="section-padding bg-muted">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Paslaugos</h2>
        <div className="space-y-8">
          <div className="prose max-w-none">
            <p className="section-text">
              Kelmų naikinimas yra svarbi paslauga, padedanti užtikrinti sklypo tinkamumą įvairioms paskirtims. 
              Palikti kelmai ne tik gadina estetinį vaizdą, bet ir gali sukelti įvairias problemas, tokias kaip: 
              trukdo pjauti žolę, įrengti kraštovaizdžio elementus ar vykdyti kitus sklypo tvarkymo darbus. 
              Dėl šių priežasčių verta investuoti į profesionalų kelmų naikinimą, kuris užtikrina efektyvų, 
              saugų ir ilgalaikį sprendimą sklypo priežiūrai.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-8 glassmorphism">
            <h3 className="text-2xl font-heading font-bold text-forest-600 mb-4">
              Kaip atliekamas kelmų naikinimas?
            </h3>
            <p className="mb-6 text-gray-700">
              Pasirinkus profesionalų kelmų naikinimą, darbai atliekami naudojant pažangią techniką, 
              užtikrinančią greitą ir efektyvų rezultatą. Kelmai gali būti naikinami naudojant šias metodikas:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-forest-500 mr-2">•</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Kelmų frezavimas</span> – greitas ir ekonomiškas 
                  būdas pašalinti kelmą iki žemės paviršiaus lygio;
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-forest-500 mr-2">•</span>
                <p className="text-gray-700">
                  <span className="font-semibold">Kelmų gręžimas</span> – naudojant galingą kelmų grąžtą, 
                  kelmo šerdis sutrupinama, o šaknys natūraliai supūva. Šis metodas leidžia apsaugoti 
                  aplinkinę infrastruktūrą ir yra saugus dirbant arti pastatų ar kitų objektų. Be to, po 
                  gręžimo nelieka duobių, todėl tą pačią vietą galima naudoti naujiems augalams sodinti.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
