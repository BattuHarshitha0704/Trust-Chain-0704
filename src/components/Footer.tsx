
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-safespeak-dark-accent border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white mb-4">
              <Shield className="h-6 w-6 text-safespeak-blue" />
              <span className="text-xl font-bold">Safe<span className="text-safespeak-blue">Speak</span></span>
            </Link>
            <p className="text-white/60 text-sm mb-4">
              Secure, anonymous crime reporting powered by blockchain and AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 hover:text-safespeak-blue transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-safespeak-blue transition-colors text-sm">About Us</Link></li>
              <li><Link to="/report" className="text-white/60 hover:text-safespeak-blue transition-colors text-sm">Report Crime</Link></li>
              <li><Link to="/track" className="text-white/60 hover:text-safespeak-blue transition-colors text-sm">Track Report</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/60 hover:text-safespeak-blue transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/60 hover:text-safespeak-blue transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/faq" className="text-white/60 hover:text-safespeak-blue transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-white mb-4">Contact</h3>
            <p className="text-white/60 text-sm">
              For general inquiries, please email us at:
            </p>
            <a href="mailto:contact@safespeak.io" className="text-safespeak-blue hover:underline text-sm">
              contact@safespeak.io
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} SafeSpeak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
