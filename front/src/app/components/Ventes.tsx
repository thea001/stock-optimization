import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function Ventes() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
          Tableau de bord des ventes
        </h1>
        <p className="text-foreground/60">Analyse en temps réel des performances commerciales</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative"
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#1A14E3]/30 border-t-[#1A14E3] rounded-full animate-spin"></div>
              <p className="text-foreground/60">Chargement du tableau de bord...</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#1A14E3] to-[#3d14e3] rounded-2xl flex items-center justify-center shadow-lg shadow-[#1A14E3]/50">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-foreground/70 mb-2">Power BI Dashboard</p>
                <p className="text-sm text-foreground/50">Intégration à venir - URL du tableau de bord requis</p>
              </div>
            </div>
            <iframe
              title="Ventes Dashboard"
              className="w-full h-full border-0"
              src="about:blank"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
