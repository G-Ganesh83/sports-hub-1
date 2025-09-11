import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { User, Users, Search, ChevronRight, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const location = useLocation();
  const mode = useMemo(() => new URLSearchParams(location.search).get('mode'), [location.search]);
  const [isLogin, setIsLogin] = useState(() => mode !== 'register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    setIsLogin(mode !== 'register');
  }, [mode]);

  const roles = [
    {
      id: 'player',
      title: 'Player',
      description: 'Showcase your talent, track performance, and connect with scouts',
      icon: User,
      features: ['Create player profile', 'Upload training videos', 'Track achievements', 'Connect with scouts']
    },
    {
      id: 'coach',
      title: 'Coach',
      description: 'Manage athletes, create training programs, and build your reputation',
      icon: Users,
      features: ['Manage player profiles', 'Create training programs', 'Performance analytics', 'Build your network']
    },
    {
      id: 'scout',
      title: 'Scout',
      description: 'Discover talent, analyze performance, and build your roster',
      icon: Search,
      features: ['Talent discovery tools', 'Performance analytics', 'NFT drafting system', 'Portfolio management']
    }
  ];

  const handleRoleSelection = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/dashboard');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive",
          });
          return;
        }
        if (!selectedRole) {
          toast({
            title: "Error",
            description: "Please select a role",
            variant: "destructive",
          });
          return;
        }
        await register(formData.name, formData.email, formData.password, selectedRole);
        toast({
          title: "Registration Successful",
          description: "Account created successfully!",
        });
        navigate('/details');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <motion.div 
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-foreground mb-4"
            variants={fadeInUp}
          >
            Welcome to SportsHub India
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            variants={fadeInUp}
          >
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </motion.p>
          
          {/* Auth Toggle */}
          <motion.div 
            className="flex justify-center mb-8"
            variants={fadeInUp}
          >
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(true)}
                className="px-6"
              >
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(false)}
                className="px-6"
              >
                Register
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Auth Form */}
        <motion.div 
          className="max-w-md mx-auto mb-8"
          variants={fadeInUp}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {isLogin ? 'Sign In' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin ? 'Enter your credentials to sign in' : 'Fill in your details to create an account'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Role Selection - Only for Registration */}
        {!isLogin && (
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.h2 
              className="text-2xl font-bold text-center mb-8"
              variants={fadeInUp}
            >
              Choose Your Role
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roles.map((role) => (
                <motion.div key={role.id} variants={fadeInUp}>
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                      selectedRole === role.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-soft'
                    }`}
                    onClick={() => handleRoleSelection(role.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                        <role.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                      <CardDescription className="text-center">
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {role.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Benefits Section */}
        <motion.div 
          className="mt-12 text-center"
          variants={fadeInUp}
        >
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Why Choose SportsHub India?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🌍 Global Network</h4>
                  <p className="text-white/80">Connect with athletes, coaches, and scouts worldwide</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔗 Web3 Technology</h4>
                  <p className="text-white/80">Secure, transparent, and decentralized platform</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🏆 Career Growth</h4>
                  <p className="text-white/80">Tools and opportunities to advance your sports career</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;