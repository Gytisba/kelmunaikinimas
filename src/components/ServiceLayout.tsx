
import { ReactNode } from "react";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

interface ServiceLayoutProps {
  title: string;
  children: ReactNode;
  imageSrc?: string;
}

const ServiceLayout = ({ title, children, imageSrc }: ServiceLayoutProps) => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* Hero Section with improved design */}
      <section className="relative mt-24">
        <div className="bg-gradient-to-b from-forest-200 to-forest-300 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-forest-700">{title}</h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"></div>
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
                <button 
                  onClick={() => document.getElementById('kontaktai')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-forest-500 hover:bg-forest-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Susisiekti
                </button>
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
