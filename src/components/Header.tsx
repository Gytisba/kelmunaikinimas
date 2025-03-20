
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const serviceLinks = [
  { name: "Pavojingų medžių pjovimas", path: "/paslauga/pavojingu-medziu-pjovimas" },
  { name: "Kelmų frezavimas", path: "/paslauga/kelmu-frezavimas" },
  { name: "Pramoninis alpinizmas", path: "/paslauga/pramoninis-alpinizmas" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { name: "Pagrindinis", path: "/" },
    { name: "Apie mus", path: "/#apie-mus" },
    { name: "Kainos", path: "/#kainos" },
    { name: "Kontaktai", path: "/#kontaktai" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-forest-700">
            Zemex
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-forest-700 hover:text-forest-500"
                  : "text-white hover:text-forest-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger 
              className={`flex items-center font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-forest-700 hover:text-forest-500"
                  : "text-white hover:text-forest-100"
              }`}
            >
              Paslaugos <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md rounded-md p-2 min-w-[200px] z-50">
              {serviceLinks.map((service) => (
                <DropdownMenuItem key={service.path} asChild>
                  <Link 
                    to={service.path}
                    className="w-full px-2 py-2 text-forest-700 hover:text-forest-500 hover:bg-forest-50 rounded"
                    onClick={closeMobileMenu}
                  >
                    {service.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-8 h-8 ${isScrolled ? "text-forest-700" : "text-white"}`} />
          ) : (
            <Menu className={`w-8 h-8 ${isScrolled ? "text-forest-700" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md shadow-md transition-all duration-300 transform ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto py-4">
          <nav className="flex flex-col space-y-4 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="font-medium text-forest-700 hover:text-forest-500 py-2"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Services Menu */}
            <div className="py-2">
              <h3 className="font-medium text-forest-700 mb-2">Paslaugos:</h3>
              <div className="space-y-2 pl-4">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block text-forest-600 hover:text-forest-500 py-1"
                    onClick={closeMobileMenu}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
