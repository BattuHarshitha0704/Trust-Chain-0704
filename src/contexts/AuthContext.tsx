
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  pseudonym: string;
  isAdmin?: boolean;
  email?: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (pseudonym: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminRegister: (fullName: string, email: string, password: string) => Promise<void>;
  register: (pseudonym: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

// Static credentials
const STATIC_USER = {
  id: "user-123",
  pseudonym: "anonymous",
  isAdmin: false
};

const STATIC_ADMIN = {
  id: "admin-123",
  pseudonym: "admin",
  email: "admin@safespeak.com",
  fullName: "Admin User",
  isAdmin: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initial loading
    setLoading(false);
  }, []);

  const login = async (pseudonym: string, password: string) => {
    try {
      // Check against static credentials
      if (pseudonym === "anonymous" && password === "password") {
        setUser(STATIC_USER);
        setIsAuthenticated(true);
        setIsAdmin(false);
        
        toast({
          title: "Login Successful",
          description: "Welcome back to SafeSpeak!",
        });
        return;
      }
      throw new Error("Invalid credentials");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      // Check against static admin credentials
      if (email === "admin@safespeak.com" && password === "admin123") {
        setUser(STATIC_ADMIN);
        setIsAuthenticated(true);
        setIsAdmin(true);
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the Admin Dashboard!",
        });
        return;
      }
      throw new Error("Invalid admin credentials");
    } catch (error: any) {
      toast({
        title: "Admin Login Failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const adminRegister = async (fullName: string, email: string, password: string) => {
    try {
      // Registration remains as is - calls to Supabase will be kept
      // but won't affect our static login implementation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error('Failed to create admin account');
      }

      // Then create the admin record in the users table
      const { error: userError } = await supabase
        .from('users')
        .insert({ 
          id: data.user.id, 
          is_admin: true, 
          pseudonym: email.split('@')[0],
        });
        
      if (userError) {
        console.error('Failed to create admin user record, cleaning up auth user');
        throw userError;
      }
      
      toast({
        title: "Registration Successful",
        description: "Admin account created successfully. You can now log in with static credentials.",
      });
    } catch (error: any) {
      toast({
        title: "Admin Registration Failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const register = async (pseudonym: string, password: string) => {
    try {
      // Registration remains as is - calls to Supabase will be kept
      // but won't affect our static login implementation
      const email = `${pseudonym.toLowerCase()}@safespeak.anonymous`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error('Failed to create user account');
      }

      // Then create the user record in our users table
      const { error: userError } = await supabase
        .from('users')
        .insert({ 
          id: data.user.id, 
          pseudonym, 
          is_admin: false
        });
        
      if (userError) {
        console.error('Failed to create user record, cleaning up auth user');
        throw userError;
      }
      
      toast({
        title: "Registration Successful",
        description: "Your anonymous profile has been created. You can now log in with static credentials.",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // No need to call Supabase, just update state
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      
      toast({
        title: "Logout Successful",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      adminLogin,
      adminRegister,
      register,
      logout,
      isAuthenticated,
      isAdmin,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
