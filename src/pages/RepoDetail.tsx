import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Star, 
  GitFork, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  TrendingUp,
  Code,
  Shield,
  Zap,
  FileText,
  Users
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";

// Mock detailed repo data
const mockRepoDetail = {
  id: "1",
  repository: "facebook/react",
  description: "The library for web and native user interfaces",
  overallScore: 92,
  stars: 234567,
  forks: 48392,
  lastAnalyzed: "2024-01-15",
  techStack: ["JavaScript", "TypeScript", "React", "Node.js"],
  scoreBreakdown: {
    codeQuality: { score: 95, max: 100, description: "Excellent code structure and maintainability" },
    performance: { score: 88, max: 100, description: "Good performance with minor optimization opportunities" },
    security: { score: 94, max: 100, description: "Strong security practices with regular updates" },
    documentation: { score: 90, max: 100, description: "Comprehensive documentation with examples" },
    community: { score: 96, max: 100, description: "Very active community and contributions" },
    innovation: { score: 85, max: 100, description: "Solid innovation with emerging patterns" }
  },
  insights: [
    {
      type: "positive",
      title: "Excellent Test Coverage", 
      description: "95% test coverage with comprehensive unit and integration tests"
    },
    {
      type: "positive",
      title: "Active Maintenance",
      description: "Regular updates and quick response to security issues"
    },
    {
      type: "warning",
      title: "Bundle Size",
      description: "Consider optimizing bundle size for better performance"
    },
    {
      type: "suggestion",
      title: "TypeScript Migration",
      description: "Some legacy files could benefit from TypeScript conversion"
    }
  ]
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-500";
  if (score >= 70) return "text-yellow-500";
  return "text-red-500";
};

const getInsightIcon = (type: string) => {
  switch (type) {
    case "positive": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "warning": return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case "error": return <XCircle className="w-5 h-5 text-red-500" />;
    default: return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
  }
};

const RepoDetail = () => {
  const { id } = useParams();
  const repo = mockRepoDetail; // In real app, fetch by id

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/scored-repos">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Repos
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-3">
                  {repo.repository}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {repo.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repo.stars.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {repo.forks.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Last analyzed: {repo.lastAnalyzed}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(repo.overallScore)}`}>
                  {repo.overallScore}
                </div>
                <div className="text-lg text-muted-foreground">Overall Score</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {repo.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {Object.entries(repo.scoreBreakdown).map(([key, data]) => {
              const icons = {
                codeQuality: Code,
                performance: Zap,
                security: Shield,
                documentation: FileText,
                community: Users,
                innovation: TrendingUp
              };
              const Icon = icons[key as keyof typeof icons] || Code;
              
              return (
                <Card key={key} className="card-glow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
                        {data.score}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {data.max}
                      </span>
                    </div>
                    <Progress value={data.score} className="mb-3" />
                    <p className="text-sm text-muted-foreground">
                      {data.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Analysis Insights</h2>
            <div className="grid gap-4">
              {repo.insights.map((insight, index) => (
                <Card key={index} className="card-glow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {getInsightIcon(insight.type)}
                      <div>
                        <h3 className="font-semibold mb-2">{insight.title}</h3>
                        <p className="text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;