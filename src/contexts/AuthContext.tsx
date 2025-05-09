
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define user types
export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  avatar?: string;
  gender?: string | null;
  city?: string | null;
  age?: number | null;
  budget?: number | null;
  interests?: string[] | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  updateUserProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("glamup_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionData.session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (profileData) {
          const userData: User = {
            id: sessionData.session.user.id,
            name: profileData.name,
            email: sessionData.session.user.email || '',
            role: sessionData.session.user.email?.includes('admin') ? 'admin' : 'user',
            avatar: profileData.avatar_url,
            gender: profileData.gender,
            city: profileData.city,
            age: profileData.age,
            budget: profileData.budget,
            interests: profileData.interests
          };

          setUser(userData);
          localStorage.setItem("glamup_user", JSON.stringify(userData));
        }
      }
    };

    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        const userData: User = {
          id: session.user.id,
          name: profile?.name,
          email: session.user.email || '',
          role: session.user.email?.includes('admin') ? 'admin' : 'user',
          avatar: profile?.avatar_url,
          gender: profile?.gender,
          city: profile?.city,
          age: profile?.age,
          budget: profile?.budget,
          interests: profile?.interests
        };

        setUser(userData);
        localStorage.setItem("glamup_user", JSON.stringify(userData));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem("glamup_user");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const userData: User = {
          id: data.user.id,
          name: profileData?.name,
          email: data.user.email || '',
          role: data.user.email?.includes('admin') ? 'admin' : 'user',
          avatar: profileData?.avatar_url,
          gender: profileData?.gender,
          city: profileData?.city,
          age: profileData?.age,
          budget: profileData?.budget,
          interests: profileData?.interests
        };

        setUser(userData);
        localStorage.setItem("glamup_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            gender: userData.gender,
            city: userData.city,
            age: userData.age,
            budget: userData.budget,
            interests: userData.interests
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Profile will be created by the database trigger
        const newUser: User = {
          id: data.user.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          gender: userData.gender,
          city: userData.city,
          age: userData.age,
          budget: userData.budget,
          interests: userData.interests
        };

        setUser(newUser);
        localStorage.setItem("glamup_user", JSON.stringify(newUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("glamup_user");
  };

  const updateUserProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          avatar_url: data.avatar,
          gender: data.gender,
          city: data.city,
          age: data.age,
          budget: data.budget,
          interests: data.interests
        })
        .eq('id', user.id);

      if (error) throw error;

      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("glamup_user", JSON.stringify(updatedUser));
      
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
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
        updateUserProfile
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
