
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
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminRegister: (fullName: string, email: string, password: string) => Promise<void>;
  register: (pseudonym: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleUserSession(session.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleUserSession(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSession = async (authUser: any) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) throw error;

      const user = {
        id: userData.id,
        pseudonym: userData.pseudonym,
        isAdmin: userData.is_admin,
        email: authUser.email,
        fullName: null
      };

      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(userData.is_admin);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Disabled login functionality
      toast({
        title: "Login Disabled",
        description: "User login functionality is currently disabled.",
        variant: "destructive"
      });
      throw new Error("Login functionality is currently disabled");
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
      // Disabled admin login functionality
      toast({
        title: "Admin Login Disabled",
        description: "Admin login functionality is currently disabled.",
        variant: "destructive"
      });
      throw new Error("Admin login functionality is currently disabled");
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
      // First create the user account
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
        // Clean up auth user if user table insert fails
        console.error('Failed to create admin user record, cleaning up auth user');
        throw userError;
      }
      
      // Auto sign-in after registration disabled for admin
      toast({
        title: "Registration Successful",
        description: "Admin account created successfully, but login is currently disabled.",
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
      const email = `${pseudonym.toLowerCase()}@safespeak.anonymous`;
      
      // First create the auth user
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
        // Clean up auth user if user table insert fails
        console.error('Failed to create user record, cleaning up auth user');
        throw userError;
      }
      
      // Auto sign-in after registration disabled
      toast({
        title: "Registration Successful",
        description: "Your anonymous profile has been created, but login is currently disabled.",
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
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
