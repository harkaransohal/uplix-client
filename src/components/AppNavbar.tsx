import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Database, FileText, Users } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

const AppNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { href: "/get-score", label: "Get Score", icon: FileText },
    { href: "/scored-repos", label: "Scored Repos", icon: Database },
    { href: "/waitlist", label: "Waitlist", icon: Users },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Back Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <motion.div 
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Uplix
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                variant={location.pathname === href ? "secondary" : "ghost"}
                size="sm"
                asChild
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Link to={href} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Database className="w-4 h-4" />
            </Button>
          </div>
          <UserButton />
        </div>
      </div>
    </motion.nav>
  );
};

export default AppNavbar;