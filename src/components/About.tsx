
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const animatedElements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    animatedElements?.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      animatedElements?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="apie-mus" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="animate-on-scroll">
              <h2 className="section-title">Apie mus</h2>
              <div className="space-y-4 section-text">
                <p>
                  Esame užsitarnavę klientų pasitikėjimą, teikdami modernias 
                  aplinkos tvarkymo paslaugas visoje Lietuvoje. Dirbame 
                  ištisus metus, septynias dienas per savaitę – ir taip jau 
                  daugiau nei devynis metus, tad natūralu, jog esame tikri 
                  aplinkos tvarkymo profesionalai.
                </p>
                <p>
                  Mūsų įmonė viena iš pirmųjų Lietuvoje pradėjo mechanizuotu 
                  būdu frezuoti krūmus ir naikinti kelmus. Dirbame ištisus metus 
                  ŽIEMĄ, PAVASARĮ, VASARĄ, RUDENĮ! Aplinkos tvarkymas su mumis 
                  neturi sezoniškumo apribojimų!
                </p>
                <p>
                  Mūsų komanda apjungia profesionalių arboristų žinias su pramoninio alpinizmo 
                  įgūdžiais, todėl galime pasiūlyti visapusiškas aplinkos tvarkymo ir priežiūros 
                  paslaugas. Mūsų ekspertai pasirengę įgyvendinti sudėtingiausius projektus, 
                  užtikrindami aukščiausią kokybę ir saugumą.
                </p>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-forest-100 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-earth-100 rounded-full -z-10"></div>
              
              <div className="overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
                  alt="Kelmų naikinimas"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 animate-on-scroll">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px] p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <div className="text-4xl font-bold text-forest-600 mb-2">9+</div>
              <div className="text-lg text-gray-600">Metai patirties</div>
            </div>
            
            <div className="flex-1 min-w-[250px] p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <div className="text-4xl font-bold text-forest-600 mb-2">100%</div>
              <div className="text-lg text-gray-600">Klientų pasitenkinimas</div>
            </div>
            
            <div className="flex-1 min-w-[250px] p-6 bg-white rounded-lg shadow-md border border-gray-100">
              <div className="text-4xl font-bold text-forest-600 mb-2">365</div>
              <div className="text-lg text-gray-600">Dienos per metus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
