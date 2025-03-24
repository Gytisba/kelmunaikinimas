
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    
    const element = document.getElementById("paslaugos");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const services = [
    {
      id: "tree-cutting",
      title: "Pavojingų medžių pjovimas",
      description: "Saugus ir profesionalus pavojingų medžių pjovimas bei genėjimas net ir sudėtingose vietose.",
      link: "/paslauga/pavojingu-medziu-pjovimas",
      imageSrc: "https://sxzpjfqdxpeyksfmjqii.supabase.co/storage/v1/object/public/project_images//pavojingu%20medziu%20pjovimas.webp"
    },
    {
      id: "stump-grinding",
      title: "Kelmų frezavimas",
      description: "Efektyvus ir ekologiškas būdas pašalinti medžių kelmus be didelių kasimo darbų.",
      link: "/paslauga/kelmu-frezavimas",
      imageSrc: "https://sxzpjfqdxpeyksfmjqii.supabase.co/storage/v1/object/public/project_images//Kelmu_frezavimas.png"
    },
    {
      id: "industrial-climbing",
      title: "Pramoninis alpinizmas",
      description: "Specializuota veikla, leidžianti atlikti įvairius darbus sunkiai pasiekiamose vietose.",
      link: "/paslauga/pramoninis-alpinizmas",
      imageSrc: "https://sxzpjfqdxpeyksfmjqii.supabase.co/storage/v1/object/public/project_images//pramoninis.jpg"
    }
  ];

  return (
    <section id="paslaugos" className="section-padding">
      <div className={`section-container ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="section-title">Mūsų paslaugos</h2>
        <p className="section-text max-w-3xl mb-10">
          Teikiame profesionalias aplinkos tvarkymo paslaugas, 
          pasižyminčias aukšta kokybe ir atsakingu požiūriu į darbą. 
          Plačiau apie kiekvieną paslaugą skaitykite paspaudę ant norimos paslaugos.
        </p>

        {isMobile ? (
          <Accordion type="single" collapsible className="w-full">
            {services.map((service) => (
              <AccordionItem key={service.id} value={service.id}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {service.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 mb-4">
                    <img 
                      src={service.imageSrc} 
                      alt={service.title} 
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80";
                      }}
                    />
                    <p className="mb-4">{service.description}</p>
                    <Link to={service.link}>
                      <Button className="w-full">Sužinoti daugiau</Button>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={service.imageSrc} 
                    alt={service.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-forest-700 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="outline" className="w-full">
                    Sužinoti daugiau
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
