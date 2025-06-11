// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "guest" | "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Laravel API endpoint
const BACKEND = "http://127.0.0.1:8000/api";

const mapRoleIdToUserRole = (roleId: number): UserRole => {
  switch (roleId) {
    case 1:
      return "admin";
    case 3:
      return "instructor";
    case 4:
      return "student";
    default:
      return "guest";
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[AuthContext] init: checking token");
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("[AuthContext] no token → done loading");
      setLoading(false);
      return;
    }

    console.log("[AuthContext] token found, fetching /user");
    fetch(`${BACKEND}/user`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("[AuthContext] /user status:", res.status);
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data: { id: string; name: string; role_id: number }) => {
        const role = mapRoleIdToUserRole(data.role_id);
        localStorage.setItem("role", role); // ✅ Store role
        setUser({ id: data.id, name: data.name, role, token });
        console.log("[AuthContext] user set:", { id: data.id, name: data.name, role });
      })
      .catch((err) => {
        console.error("[AuthContext] /user error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const signin = async (email: string, password: string) => {
    console.log("[AuthContext] signin request:", { email });
    const res = await fetch(`${BACKEND}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("[AuthContext] login status:", res.status);
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Invalid credentials");
    }

    const { token, user: u } = (await res.json()) as {
      token: string;
      user: { id: string; name: string; role_id: number };
    };

    const role = mapRoleIdToUserRole(u.role_id);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role); // ✅ Store role
    setUser({ id: u.id, name: u.name, role, token });
    console.log("[AuthContext] user state updated:", { id: u.id, name: u.name, role });

    // Redirect based on role
    switch (role) {
      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;
      case "instructor":
        navigate("/instructor/dashboard", { replace: true });
        break;
      case "student":
        navigate("/student/dashboard", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  };

  const signout = () => {
    console.log("[AuthContext] signout");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
