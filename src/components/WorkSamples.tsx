
import { useEffect, useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const WorkSamples = () => {
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

    const element = document.getElementById("darbai");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const workImages = [
    {
      src: "public/lovable-uploads/01bf1b73-2a5d-4bc4-ae0c-ac6319ae6f6d.png",
      alt: "Kelmo frezavimo įranga",
      caption: "Profesionali kelmo frezavimo technika darbui teritorijose"
    },
    {
      src: "public/lovable-uploads/f6f13d09-e38a-4b3d-8988-7a7e064e95c0.png",
      alt: "Kelmo frezavimo įranga iš arti",
      caption: "Mūsų naudojama frezavimo technika sutvarko bet kokio dydžio kelmus"
    },
    {
      src: "public/lovable-uploads/1190008d-2396-48d9-a23c-871bf2e65f87.png",
      alt: "Prieš ir po kelmo frezavimo",
      caption: "Rezultatas prieš ir po kelmo frezavimo darbų"
    }
  ];

  return (
    <section id="darbai" className="section-padding bg-gray-50">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Mūsų darbai</h2>
        <p className="section-text max-w-3xl mb-10">
          Mūsų specialistai dirba su šiuolaikine įranga, laikosi visų saugos standartų ir teikia paslaugas 
          tiek privatiems, tiek verslo klientams. Pasitikėkite mūsų patirtimi ir profesionalumu – sukursime 
          ir prižiūrėsime jūsų aplinką taip, kad ji džiugintų akį ir tarnautų ilgus metus.
        </p>

        <div className="mt-10 max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {workImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-64 md:h-[400px] object-cover" 
                      />
                    </div>
                    <p className="text-center mt-4 text-gray-700">{image.caption}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default WorkSamples;
