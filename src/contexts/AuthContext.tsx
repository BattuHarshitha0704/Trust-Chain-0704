import React, { createContext, useContext, useState, useEffect } from 'react';

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
  // Removed googleAdminLogin from the context interface but keeping it in implementation for backward compatibility
  adminRegister: (fullName: string, email: string, password: string) => Promise<void>;
  register: (pseudonym: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.isAdmin || false);
    }
  }, []);

  const login = async (pseudonym: string, password: string) => {
    if (pseudonym === 'admin' && password === 'admin') {
      const adminUser = { id: 'admin-id', pseudonym: 'admin', isAdmin: true };
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return;
    }
    
    const newUser = { id: `user-${Date.now()}`, pseudonym };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  const adminLogin = async (email: string, password: string) => {
    if (email === 'admin@safespeak.com' && password === 'Admin123!') {
      const adminUser = { 
        id: 'admin-id', 
        pseudonym: 'Admin', 
        isAdmin: true,
        email: email 
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return;
    }
    
    throw new Error('Invalid admin credentials');
  };

  // Kept for back-compatibility but no longer exported in the context
  const googleAdminLogin = async () => {
    // In a real application, this would integrate with Google OAuth
    // Simulating successful Google authentication
    const googleUser = { 
      id: `google-admin-${Date.now()}`, 
      pseudonym: 'Google Admin',
      fullName: 'Google User', 
      isAdmin: true,
      email: 'google-admin@gmail.com' 
    };
    
    setUser(googleUser);
    setIsAuthenticated(true);
    setIsAdmin(true);
    localStorage.setItem('user', JSON.stringify(googleUser));
  };

  const adminRegister = async (fullName: string, email: string, password: string) => {
    const adminUser = { 
      id: `admin-${Date.now()}`, 
      pseudonym: fullName,
      fullName: fullName, 
      isAdmin: true,
      email: email 
    };
    setUser(adminUser);
    setIsAuthenticated(true);
    setIsAdmin(true);
    localStorage.setItem('user', JSON.stringify(adminUser));
  };

  const register = async (pseudonym: string, password: string) => {
    const newUser = { id: `user-${Date.now()}`, pseudonym };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
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
      isAdmin 
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
