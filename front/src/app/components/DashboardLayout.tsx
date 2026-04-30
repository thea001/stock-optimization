import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  BarChart3,
  Package,
  TrendingUp,
  Users,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/dashboard/ventes", label: "Ventes", icon: BarChart3 },
  { path: "/dashboard/stock", label: "Stock", icon: Package },
  { path: "/dashboard/predictions", label: "Prédictions", icon: TrendingUp },
  { path: "/dashboard/users", label: "Gestion des utilisateurs", icon: Users },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-72 bg-gradient-to-b from-sidebar to-sidebar border-r border-sidebar-border flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A14E3]/5 to-transparent pointer-events-none"></div>

        <div className="p-6 border-b border-sidebar-border relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1A14E3] to-[#3d14e3] rounded-xl flex items-center justify-center shadow-lg shadow-[#1A14E3]/50">
              <span className="text-2xl text-white font-bold">T</span>
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground text-lg">
                Timsoft
              </h2>
              <p className="text-xs text-sidebar-foreground/50">
                Analytics Platform
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 relative z-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                    isActive
                      ? "bg-gradient-to-r from-[#1A14E3] to-[#3d14e3] text-white shadow-lg shadow-[#1A14E3]/30"
                      : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#1A14E3] to-[#3d14e3] rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 relative z-10 ${isActive ? "drop-shadow-lg" : ""}`}
                  />
                  <span className="relative z-10 font-medium">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/30 rounded-full"></div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border relative z-10 space-y-3">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-xl border border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-300"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span className="text-sm">{isDark ? "Clair" : "Sombre"}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl rounded-xl border border-red-500/30 text-red-500 dark:text-red-400 hover:bg-red-500/30 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Déconnexion</span>
            </motion.button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A14E3]/5 via-transparent to-transparent pointer-events-none"></div>
        <Outlet />
      </main>
    </div>
  );
}
