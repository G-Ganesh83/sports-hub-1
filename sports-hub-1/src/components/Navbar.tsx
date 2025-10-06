import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/hero-sports-illustration.jpg';

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="SportsHub" className="h-8 w-8 rounded mr-2 object-cover" />
            <span className="text-2xl font-bold text-primary">SportsHub</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Leaderboard
            </Link>
            <Link 
              to="/scout" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Scout
            </Link>
            <Link 
              to="/fan" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Fan Hub
            </Link>
            
            {/* Profile Avatar - only show when authenticated */}
            {isAuthenticated && user && (
              <Link to="/profile" className="flex items-center">
                <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-200">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}

            {!isAuthenticated && (
              <Link to="/auth" className="text-foreground hover:text-primary transition-colors duration-200">Login / Register</Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};