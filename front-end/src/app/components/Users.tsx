import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface User {
  id: number;
  nom: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    nom: "Marie Dubois",
    email: "marie.dubois@timsoft.fr",
    role: "Administrateur",
  },
  {
    id: 2,
    nom: "Jean Martin",
    email: "jean.martin@timsoft.fr",
    role: "Analyste",
  },
  {
    id: 3,
    nom: "Sophie Laurent",
    email: "sophie.laurent@timsoft.fr",
    role: "Gestionnaire",
  },
  {
    id: 4,
    nom: "Pierre Durand",
    email: "pierre.durand@timsoft.fr",
    role: "Analyste",
  },
];

export function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    role: "Analyste",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ nom: "", email: "", role: "Analyste" });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({ nom: user.nom, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingUser
      ? `http://localhost:8000/users/${editingUser.id}`
      : "http://localhost:8000/users";
    const method = editingUser ? "PUT" : "POST";

    // Add a default password for new users if not provided in your form
    const body = editingUser
      ? formData
      : { ...formData, password: "DefaultPassword123" };

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        fetchUsers();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to save user", err);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
            Gestion des utilisateurs
          </h1>
          <p className="text-foreground/60">
            Administration des accès et des rôles
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddUser}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A14E3] to-[#3d14e3] text-white rounded-xl font-medium shadow-lg shadow-[#1A14E3]/30 hover:shadow-[#1A14E3]/50 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Ajouter un utilisateur
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="overflow-x-auto h-full">
          <table className="w-full">
            <thead className="bg-white/5 dark:bg-white/5 border-b border-white/10 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-foreground/70 font-medium">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm text-foreground/70 font-medium">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm text-foreground/70 font-medium">
                  Rôle
                </th>
                <th className="px-6 py-4 text-right text-sm text-foreground/70 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 dark:border-white/5 hover:bg-white/5 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-foreground">{user.nom}</td>
                  <td className="px-6 py-4 text-foreground/80">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-[#1A14E3]/20 text-[#1A14E3] border border-[#1A14E3]/30 rounded-lg text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-foreground/60 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
                      >
                        <Pencil className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-foreground/60 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-card to-background border border-white/10 dark:border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-foreground">
                  {editingUser
                    ? "Modifier l'utilisateur"
                    : "Ajouter un utilisateur"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-foreground/60 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground/80">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-[#1A14E3] focus:border-transparent transition-all duration-300"
                    placeholder="Nom complet"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-foreground/80">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-[#1A14E3] focus:border-transparent transition-all duration-300"
                    placeholder="email@timsoft.fr"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-foreground/80">
                    Rôle
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-[#1A14E3] focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="Administrateur" className="bg-background">
                      Administrateur
                    </option>
                    <option value="Analyste" className="bg-background">
                      Analyste
                    </option>
                    <option value="Gestionnaire" className="bg-background">
                      Gestionnaire
                    </option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 text-foreground rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    Annuler
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#1A14E3] to-[#3d14e3] text-white rounded-xl font-medium shadow-lg shadow-[#1A14E3]/30 hover:shadow-[#1A14E3]/50 transition-all duration-300"
                  >
                    {editingUser ? "Modifier" : "Ajouter"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
