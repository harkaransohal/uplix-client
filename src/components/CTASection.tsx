import { motion } from "framer-motion";
import { ArrowRight, Github, Star, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <section id="submit-repo" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by 1000+ developers</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold leading-tight"
          >
            {isSubmitted ? (
              <>
                Thanks for Joining the{" "}
                <span className="gradient-text">Waitlist!</span>
              </>
            ) : (
              <>
                Join the <span className="gradient-text">Uplix</span> Waitlist
              </>
            )}
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {isSubmitted ? (
              "We'll notify you as soon as Uplix is ready to analyze your repositories. In the meantime, we're building something amazing!"
            ) : (
              "Be the first to experience AI-powered repository scoring. Get early access and help shape the future of code evaluation."
            )}
          </motion.p>

          {/* Waitlist Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 pr-4 py-3 h-12 rounded-full bg-card border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isLoading || !email}
                  className="btn-primary rounded-full px-8 py-3 h-12 font-semibold min-w-[140px] group"
                >
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                No spam, just updates on our launch progress
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-semibold mb-2">You're on the list!</p>
                <p className="text-sm text-muted-foreground">
                  We'll send you an email when Uplix launches
                </p>
              </div>
            </motion.div>
          )}

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8 text-sm text-muted-foreground"
          >
            {!isSubmitted && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Early Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Launch Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span>Beta Features</span>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;