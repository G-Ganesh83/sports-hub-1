import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '@/assets/hero-sports-illustration.jpg';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">🇮🇳 Unlock</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Opportunities for Every Indian Athlete</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Sports Talent Hub
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              From local grounds to national arenas — showcase your talent, connect with coaches, and get discovered.
            </p>
            
            <div className="pt-4">
              <Button 
                variant="hero" 
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => navigate('/signup')}
              >
                Join as Player
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 ml-3"
                onClick={() => navigate('/signup')}
              >
                Join as Selector
              </Button>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-medium">
              <img 
                src={heroIllustration} 
                alt="Sports talent connecting on Web3 platform"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-glow/15 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};