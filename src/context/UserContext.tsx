
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfileSummary } from "@/types";
import { toast } from "sonner";

interface UserContextType {
  user: UserProfileSummary | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock API functions - will be replaced with real API calls
const mockFetchUser = (): Promise<UserProfileSummary | null> => {
  // For initial demo, we'll return not logged in
  return Promise.resolve({
    isLoggedIn: false
  });
};

const mockLogin = (email: string, password: string): Promise<UserProfileSummary> => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo validation
      if (email === "demo@example.com" && password === "password") {
        resolve({
          isLoggedIn: true,
          userId: "user1",
          name: "Demo User",
          avatarUrl: "https://ui-avatars.com/api/?name=Demo+User&background=4D7C0F&color=fff"
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });
};

const mockRegister = (name: string, email: string, password: string): Promise<UserProfileSummary> => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real app, we would create a new user account here
      resolve({
        isLoggedIn: true,
        userId: "new-user",
        name: name,
        avatarUrl: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=4D7C0F&color=fff`
      });
    }, 800);
  });
};

const mockLogout = (): Promise<void> => {
  return Promise.resolve();
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const userData = await mockFetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser({ isLoggedIn: false });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = await mockLogin(credentials.email, credentials.password);
      setUser(userData);
      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser = await mockRegister(userData.name, userData.email, userData.password);
      setUser(newUser);
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await mockLogout();
      setUser({ isLoggedIn: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
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
