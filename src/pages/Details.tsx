import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { playerAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Trophy, MapPin, Calendar } from 'lucide-react';

export default function Details() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    sport: '',
    position: '',
    experience: '',
    location: '',
    bio: '',
    achievements: '',
    contactPhone: '',
    contactEmail: '',
    avatarUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { token, user, updateUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await playerAPI.createOrUpdateProfile({
        role: user?.role || 'player',
        ...formData,
      });
      
      // Update user context with avatar if provided
      if (formData.avatarUrl) {
        updateUser({ avatarUrl: formData.avatarUrl });
      }
      
      // Navigate to dashboard after successful submission
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save details');
    } finally {
      setLoading(false);
    }
  };

  const sports = [
    'Football', 'Basketball', 'Cricket', 'Tennis', 'Badminton', 
    'Volleyball', 'Athletics', 'Swimming', 'Hockey', 'Baseball'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
              <User className="h-8 w-8" />
              Complete Your Profile
            </CardTitle>
            <CardDescription>
              Tell us more about yourself to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      placeholder="Enter your age"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Profile Picture URL (Optional)</Label>
                  <Input
                    id="avatarUrl"
                    name="avatarUrl"
                    type="url"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
              </div>

              {/* Sports Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Sports Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sport">Primary Sport</Label>
                    <Select value={formData.sport} onValueChange={(value) => handleSelectChange('sport', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {sports.map((sport) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="e.g., Forward, Goalkeeper, Point Guard"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleSelectChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                      <SelectItem value="professional">Professional (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievements">Achievements</Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleChange}
                    placeholder="List your achievements, awards, or notable performances..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Contact Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Skip for now
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Complete Profile'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
