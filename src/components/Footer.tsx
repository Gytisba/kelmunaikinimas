
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Kelmų Naikinimas</h3>
            <p className="text-forest-100 max-w-md">
              Visi sklypų bei aplinkos tvarkymo sprendimai iš vienų rankų! Ir taip jau daugiau nei 9 metus!
            </p>
          </div>
          
          <div className="md:text-right">
            <div className="flex space-x-4 md:justify-end mb-4">
              <a href="#" className="bg-forest-700 p-2 rounded-full hover:bg-forest-600 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-forest-700 p-2 rounded-full hover:bg-forest-600 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-forest-700 p-2 rounded-full hover:bg-forest-600 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            <p className="text-forest-300 text-sm">
              © {currentYear} Kelmų Naikinimas. Visos teisės saugomos.
            </p>
          </div>
        </div>
        
        <div className="border-t border-forest-700 mt-8 pt-8 text-sm text-forest-300 text-center">
          <p>
            <a href="#" className="hover:text-white transition-colors duration-300">Privatumo politika</a>
            {" | "}
            <a href="#" className="hover:text-white transition-colors duration-300">Slapukų politika</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
