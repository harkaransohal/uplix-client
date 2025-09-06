import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

const RepositoryInfo = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    setStatus("submitting");

    try {
      // 👉 Send request to backend
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });

      // ✅ Show confirmation immediately
      setStatus("submitted");
    } catch (err) {
      console.error("Error submitting repo:", err);
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
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
                Enter Your <span className="gradient-text">Repository</span> URL
              </h1>
              <p className="text-muted-foreground text-lg">
                Paste your GitHub repository link to begin the analysis.
              </p>
            </motion.div>

            <Card className="card-glow">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block text-sm font-semibold mb-2 text-left">
                    GitHub Repository URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="flex-1 h-12 rounded-lg"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={!repoUrl}
                      className="h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      <span>Submit</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
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
                Our AI agents are evaluating your code quality, structure, and
                innovation. This may take a few minutes.
              </p>
            </CardContent>
          </Card>
        )}

        {status === "submitted" && (
          <Card className="card-glow text-center">
            <CardContent className="p-12 flex flex-col items-center gap-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
              <h2 className="text-xl font-semibold">Repo submitted!</h2>
              <p className="text-muted-foreground text-sm">
                We’ll email you once your analysis is ready. Thanks for using{" "}
                <span className="gradient-text">Uplix</span>.
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default RepositoryInfo;
