import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border shadow-[0_-1px_10px_rgba(0,0,255,0.05)] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Logo */}
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <span>🇮🇳</span> <span>SportsHub India</span>
          </div>

          {/* Center: Nav Links */}
          <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
            <Link to="/" className="text-foreground hover:text-primary hover:underline underline-offset-4">Home</Link>
            <Link to="/profile" className="text-foreground hover:text-primary hover:underline underline-offset-4">Player Profiles</Link>
            <Link to="/profile" className="text-foreground hover:text-primary hover:underline underline-offset-4">Selector Profiles</Link>
            <Link to="/events" className="text-foreground hover:text-primary hover:underline underline-offset-4">Events</Link>
            <Link to="/leaderboard" className="text-foreground hover:text-primary hover:underline underline-offset-4">Leaderboard</Link>
          </nav>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-muted-foreground text-center md:text-right">
          © 2025 SportsHub India. Empowering athletes from villages to cities. • Made for Indian Sports Opportunities Platform - 2025 • <a className="hover:underline" href="#">About</a> • <a className="hover:underline" href="#">Contact</a> • <a className="hover:underline" href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};


