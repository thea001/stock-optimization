import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    setIsDark(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      localStorage.setItem("token", data.access_token); // Store the JWT
      navigate("/dashboard/ventes");
    } catch (error) {
      alert("Erreur de connexion : Vérifiez vos identifiants");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-[#0f0a1f] dark:via-[#0f0a1f] to-background">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 p-3 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl rounded-xl border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/15 transition-all duration-300 shadow-lg"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1A14E3] rounded-full blur-[120px] opacity-20 dark:opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3d14e3] rounded-full blur-[120px] opacity-15 dark:opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] dark:from-white/[0.08] dark:to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1A14E3] to-[#3d14e3] rounded-xl flex items-center justify-center shadow-lg shadow-[#1A14E3]/50">
                <span className="text-3xl text-white font-bold">T</span>
              </div>
            </motion.div>
            <h1 className="text-2xl mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Timsoft
            </h1>
            <p className="text-sm text-foreground/60">
              Plateforme d'analyse prédictive
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-foreground/80">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-[#1A14E3] focus:border-transparent transition-all duration-300 hover:bg-white/[0.07] dark:hover:bg-white/[0.07]"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-foreground/80">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-[#1A14E3] focus:border-transparent transition-all duration-300 hover:bg-white/[0.07] dark:hover:bg-white/[0.07]"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[#1A14E3] to-[#3d14e3] text-white rounded-xl font-medium shadow-lg shadow-[#1A14E3]/30 hover:shadow-[#1A14E3]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Se connecter</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3d14e3] to-[#1A14E3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
