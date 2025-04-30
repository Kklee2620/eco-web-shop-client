
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfileSummary } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface UserContextType {
  user: UserProfileSummary | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileSummary | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        // Update user state based on session
        if (currentSession?.user) {
          const { user: authUser } = currentSession;
          setUser({
            isLoggedIn: true,
            userId: authUser.id,
            name: authUser.user_metadata?.name || "Người dùng",
            email: authUser.email || "",
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.user_metadata?.name || "User")}&background=4D7C0F&color=fff`
          });
        } else {
          setUser({ isLoggedIn: false });
        }
        
        // Once authentication state is determined, we're no longer loading
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      // Update user state based on session
      if (currentSession?.user) {
        const { user: authUser } = currentSession;
        setUser({
          isLoggedIn: true,
          userId: authUser.id,
          name: authUser.user_metadata?.name || "Người dùng",
          email: authUser.email || "",
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.user_metadata?.name || "User")}&background=4D7C0F&color=fff`
        });
      } else {
        setUser({ isLoggedIn: false });
      }
      
      // Once authentication state is determined, we're no longer loading
      setIsLoading(false);
    }).catch(error => {
      console.error("Error fetching session:", error);
      setUser({ isLoggedIn: false });
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        throw error;
      }

      toast.success("Đăng nhập thành công!");
      return true;
    } catch (error: any) {
      console.error("Đăng nhập thất bại:", error.message);
      toast.error(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          }
        }
      });

      if (error) {
        throw error;
      }

      toast.success("Đăng ký thành công!");
      return true;
    } catch (error: any) {
      console.error("Đăng ký thất bại:", error.message);
      toast.error(error.message || "Đăng ký thất bại. Vui lòng thử lại.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      setUser({ isLoggedIn: false });
      toast.success("Đã đăng xuất thành công");
    } catch (error: any) {
      console.error("Đăng xuất thất bại:", error.message);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
