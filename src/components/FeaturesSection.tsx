import { motion } from "framer-motion";
import { 
  Sparkles, 
  Target, 
  FileText, 
  Zap, 
  Shield, 
  BarChart 
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms evaluate code quality, innovation, and best practices implementation.",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Target,
    title: "Hackathon-Ready Scoring",
    description: "Specifically designed scoring criteria that judges look for in hackathon submissions.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: FileText,
    title: "Comprehensive Reports",
    description: "Detailed breakdowns with actionable insights to improve your project's score and quality.",
    gradient: "from-green-500 to-teal-600"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your repository analysis and score in seconds, not hours. Perfect for tight deadlines.",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your code stays private. We only analyze public repositories and never store sensitive data.",
    gradient: "from-red-500 to-pink-600"
  },
  {
    icon: BarChart,
    title: "Performance Metrics",
    description: "Real Lighthouse scores and performance insights to make your project production-ready.",
    gradient: "from-indigo-500 to-blue-600"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
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
            Why Choose <span className="gradient-text">Uplix?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built by developers, for developers. Our platform combines cutting-edge AI with 
            real-world evaluation criteria to give you the most accurate repository assessment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="card-glow rounded-2xl p-8 h-full relative overflow-hidden">
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Border Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50"
        >
          {[
            { label: "Repositories Analyzed", value: "1,247+" },
            { label: "Average Score Improvement", value: "23%" },
            { label: "Hackathons Supported", value: "50+" },
            { label: "Developer Satisfaction", value: "98%" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;