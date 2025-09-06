import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Star, GitBranch, Calendar } from "lucide-react";

// Mock data for scored repositories
const mockScoredRepos = [
  {
    id: 1,
    name: "awesome-react-app",
    description: "A modern React application with TypeScript and advanced state management",
    score: 92,
    techStack: ["React", "TypeScript", "Redux", "Tailwind"],
    lastAnalyzed: "2024-01-15",
    stars: 234,
    forks: 45,
    language: "TypeScript"
  },
  {
    id: 2,
    name: "node-api-server",
    description: "RESTful API server built with Node.js and Express, featuring JWT authentication",
    score: 87,
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    lastAnalyzed: "2024-01-12",
    stars: 156,
    forks: 23,
    language: "JavaScript"
  },
  {
    id: 3,
    name: "python-ml-toolkit",
    description: "Machine learning toolkit with various algorithms and data preprocessing utilities",
    score: 95,
    techStack: ["Python", "TensorFlow", "Pandas", "NumPy"],
    lastAnalyzed: "2024-01-10",
    stars: 789,
    forks: 142,
    language: "Python"
  },
  {
    id: 4,
    name: "vue-dashboard",
    description: "Admin dashboard built with Vue.js 3 and composition API",
    score: 84,
    techStack: ["Vue.js", "TypeScript", "Vuex", "Chart.js"],
    lastAnalyzed: "2024-01-08",
    stars: 98,
    forks: 12,
    language: "Vue"
  }
];

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
  if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
  if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-600 bg-red-50 border-red-200";
};

const ScoredRepos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Uplix
            </motion.div>
            <div className="text-muted-foreground font-medium">
              Your Scored Repositories
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Repository Scores
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your repositories' performance and get insights to improve your code quality
          </p>
        </motion.div>

        {/* Repository Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {mockScoredRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center gap-2">
                        <Github className="w-5 h-5 text-muted-foreground" />
                        {repo.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {repo.description}
                      </CardDescription>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-sm font-semibold border ${getScoreColor(repo.score)}`}>
                      {repo.score}/100
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Tech Stack */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-1">
                      {repo.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{repo.lastAnalyzed}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button 
                    className="w-full mt-4 group"
                    variant="outline"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="btn-primary rounded-full px-8 py-3 text-lg font-semibold mr-4"
          >
            Add New Repository
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 py-3 text-lg"
          >
            Export Report
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ScoredRepos;