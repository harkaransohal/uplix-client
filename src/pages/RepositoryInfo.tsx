import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowRight, ChevronDown, X } from "lucide-react";

const TECH_STACK_OPTIONS = [
  "React", "Vue.js", "Angular", "Node.js", "Express", "Next.js", 
  "Python", "Django", "Flask", "Java", "Spring Boot", "TypeScript",
  "JavaScript", "PHP", "Laravel", "Ruby", "Rails", "Go", "Rust",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Docker", "Kubernetes"
];

const RepositoryInfo = () => {
  const [description, setDescription] = useState("");
  const [sourceDirectory, setSourceDirectory] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [techStackInput, setTechStackInput] = useState("");
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [isGitHubConnected, setIsGitHubConnected] = useState(false);

  const handleTechStackSelect = (tech: string) => {
    if (!selectedTechStack.includes(tech)) {
      setSelectedTechStack([...selectedTechStack, tech]);
    }
    setTechStackInput("");
    setShowTechDropdown(false);
  };

  const removeTechStack = (tech: string) => {
    setSelectedTechStack(selectedTechStack.filter(t => t !== tech));
  };

  const handleTechStackInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && techStackInput.trim()) {
      e.preventDefault();
      if (!selectedTechStack.includes(techStackInput.trim())) {
        setSelectedTechStack([...selectedTechStack, techStackInput.trim()]);
      }
      setTechStackInput("");
      setShowTechDropdown(false);
    }
  };

  const filteredOptions = TECH_STACK_OPTIONS.filter(option =>
    option.toLowerCase().includes(techStackInput.toLowerCase()) &&
    !selectedTechStack.includes(option)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">
              Uplix
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Step 1: Repository Info
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-3">
              Connect Your <span className="gradient-text">Repository</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Let's get started by connecting your GitHub repository and sharing some basic details.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-glow">
              <CardContent className="p-8 space-y-6">
                {/* GitHub Connection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold mb-3">
                    GitHub Repository
                  </label>
                  <Button
                    onClick={() => setIsGitHubConnected(!isGitHubConnected)}
                    className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      isGitHubConnected 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "btn-primary"
                    }`}
                    size="lg"
                  >
                    <motion.div
                      className="flex items-center space-x-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-6 h-6" />
                      <span>
                        {isGitHubConnected ? "✓ Connected to GitHub" : "Connect GitHub Repository"}
                      </span>
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-sm font-semibold mb-3">
                    Project Description
                  </label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px] rounded-xl resize-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    rows={4}
                  />
                </motion.div>

                {/* Source Directory */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label className="block text-sm font-semibold mb-3">
                    Source Directory <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Input
                    placeholder="e.g., /src"
                    value={sourceDirectory}
                    onChange={(e) => setSourceDirectory(e.target.value)}
                    className="h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  />
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold mb-3">
                    Tech Stack
                  </label>
                  
                  {/* Selected Technologies */}
                  {selectedTechStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedTechStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                          <button
                            onClick={() => removeTechStack(tech)}
                            className="ml-2 hover:text-destructive transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="relative">
                    <Input
                      placeholder="Select or type technologies..."
                      value={techStackInput}
                      onChange={(e) => {
                        setTechStackInput(e.target.value);
                        setShowTechDropdown(true);
                      }}
                      onFocus={() => setShowTechDropdown(true)}
                      onKeyDown={handleTechStackInputKeyDown}
                      className="h-12 rounded-xl pr-10 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* Dropdown */}
                  {showTechDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-xl max-h-48 overflow-y-auto"
                    >
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((tech) => (
                          <button
                            key={tech}
                            onClick={() => handleTechStackSelect(tech)}
                            className="w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-xl last:rounded-b-xl"
                          >
                            {tech}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-muted-foreground">
                          {techStackInput ? `Press Enter to add "${techStackInput}"` : "No options available"}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>

                {/* Continue Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="pt-4"
                >
                  <Button 
                    className="w-full btn-primary rounded-xl h-14 text-lg font-semibold group"
                    disabled={!isGitHubConnected}
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span>Continue to Analysis</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.div>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Click outside to close dropdown */}
      {showTechDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowTechDropdown(false)}
        />
      )}
    </div>
  );
};

export default RepositoryInfo;