import { motion } from "framer-motion";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import heroImage from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              AI-powered Repo{" "}
              <span className="gradient-text">Scoring</span> for{" "}
              <span className="gradient-text">Hackathons</span> & Developers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              Sign up to unlock repo analysis, or log in if you already have
              an account.
            </motion.p>

            {/* Clerk Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-4"
            >
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="btn-primary rounded-full px-8 py-4 text-lg font-semibold group"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Sign Up
                  <motion.div
                    className="ml-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </SignUpButton>

              <SignInButton mode="modal">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-4 text-lg font-semibold"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </Button>
              </SignInButton>
            </motion.div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={heroImage}
                alt="AI Repository Analysis Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
