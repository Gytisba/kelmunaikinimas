
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);

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

  // Images to fetch from Supabase
  const imageFilenames = [
    "01bf1b73-2a5d-4bc4-ae0c-ac6319ae6f6d.png",
    "1190008d-2396-48d9-a23c-871bf2e65f87.png"
  ];

  // Upload and get URLs for images
  useEffect(() => {
    const handleImages = async () => {
      setIsLoading(true);
      
      try {
        const urlMap: {[key: string]: string} = {};
        
        await Promise.all(imageFilenames.map(async (filename) => {
          // Check if the image exists in Supabase storage
          const { data: existingFiles } = await supabase
            .storage
            .from('project_images')
            .list('', {
              search: filename
            });

          // If the image doesn't exist, upload it
          if (!existingFiles || existingFiles.length === 0) {
            const response = await fetch(`/lovable-uploads/${filename}`);
            const blob = await response.blob();

            await supabase
              .storage
              .from('project_images')
              .upload(filename, blob, {
                upsert: true
              });
          }

          // Get the public URL
          const { data } = supabase
            .storage
            .from('project_images')
            .getPublicUrl(filename);

          urlMap[filename] = data.publicUrl;
        }));

        setImageUrls(urlMap);
      } catch (error) {
        console.error('Error handling images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleImages();
  }, []);

  return (
    <section id="paslaugos" className="section-padding bg-muted">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Kelmų naikinimas</h2>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-700"></div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={imageUrls["01bf1b73-2a5d-4bc4-ae0c-ac6319ae6f6d.png"]} 
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
                      src={imageUrls["1190008d-2396-48d9-a23c-871bf2e65f87.png"]} 
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
