
import { useState } from "react";
import { Shield, Menu, X, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-safespeak-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <Shield className="h-8 w-8 text-safespeak-blue" />
          <span className="text-xl font-bold">Safe<span className="text-safespeak-blue">Speak</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
          <Link to="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button className="flex items-center gap-2 bg-safespeak-blue hover:bg-safespeak-blue/90">
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-safespeak-dark-accent border-l border-white/10">
            <nav className="flex flex-col gap-6 mt-8">
              <Link 
                to="/" 
                className="text-lg font-medium text-white" 
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium text-white/80 hover:text-white transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/faq" 
                className="text-lg font-medium text-white/80 hover:text-white transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full justify-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </Button>
                <Button 
                  className="w-full justify-center bg-safespeak-blue hover:bg-safespeak-blue/90"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Sign Up</span>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
