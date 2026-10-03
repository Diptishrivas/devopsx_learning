// ============================================================
// Route guards — gate routes on auth state
// ============================================================

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/Skeleton';

// Where a guest was heading, so login can send them back there.
export function getRedirectTarget(location, fallback = '/dashboard') {
  const from = location.state?.from;
  if (!from?.pathname || from.pathname === '/login' || from.pathname === '/register') return fallback;
  return `${from.pathname}${from.search || ''}${from.hash || ''}`;
}

// Logged-in users only. Guests are sent to /login and returned afterwards.
// Waits for the stored session to load so a refresh doesn't bounce to login.
export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

// Guests only (login / register). Logged-in users go to where they were heading.
export function GuestRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;
  if (user) return <Navigate to={getRedirectTarget(location)} replace />;
  return <Outlet />;
}

// For actions (wishlist, add to cart) on public pages: runs `action` when
// logged in, otherwise sends the guest to login and back to this page.
export function useRequireLogin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (action) => {
    if (user) return action();
    toast('Please log in to continue');
    navigate('/login', { state: { from: location } });
  };
}
