import { motion } from "framer-motion";
import { ArrowRight, Github, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-2 text-primary/80"
              >
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  AI-Powered Repository Analysis
                </span>
              </motion.div>

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
                Get comprehensive scoring for your GitHub repositories based on code quality, 
                innovation, documentation, and performance. Perfect for hackathon submissions 
                and project evaluation.
              </motion.p>
            </div>

            {/* CTA Button with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="btn-primary rounded-full px-8 py-4 text-lg font-semibold group"
                asChild
              >
                <motion.a
                  href="#submit-repo"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2"
                >
                  <Github className="w-5 h-5" />
                  <span>Join Waitlist</span>
                  <motion.div
                    className="ml-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex space-x-8 pt-8"
            >
              <div>
                <div className="text-3xl font-bold gradient-text">1000+</div>
                <div className="text-sm text-muted-foreground">Repos Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">5sec</div>
                <div className="text-sm text-muted-foreground">Average Scan Time</div>
              </div>
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
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-xl p-4"
            >
              <div className="text-sm font-semibold text-primary">AI Score: 94/100</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;