
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white border-b py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-optiml-purple">
          OptiML
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="text-gray-700 hover:text-optiml-purple">
              Home
            </Link>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-optiml-purple"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-optiml-purple"
            >
              Services
            </button>
          </li>
          <li>
            <Link to="/contact" className="text-gray-700 hover:text-optiml-purple">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-10 md:hidden">
            <ul className="flex flex-col">
              <li>
                <Link to="/" className="block py-3 px-4 hover:bg-gray-100" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="block w-full text-left py-3 px-4 hover:bg-gray-100"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left py-3 px-4 hover:bg-gray-100"
                >
                  Services
                </button>
              </li>
              <li>
                <Link to="/contact" className="block py-3 px-4 hover:bg-gray-100" onClick={toggleMenu}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
