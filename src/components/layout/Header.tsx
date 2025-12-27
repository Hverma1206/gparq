import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { 
      label: "How It Works", 
      href: "/how-it-works",
      subLinks: [
        { label: "For Users", href: "/how-it-works/users" },
        { label: "For Hosts", href: "/how-it-works/hosts" },
      ]
    },
    { label: "Features", href: "/features" },
    { 
      label: "Services", 
      href: "/services",
      subLinks: [
        { label: "EV Charging", href: "/ev-charging" },
        { label: "Car Wash & Valet", href: "/services" },
      ]
    },
    { 
      label: "Pricing", 
      href: "/pricing",
      subLinks: [
        { label: "For Users", href: "/pricing/users" },
        { label: "For Hosts", href: "/pricing/hosts" },
      ]
    },
    { label: "For Hosts", href: "/list-your-space" },
  ];

  const handleNavClick = (href: string, label: string) => {
    console.log(`Navigating to: ${href}`);
    toast.info(`Navigating to ${label}`);
    navigate(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center group-hover:glow-teal transition-all duration-300">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Parq
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.subLinks ? (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1">
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border z-50">
                    {link.subLinks.map((subLink) => (
                      <DropdownMenuItem 
                        key={subLink.href}
                        onClick={() => handleNavClick(subLink.href, subLink.label)}
                        className="cursor-pointer"
                      >
                        {subLink.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.label)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => { console.log('Login clicked'); navigate('/login'); }}>
              Log in
            </Button>
            <Button variant="outline" size="sm" onClick={() => { console.log('List Your Space clicked'); navigate('/list-your-space'); }}>
              List Your Space
            </Button>
            <Button size="sm" onClick={() => { console.log('Find Parking clicked'); navigate('/search'); }}>
              Find Parking
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass-strong border-t border-border"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <button
                      onClick={() => { handleNavClick(link.href, link.label); setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                    {link.subLinks && (
                      <div className="ml-4 space-y-1">
                        {link.subLinks.map((subLink) => (
                          <button
                            key={subLink.href}
                            onClick={() => { handleNavClick(subLink.href, subLink.label); setIsMenuOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
                          >
                            {subLink.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full" onClick={() => { navigate('/list-your-space'); setIsMenuOpen(false); }}>
                    List Your Space
                  </Button>
                  <Button className="w-full" onClick={() => { navigate('/search'); setIsMenuOpen(false); }}>
                    Find Parking
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
                    Log in
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
