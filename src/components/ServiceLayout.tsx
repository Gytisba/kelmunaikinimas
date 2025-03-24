
import { ReactNode } from "react";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

interface ServiceLayoutProps {
  title: string;
  children: ReactNode;
  imageSrc?: string;
  overlayColor?: string;
}

const ServiceLayout = ({ title, children, imageSrc, overlayColor = "from-forest-900/60" }: ServiceLayoutProps) => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* Hero Section with improved design */}
      <section className="relative mt-24">
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor} to-transparent`} />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-heading max-w-3xl">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="prose max-w-none">
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
