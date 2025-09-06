import { motion } from "framer-motion";
import { Github, Brain, Gauge, Mail } from "lucide-react";

const steps = [
  {
    icon: Github,
    title: "Paste Your GitHub URL",
    description: "Simply provide your GitHub repository URL and we'll handle the rest.",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Brain,
    title: "AI Scans Repository",
    description: "Our AI analyzes code quality, innovation, project structure, and documentation.",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    icon: Gauge,
    title: "Lighthouse Performance Check",
    description: "We run Lighthouse tests on your live URL to evaluate performance metrics.",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    icon: Mail,
    title: "Get Your Score via Email",
    description: "Receive a comprehensive report with scores and actionable insights.",
    color: "from-orange-500/20 to-orange-600/20"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-transparent to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            How <span className="gradient-text">Uplix</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes repository evaluation simple and comprehensive
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary border border-primary/30">
                {index + 1}
              </div>

              {/* Card */}
              <div className="card-glow rounded-2xl p-8 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-foreground" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for non-last items */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary/30">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Ready to see how your repository scores?</p>
          <motion.a
            href="#submit-repo"
            className="inline-block text-primary font-semibold hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            Get Started Now →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;