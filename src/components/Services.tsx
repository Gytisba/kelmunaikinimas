
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMethodsOpen, setIsMethodsOpen] = useState(false);
  const isMobile = useIsMobile();

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
        <h2 className="section-title">Kelmų naikinimas</h2>
        <div className="space-y-8">
          {isMobile ? (
            <Collapsible>
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-sm">
                <span className="font-semibold text-forest-600">Apie kelmų naikinimą</span>
                <ChevronDown className="h-5 w-5 text-forest-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white rounded-b-lg shadow-md mt-1">
                <p className="text-gray-700">
                  Kelmų naikinimas yra svarbi paslauga, padedanti užtikrinti sklypo tinkamumą įvairioms paskirtims. 
                  Palikti kelmai ne tik gadina estetinį vaizdą, bet ir gali sukelti įvairias problemas, tokias kaip: 
                  trukdo pjauti žolę, įrengti kraštovaizdžio elementus ar vykdyti kitus sklypo tvarkymo darbus. 
                  Dėl šių priežasčių verta investuoti į profesionalų kelmų naikinimą, kuris užtikrina efektyvų, 
                  saugų ir ilgalaikį sprendimą sklypo priežiūrai.
                </p>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className="prose max-w-none">
              <p className="section-text">
                Kelmų naikinimas yra svarbi paslauga, padedanti užtikrinti sklypo tinkamumą įvairioms paskirtims. 
                Palikti kelmai ne tik gadina estetinį vaizdą, bet ir gali sukelti įvairias problemas, tokias kaip: 
                trukdo pjauti žolę, įrengti kraštovaizdžio elementus ar vykdyti kitus sklypo tvarkymo darbus. 
                Dėl šių priežasčių verta investuoti į profesionalų kelmų naikinimą, kuris užtikrina efektyvų, 
                saugų ir ilgalaikį sprendimą sklypo priežiūrai.
              </p>
            </div>
          )}

          <Collapsible 
            open={!isMobile || isMethodsOpen} 
            onOpenChange={isMobile ? setIsMethodsOpen : undefined}
            className="bg-white rounded-lg shadow-md glassmorphism"
          >
            {isMobile ? (
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                <h3 className="text-2xl font-heading font-bold text-forest-600">
                  Kaip atliekamas kelmų naikinimas?
                </h3>
                <ChevronDown className={`h-5 w-5 text-forest-500 transition-transform ${isMethodsOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
            ) : (
              <h3 className="text-2xl font-heading font-bold text-forest-600 p-6 mb-0">
                Kaip atliekamas kelmų naikinimas?
              </h3>
            )}
            
            <CollapsibleContent className={isMobile ? "px-4 pb-4" : "p-6 pt-0"}>
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
            </CollapsibleContent>
          </Collapsible>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://sxzpjfqdxpeyksfmjqii.supabase.co/storage/v1/object/public/project_images//1190008d-2396-48d9-a23c-871bf2e65f87.png" 
                  alt="Kelmų frezavimo įranga" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-forest-600 mb-2">Moderni įranga</h3>
                <p className="text-gray-700">
                  Naudojame galingą ir modernią kelmų frezavimo techniką, kuri efektyviai pašalina 
                  bet kokio dydžio kelmus iki žemės paviršiaus lygio.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://sxzpjfqdxpeyksfmjqii.supabase.co/storage/v1/object/public/project_images//0b8f6b8d-290a-4863-9602-1dc5d962610a.png" 
                  alt="Prieš ir po kelmo frezavimo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-forest-600 mb-2">Akivaizdūs rezultatai</h3>
                <p className="text-gray-700">
                  Mūsų teikiamos paslaugos rezultatai akivaizdžiai matomi prieš ir po darbų. 
                  Visiems darbams suteikiame garantiją.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
