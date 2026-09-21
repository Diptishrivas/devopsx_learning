import { createContext, useContext, useState, useEffect } from 'react';

// ============================================================
// AuthContext — Mock authentication with localStorage persistence
// Replace with real API calls when backend is ready
// ============================================================

const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    id: 1,
    name: 'Example One',
    email: 'example1@devopsx.io',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=example1',
    role: 'student',
    enrolledCourses: [1, 2, 5],
    wishlist: [3, 7],
    certificates: [1],
    joinedAt: '2024-01-15',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('devopsx_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('devopsx_user');
      }
    }
    setLoading(false);
  }, []);

  const API_BASE = import.meta.env.VITE_API_AUTH_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth`;

  // Real backend MongoDB login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid email or password');

      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
        enrolledCourses: [1, 2, 5],
        wishlist: [],
        certificates: [],
      };

      setUser(userData);
      localStorage.setItem('devopsx_user', JSON.stringify(userData));
      localStorage.setItem('devopsx_token', data.token);
      return userData;
    } catch (err) {
      // Fallback to mock login if backend server is unreachable
      const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
      if (found) {
        const { password: _pwd, ...safeUser } = found;
        setUser(safeUser);
        localStorage.setItem('devopsx_user', JSON.stringify(safeUser));
        return safeUser;
      }
      throw err;
    }
  };

  // Real backend MongoDB signup
  const register = async ({ name, email, password }) => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      const newUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
        enrolledCourses: [],
        wishlist: [],
        certificates: [],
      };

      setUser(newUser);
      localStorage.setItem('devopsx_user', JSON.stringify(newUser));
      localStorage.setItem('devopsx_token', data.token);
      return newUser;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devopsx_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('devopsx_user', JSON.stringify(updated));
  };

  const toggleWishlist = (courseId) => {
    if (!user) return;
    const wishlist = user.wishlist.includes(courseId)
      ? user.wishlist.filter((id) => id !== courseId)
      : [...user.wishlist, courseId];
    updateProfile({ wishlist });
  };

  const isEnrolled = (courseId) => user?.enrolledCourses?.includes(courseId) ?? false;
  const isWishlisted = (courseId) => user?.wishlist?.includes(courseId) ?? false;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, toggleWishlist, isEnrolled, isWishlisted }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
