import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import { useUser } from "@clerk/clerk-react";

interface Score {
  status: "completed" | "in_progress";
  repoScore: number;
  codeScore: number;
  readmeScore: number;
  accessibilityScore: number;
  seoScore: number;
  bestPracticeScore: number;
  performanceScore: number;
  repoReasoning: string;
  codeReasoning: string;
  readmeReasoning: string;
}

interface RepoResponse {
  email: string;
  liveUrl: string;
  gitUrl: string;
  jobId: string;
  score: Score;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
  if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
  if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-600 bg-red-50 border-red-200";
};

const ScoredRepos = () => {
  const { user } = useUser();
  const [repos, setRepos] = useState<RepoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!user) return;

      try {
        const email = user.emailAddresses[0].emailAddress;
        const res = await fetch(
          `${import.meta.env.VITE_WAITLIST_URL}/hackathon/getall/${email}`
        );
        if (!res.ok) throw new Error("Failed to fetch scored repos");

        const data: RepoResponse[] = await res.json();
        console.log(data)
        setRepos(data);
      } catch (err) {
        console.error("Error fetching scored repos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
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

          {loading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : repos.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No scored repositories found.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.jobId}
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
                            {repo.gitUrl.split("/").slice(-1)[0]} {/* repo name from URL */}
                          </CardTitle>
                          <CardDescription className="text-sm leading-relaxed">
                            {repo.liveUrl}
                          </CardDescription>
                        </div>
                        <div
                          className={`rounded-full px-3 py-1 text-sm font-semibold border ${getScoreColor(
                            repo.score.repoScore
                          )}`}
                        >
                          {repo.score.repoScore}/100
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>Status: {repo.score.status}</div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Analyzed recently</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-primary/10"
                        asChild
                      >
                        <Link to={`/scored-repos/${repo.jobId}`}>
                          <ExternalLink className="w-4 h-4" />
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoredRepos;
