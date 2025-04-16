
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
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleUserSession(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleUserSession(session.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
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
        // Use optional chaining to safely access the full_name property if it exists
        fullName: userData.full_name || null
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      if (!userData.is_admin) {
        await supabase.auth.signOut();
        throw new Error('Unauthorized: Not an admin account');
      }
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            is_admin: true,
          }
        }
      });
      
      if (error) throw error;

      if (data.user) {
        await supabase
          .from('users')
          .update({ is_admin: true, full_name: fullName })
          .eq('id', data.user.id);
          
        toast({
          title: "Registration Successful",
          description: "Admin account created successfully",
        });
      }
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            pseudonym,
            is_admin: false,
          }
        }
      });
      
      if (error) throw error;

      if (data.user) {
        await supabase
          .from('users')
          .update({ pseudonym })
          .eq('id', data.user.id);
          
        toast({
          title: "Registration Successful",
          description: "Your anonymous profile has been created",
        });
      }
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
