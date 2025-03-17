
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-forest-700">
            Kelmų Naikinimas
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["Pagrindinis", "Apie mus", "Paslaugos", "Kainos", "Kontaktai"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-forest-700 hover:text-forest-500"
                    : "text-white hover:text-forest-100"
                }`}
              >
                {item}
              </a>
            )
          )}
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
            {["Pagrindinis", "Apie mus", "Paslaugos", "Kainos", "Kontaktai"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="font-medium text-forest-700 hover:text-forest-500 py-2"
                  onClick={closeMobileMenu}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
