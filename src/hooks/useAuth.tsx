
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  stationId?: number;
  stationName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("AuthProvider: Verificando usuario almacenado");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log("AuthProvider: Usuario encontrado en localStorage", userData);
        setUser(userData);
      } catch (error) {
        console.error("AuthProvider: Error al parsear usuario almacenado", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    console.log("AuthProvider: Login ejecutado con", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    console.log("AuthProvider: Logout ejecutado");
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!user;

  console.log("AuthProvider: Estado actual", { user, isAdmin, isAuthenticated });

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
