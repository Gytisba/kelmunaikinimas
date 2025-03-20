
import { ReactNode } from "react";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface ServiceLayoutProps {
  title: string;
  children: ReactNode;
  imageSrc?: string;
}

const ServiceLayout = ({ title, children, imageSrc }: ServiceLayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-forest-700 py-16 text-white mt-24">
        <div className="container mx-auto px-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6 text-white border-white hover:bg-white hover:text-forest-700"
          >
            ← Grįžti atgal
          </Button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="prose max-w-none">
                {imageSrc && (
                  <img 
                    src={imageSrc} 
                    alt={title} 
                    className="w-full h-64 object-cover rounded-lg mb-8"
                    onError={(e) => {
                      // Fallback image if the provided one fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                )}
                {children}
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-forest-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold text-forest-700 mb-4">Reikia konsultacijos?</h3>
                <p className="mb-4">Susisiekite su mumis ir mes mielai atsakysime į visus jūsų klausimus.</p>
                <Button 
                  onClick={() => document.getElementById('kontaktai')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full"
                >
                  Susisiekti
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <Contact />
    </div>
  );
};

export default ServiceLayout;
