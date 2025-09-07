import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, ArrowRight, Loader2, CheckCircle2, Globe } from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const RepositoryInfo = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle"
  );
  const [jobId, setJobId] = useState<string | null>(null);

  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl || !liveUrl) return;

    setStatus("submitting");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_WAITLIST_URL}/hackathon/score`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            repoUrl,
            liveUrl,
            email: user.emailAddresses[0].emailAddress,
          }),
        }
      );

      const data = await response.json();
      if (data.jobId) {
        setJobId(data.jobId);
      }

      setStatus("submitted");
    } catch (err) {
      console.error("Error submitting repo:", err);
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          {status === "idle" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold mb-3">
                  Enter Your{" "}
                  <span className="gradient-text">Repository</span> & Live URL
                </h1>
                <p className="text-muted-foreground text-lg">
                  Paste your GitHub repository link and the deployed live project
                  link to begin the analysis.
                </p>
              </motion.div>

              <Card className="card-glow">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* GitHub Repo URL */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-left">
                        GitHub Repository URL
                      </label>
                      <Input
                        type="url"
                        placeholder="https://github.com/username/repo"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="w-full h-12 rounded-lg"
                        required
                      />
                    </div>

                    {/* Live Project URL */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-left">
                        Live Project URL
                      </label>
                      <Input
                        type="url"
                        placeholder="https://yourproject.com"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        className="w-full h-12 rounded-lg"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={!repoUrl || !liveUrl}
                      className="w-full h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      <Globe className="w-5 h-5" />
                      <span>Submit</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          )}

          {status === "submitting" && (
            <Card className="card-glow text-center">
              <CardContent className="p-12 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <h2 className="text-xl font-semibold">
                  Analyzing your repository...
                </h2>
                <p className="text-muted-foreground text-sm">
                  Our AI agents are evaluating your code quality, structure,
                  innovation, and live performance. This may take a few minutes.
                </p>
              </CardContent>
            </Card>
          )}

          {status === "submitted" && (
            <Card className="card-glow text-center">
              <CardContent className="p-12 flex flex-col items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
                <h2 className="text-xl font-semibold">Repo submitted!</h2>
                {jobId ? (
                  <p className="text-muted-foreground text-sm">
                    Your job ID is:{" "}
                    <Link to={`/scored-repos/${jobId}`} className="font-mono underline font-semibold">{jobId}</Link>.
                    Use this ID to track your analysis progress.
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Your repository has been submitted successfully.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RepositoryInfo;
