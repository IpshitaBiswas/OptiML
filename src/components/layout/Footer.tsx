
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-optiml-purple text-white py-6">
      <div className="container mx-auto text-center">
        <p>© {currentYear} OptiML. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link to="/terms" className="text-white/80 hover:text-white">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-white/80 hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/contact" className="text-white/80 hover:text-white">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
