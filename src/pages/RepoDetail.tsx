import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Code, FileText, Zap, Shield, Search, Accessibility, Loader2 } from "lucide-react";
import AppNavbar from "@/components/AppNavbar";

interface RepoResponse {
  repoScore: number;
  codeScore: number;
  status: "completed" | "in_progress";
  readmeScore: number;
  accessibilityScore: number;
  seoScore: number;
  bestPracticeScore: number;
  performanceScore: number;
  repoReasoning: string;
  codeReasoning: string;
  readmeReasoning: string;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-500";
  if (score >= 70) return "text-yellow-500";
  return "text-red-500";
};

const RepoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [repo, setRepo] = useState<RepoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoDetail = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_WAITLIST_URL}/hackathon/score/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch repo details");
        const data: RepoResponse = await res.json();
        setRepo(data);
      } catch (err) {
        console.error("Error fetching repo details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRepoDetail();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  if (!repo) {
    return <div className="min-h-screen flex items-center justify-center">No data found.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/scored-repos">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Repos
              </Link>
            </Button>
          </div>

          {repo.status === "in_progress" ? (
            // 🚧 Pending State
            <div className="flex flex-col items-center justify-center text-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-6" />
              <h2 className="text-2xl font-bold mb-2">Analysis in Progress</h2>
              <p className="text-muted-foreground max-w-md">
                Your repository is still being analyzed. Please check back in a few minutes.
              </p>
            </div>
          ) : (
            // ✅ Completed State
            <>
              {/* Overall Score */}
              <div className="text-center mb-12">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(repo.repoScore)}`}>
                  {repo.repoScore}
                </div>
                <p className="text-lg text-muted-foreground">Overall Repository Score</p>
                <p className="mt-2 text-muted-foreground">{repo.repoReasoning}</p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" /> Code Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={repo.codeScore} className="mb-3" />
                    <p className={`text-xl font-bold ${getScoreColor(repo.codeScore)}`}>
                      {repo.codeScore}
                    </p>
                    <p className="text-sm text-muted-foreground">{repo.codeReasoning}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" /> README
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={repo.readmeScore} className="mb-3" />
                    <p className={`text-xl font-bold ${getScoreColor(repo.readmeScore)}`}>
                      {repo.readmeScore}
                    </p>
                    <p className="text-sm text-muted-foreground">{repo.readmeReasoning}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Accessibility className="w-5 h-5" /> Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={repo.accessibilityScore} className="mb-3" />
                    <p className={`text-xl font-bold ${getScoreColor(repo.accessibilityScore)}`}>
                      {repo.accessibilityScore}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5" /> SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={repo.seoScore} className="mb-3" />
                    <p className={`text-xl font-bold ${getScoreColor(repo.seoScore)}`}>
                      {repo.seoScore}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" /> Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={repo.bestPracticeScore} className="mb-3" />
                    <p className={`text-xl font-bold ${getScoreColor(repo.bestPracticeScore)}`}>
                      {repo.bestPracticeScore}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" /> Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={repo.performanceScore} className="mb-3" />
                    <p className={`text-xl font-bold ${getScoreColor(repo.performanceScore)}`}>
                      {repo.performanceScore}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;
