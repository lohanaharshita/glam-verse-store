
import { createContext, useState, useContext, ReactNode } from "react";

// Define user types
export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@glamup.com",
    password: "admin123",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@glamup.com",
    password: "user123",
    role: "user",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("glamup_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("glamup_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (
    userData: Omit<User, "id"> & { password: string }
  ): Promise<boolean> => {
    // In a real app, this would make an API call
    const newUser = {
      ...userData,
      id: `${MOCK_USERS.length + 1}`,
    };

    // Check if email already exists
    if (MOCK_USERS.some((u) => u.email === userData.email)) {
      return false;
    }

    // For demo purposes we'll just simulate success
    setUser(newUser);
    localStorage.setItem("glamup_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("glamup_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        isAdmin,
      }}
    >
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
