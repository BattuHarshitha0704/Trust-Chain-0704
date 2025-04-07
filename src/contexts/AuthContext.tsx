
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  pseudonym: string;
}

interface AuthContextType {
  user: User | null;
  login: (pseudonym: string, password: string) => Promise<void>;
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

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.isAdmin || false);
    }
  }, []);

  // Login function - in a real app this would connect to your backend
  const login = async (pseudonym: string, password: string) => {
    // Mock login - will be replaced with real blockchain authentication
    if (pseudonym === 'admin' && password === 'admin') {
      const adminUser = { id: 'admin-id', pseudonym: 'admin', isAdmin: true };
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return;
    }
    
    // Regular user login
    const newUser = { id: `user-${Date.now()}`, pseudonym };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Register function
  const register = async (pseudonym: string, password: string) => {
    // Mock registration - will be replaced with real blockchain authentication
    const newUser = { id: `user-${Date.now()}`, pseudonym };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isAdmin }}>
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
