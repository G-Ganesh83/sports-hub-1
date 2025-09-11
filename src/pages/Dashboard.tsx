import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Trophy, Target, Calendar, Clock, MapPin, Link as LinkIcon, Settings, Edit3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InputField from '@/components/InputField';
import TextArea from '@/components/TextArea';
import FileUpload from '@/components/FileUpload';
import AvatarGenerator from '@/components/AvatarGenerator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useProfile } from '@/context/ProfileContext';
import api, { playerAPI, usersAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<'player' | 'coach'>('player');
  const { profile, setProfile } = useProfile();
  const { user, updateUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (user?.role === 'coach') setUserRole('coach');
    // Load profile from backend
    (async () => {
      setLoadingProfile(true);
      try {
        const [userRes, playerRes] = await Promise.allSettled([
          usersAPI.getMe() as any,
          api.get('/players/me') as any,
        ]);
        const u = userRes.status === 'fulfilled' ? (userRes.value.data.user || {}) : {};
        const p = playerRes.status === 'fulfilled' ? playerRes.value.data : {};
        const profileData = {
          role: p.role === 'coach' ? 'coach' : 'player',
          fullName: u.name || p.fullName || user?.name || '',
          email: u.email || user?.email || '',
          phone: u.phone || '',
          age: p.age,
          sport: p.sport || 'Cricket',
          state: (u.location && u.location.state) || p.extra?.state || '',
          city: (u.location && u.location.city) || p.location || '',
          district: p.extra?.district || '',
          country: (u.location && u.location.country) || p.extra?.country || 'India',
          club: p.extra?.club || '',
          bio: p.bio,
          achievements: p.achievements ? p.achievements.split(', ').map(a => {
            const [title, description] = a.split(':');
            return { title, description };
          }) : [],
          photoUrl: p.avatarUrl,
          performanceLink: p.extra?.performanceLink || '',
          skills: p.extra?.skills ? 
            (typeof p.extra.skills === 'string' ? JSON.parse(p.extra.skills) : p.extra.skills) : 
            [],
          expertise: u.specialization || p.extra?.expertise,
          coachingStyle: p.extra?.coachingStyle,
          pastExperience: p.extra?.pastExperience,
          organization: p.extra?.organization,
          position: u.position || '',
        };
        
        setProfile(profileData as any);
        
        // Update user context with avatar
        if (p.avatarUrl) {
          updateUser({ avatarUrl: p.avatarUrl });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    })();
  }, [user]);

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

  // Mock data used across dashboards
  const playerInfo = {
    name: profile.fullName,
    sport: profile.role === 'player' ? (profile as any).sport : 'Cricket',
    state: (profile as any).state || '',
    city: (profile as any).city || '',
    district: (profile as any).district || '',
  };

  const selectorInfo = {
    name: profile.fullName,
    sport: (profile as any).sport || 'Cricket',
    state: (profile as any).state || '',
    city: (profile as any).city || '',
  };

  type EventItem = { title: string; level: 'District' | 'State' | 'National'; date: string; city: string; state: string; description: string; link?: string };
  const indiaEvents: EventItem[] = [
    { title: 'Pune District Trials', level: 'District', date: '2024-02-05', city: 'Pune', state: 'Maharashtra', link: 'https://forms.gle/district', description: 'Open trials for U-19 cricket talents.' },
    { title: 'Maharashtra State Showcase', level: 'State', date: '2024-03-12', city: 'Mumbai', state: 'Maharashtra', link: 'https://forms.gle/state', description: 'State-level showcase for top performers.' },
    { title: 'National Talent Hunt', level: 'National', date: '2024-04-10', city: 'New Delhi', state: 'Delhi', description: 'Nationwide selection for elite prospects.' },
  ];

  const recentAchievements = [
    { icon: '🏆', title: 'District Champion', detail: 'Pune District U-19 Championship', level: 'District', date: '2023' },
    { icon: '🥈', title: 'State Runner-up', detail: 'Maharashtra State U-19 T20', level: 'State', date: '2023' },
    { icon: '🎯', title: 'National Trials Participant', detail: 'BCCI U-19 Trials', level: 'National', date: '2024' },
  ] as const;

  const Sidebar = ({ items }: { items: string[] }) => (
    <aside className="space-y-2">
      {items.map((item) => (
        <Button key={item} variant="outline" className="w-full justify-start">
          {item}
        </Button>
      ))}
    </aside>
  );

  const sportsOptions = ['Cricket', 'Football', 'Badminton', 'Hockey', 'Kabaddi', 'Athletics'];

  function PlayerEditForm({ onClose }: { onClose: () => void }) {
    const p = profile.role === 'player' ? profile : undefined;
    const [fullName, setFullName] = useState(p?.fullName || '');
    const [email, setEmail] = useState((profile as any).email || user?.email || '');
    const [position, setPosition] = useState((profile as any).position || '');
    const [phone, setPhone] = useState((profile as any).phone || '');
    const [age, setAge] = useState(p?.age?.toString() || '');
    const [sport, setSport] = useState(p?.sport || 'Cricket');
    const [state, setState] = useState(p?.state || '');
    const [city, setCity] = useState(p?.city || '');
    const [district, setDistrict] = useState(p?.district || '');
    const [country, setCountry] = useState(p?.country || 'India');
    const [club, setClub] = useState(p?.club || '');
    const [bio, setBio] = useState(p?.bio || '');
    const [photoUrl, setPhotoUrl] = useState(p?.photoUrl || '');
    const [performanceLink, setPerformanceLink] = useState(p?.performanceLink || '');
    const [achievements, setAchievements] = useState(p?.achievements || []);
    const [skills, setSkills] = useState(p?.skills || [
      { label: "Batting Technique", value: 90 },
      { label: "Stamina", value: 88 },
      { label: "Fielding", value: 85 },
      { label: "Agility", value: 92 }
    ]);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [newSkill, setNewSkill] = useState({ label: '', value: 80 });

    const addSkill = () => {
      if (newSkill.label.trim()) {
        setSkills([...skills, { ...newSkill }]);
        setNewSkill({ label: '', value: 80 });
      }
    };

    const removeSkill = (index: number) => {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    };

    async function save() {
      setSaving(true);
      setSaveSuccess(false);
      
      try {
        // Update local state first
        setProfile({
          role: 'player',
          fullName,
          age: age ? parseInt(age, 10) : undefined,
          sport,
          state,
          city,
          district,
          country,
          club,
          bio,
          photoUrl,
          performanceLink,
          achievements,
          skills,
        });
        
        // Update user master record
        await usersAPI.updateMe({
          name: fullName,
          email,
          phone,
          position,
          location: { state, city, country },
        });

        // Then update backend player profile
        await playerAPI.createOrUpdateProfile({
          role: 'player',
          fullName,
          age: age ? parseInt(age, 10) : undefined,
          sport,
          location: city,
          bio,
          avatarUrl: photoUrl,
          achievements: achievements.map(a => `${a.title}:${a.description}`).join(', '),
          extra: {
            district,
            state,
            country,
            club,
            performanceLink,
            skills: JSON.stringify(skills),
          },
        });
        
        // Update user context with new avatar and name
        updateUser({ 
          avatarUrl: photoUrl,
          name: fullName 
        });
        
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        toast({ title: 'Profile updated', description: 'Your player profile was saved successfully.' });
        onClose();
      } catch (error) {
        console.error('Error saving profile:', error);
        toast({ title: 'Save failed', description: 'Could not save your profile.', variant: 'destructive' as any });
      } finally {
        setSaving(false);
      }
    }

    return (
      <div className="space-y-4">
        {loadingProfile ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading profile...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField id="fullName" label="Name" placeholder="Full Name" value={fullName} onChange={setFullName} />
              <InputField id="role" label="Role" value={'Player'} onChange={() => {}} readOnly />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField id="phone" label="Phone" placeholder="Phone number" value={phone} onChange={setPhone} />
              <InputField id="position" label="Position" placeholder="e.g., Batsman / Midfielder" value={position} onChange={setPosition} />
            </div>
            <InputField id="email" label="Email" placeholder="Email" value={email} onChange={setEmail} />
            
            <div className="grid grid-cols-2 gap-4">
              <InputField id="age" label="Age" type="number" placeholder="Age" value={age} onChange={setAge} />
              <div className="space-y-1">
                <Label htmlFor="sport">Sport</Label>
                <Select value={sport} onValueChange={setSport}>
                  <SelectTrigger id="sport"><SelectValue placeholder="Sport" /></SelectTrigger>
                  <SelectContent>
                    {sportsOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <InputField id="country" label="Country" placeholder="Country" value={country} onChange={setCountry} />
              <InputField id="state" label="State" placeholder="State" value={state} onChange={setState} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <InputField id="district" label="District" placeholder="District" value={district} onChange={setDistrict} />
              <InputField id="city" label="City" placeholder="City" value={city} onChange={setCity} />
            </div>
            
            <InputField id="club" label="Local Club/Academy" placeholder="Local Club or Academy" value={club} onChange={setClub} />
            
            <TextArea id="bio" label="Bio" placeholder="Short Bio" value={bio} onChange={setBio} />
            
            <InputField id="photoUrl" label="Photo URL" placeholder="Photo URL" value={photoUrl} onChange={setPhotoUrl} />
            <FileUpload label="Upload Photo/Video" accept="image/*,video/*" onFilesSelected={(files) => {
              const file = files[0];
              if (file) setPhotoUrl(URL.createObjectURL(file));
            }} />
            
            <InputField id="performanceLink" label="Performance Link" placeholder="YouTube/Vimeo Performance Link" value={performanceLink} onChange={setPerformanceLink} />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="skills">Skills</Label>
                <Button size="sm" variant="outline" onClick={() => setSkills([...skills, { label: '', value: 80 }])}>Add Skill</Button>
              </div>
              {skills.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2">
                  <Input placeholder="Skill Name" value={skill.label} onChange={(e) => {
                    const copy = [...skills];
                    copy[idx] = { ...copy[idx], label: e.target.value };
                    setSkills(copy);
                  }} />
                  <Input 
                    type="number" 
                    min="0" 
                    max="100" 
                    placeholder="Value (0-100)" 
                    value={skill.value} 
                    onChange={(e) => {
                      const copy = [...skills];
                      copy[idx] = { ...copy[idx], value: parseInt(e.target.value, 10) || 0 };
                      setSkills(copy);
                    }} 
                  />
                  <Button variant="outline" size="icon" onClick={() => {
                    const copy = skills.filter((_, i) => i !== idx);
                    setSkills(copy);
                  }}>
                    ✕
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="achievements">Achievements</Label>
                <Button size="sm" variant="outline" onClick={() => setAchievements([...achievements, { title: '', description: '' }])}>Add</Button>
              </div>
              {achievements.map((a, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <Input placeholder="Title" value={a.title} onChange={(e) => {
                    const copy = [...achievements];
                    copy[idx] = { ...copy[idx], title: e.target.value };
                    setAchievements(copy);
                  }} />
                  <Input placeholder="Description" value={a.description} onChange={(e) => {
                    const copy = [...achievements];
                    copy[idx] = { ...copy[idx], description: e.target.value };
                    setAchievements(copy);
                  }} />
                </div>
              ))}
            </div>
            
            {saveSuccess && (
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm flex items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Profile saved successfully!
              </div>
            )}
            
            <Button 
              onClick={save} 
              disabled={saving}
              className="w-full mt-4"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : "Save Changes"}
            </Button>
          </>
        )}
      </div>
    );
  }

  function SelectorEditForm({ onClose }: { onClose: () => void }) {
    const s = profile.role === 'coach' ? profile : undefined;
    const [fullName, setFullName] = useState(s?.fullName || '');
    const [email, setEmail] = useState((profile as any).email || user?.email || '');
    const [phone, setPhone] = useState((profile as any).phone || '');
    const selectorRole = (profile as any).role === 'coach' ? 'Coach' : 'Selector';
    const [sport, setSport] = useState(s?.sport || 'Cricket');
    const [state, setState] = useState(s?.state || '');
    const [city, setCity] = useState(s?.city || '');
    const [bio, setBio] = useState(s?.bio || '');
    const [photoUrl, setPhotoUrl] = useState(s?.photoUrl || '');
    const [credentialsUrl, setCredentialsUrl] = useState(s?.credentialsUrl || '');
    const [eventLink, setEventLink] = useState(s?.eventLink || '');
    const [eventDate, setEventDate] = useState<string>('');
    const [expertise, setExpertise] = useState(s?.expertise || 'Scouting, Player Development');
    const [coachingStyle, setCoachingStyle] = useState(s?.coachingStyle || 'Analytical, Development-Focused');
    const [pastExperience, setPastExperience] = useState(s?.pastExperience || '10+ years, Collegiate and Semi-Pro');
    const [organization, setOrganization] = useState(s?.organization || '');
    const [eventPhotosSummary, setEventPhotosSummary] = useState<string>('');
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    async function save() {
      setSaving(true);
      setSaveSuccess(false);
      
      try {
        setProfile({
          role: 'coach',
          fullName,
          selectorRole: selectorRole as 'Coach' | 'Selector',
          sport,
          state,
          city,
          phone,
          bio,
          photoUrl,
          credentialsUrl,
          eventLink,
          expertise,
          coachingStyle,
          pastExperience,
          organization,
        });
        
        // Update user master record
        await usersAPI.updateMe({
          name: fullName,
          email,
          phone,
          specialization: expertise,
          location: { state, city, country: (profile as any).country || '' },
        });

        await playerAPI.createOrUpdateProfile({
          role: 'coach',
          fullName,
          sport,
          location: city,
          bio,
          avatarUrl: photoUrl,
          extra: { 
            selectorRole, 
            credentialsUrl, 
            eventLink,
            expertise,
            coachingStyle,
            pastExperience,
            organization,
            state,
            eventDate,
          },
        });
        
        // Update user context with new avatar and name
        updateUser({ 
          avatarUrl: photoUrl,
          name: fullName 
        });
        
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        toast({ title: 'Profile updated', description: 'Your selector/coach profile was saved.' });
        onClose();
      } catch (error) {
        console.error("Error saving selector profile:", error);
        toast({ title: 'Save failed', description: 'Could not save your profile.', variant: 'destructive' as any });
      } finally {
        setSaving(false);
      }
    }

    return (
      <div className="space-y-4">
        {loadingProfile ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading profile...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField id="fullName" label="Name" placeholder="Full Name" value={fullName} onChange={setFullName} />
              <InputField id="role" label="Role" value={selectorRole} onChange={() => {}} readOnly />
            </div>
            <InputField id="email" label="Email" placeholder="Email" value={email} onChange={setEmail} />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="selectorRole">Role</Label>
                <Input id="selectorRole" value={selectorRole} readOnly />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sport">Sport</Label>
                <Select value={sport} onValueChange={setSport}>
                  <SelectTrigger id="sport"><SelectValue placeholder="Sport" /></SelectTrigger>
                  <SelectContent>
                    {sportsOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <InputField id="state" label="State" placeholder="State" value={state} onChange={setState} />
              <InputField id="city" label="City" placeholder="City" value={city} onChange={setCity} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField id="phone" label="Phone" placeholder="Phone number" value={phone} onChange={setPhone} />
              <InputField id="expertise" label="Specialization" placeholder="e.g., Talent Scouting" value={expertise} onChange={setExpertise} />
            </div>
            
            <InputField id="organization" label="Organization/Club" placeholder="Organization or Club" value={organization} onChange={setOrganization} />
            
            <InputField id="expertise" label="Expertise" placeholder="Area of Expertise" value={expertise} onChange={setExpertise} />
            
            <InputField id="coachingStyle" label="Coaching Style" placeholder="Coaching Style" value={coachingStyle} onChange={setCoachingStyle} />
            
            <InputField id="pastExperience" label="Past Experience" placeholder="Past Experience" value={pastExperience} onChange={setPastExperience} />
            
            <TextArea id="bio" label="Bio" placeholder="Short Bio" value={bio} onChange={setBio} />
            
            <div className="grid grid-cols-2 gap-4">
              <InputField id="photoUrl" label="Photo URL" placeholder="Photo URL" value={photoUrl} onChange={setPhotoUrl} />
              <InputField id="credentialsUrl" label="Credentials URL" placeholder="Credentials URL" value={credentialsUrl} onChange={setCredentialsUrl} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField id="eventLink" label="Event Link" placeholder="Event Link (Google Form/Event page)" value={eventLink} onChange={setEventLink} />
              <InputField id="eventDate" label="Event Date" type="date" value={eventDate} onChange={setEventDate} />
            </div>
            <FileUpload label="Event Photos" accept="image/*" multiple onFilesSelected={(files) => {
              setEventPhotosSummary(`${files.length} photo(s) selected`);
            }} />

            {saveSuccess && (
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm flex items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Profile saved successfully!
              </div>
            )}
            
            <Button 
              onClick={save} 
              disabled={saving}
              className="w-full mt-4"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : "Save Changes"}
            </Button>
          </>
        )}
      </div>
    );
  }

  function ScoutEditForm({ onClose }: { onClose: () => void }) {
    const [fullName, setFullName] = useState(profile.fullName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [expertise, setExpertise] = useState('Scouting, Talent Identification');
    const [regions, setRegions] = useState('Maharashtra, Karnataka');
    const [bio, setBio] = useState((profile as any).bio || '');
    const [photoUrl, setPhotoUrl] = useState((profile as any).photoUrl || '');
    const [saving, setSaving] = useState(false);

    async function save() {
      try {
        setSaving(true);
        setProfile({
          ...(profile as any),
          role: 'coach',
          fullName,
          bio,
          photoUrl,
          extra: { ...(profile as any).extra, expertise, regions },
        } as any);
        await playerAPI.createOrUpdateProfile({
          role: 'coach',
          fullName,
          bio,
          avatarUrl: photoUrl,
          extra: { expertise, regions, email },
        } as any);
        updateUser({ name: fullName, avatarUrl: photoUrl });
        toast({ title: 'Profile updated', description: 'Your scout profile was saved.' });
        onClose();
      } catch (e) {
        toast({ title: 'Save failed', description: 'Could not save scout profile.', variant: 'destructive' as any });
      } finally {
        setSaving(false);
      }
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField id="fullName" label="Name" placeholder="Full Name" value={fullName} onChange={setFullName} />
          <InputField id="role" label="Role" value={'Scout'} onChange={() => {}} readOnly />
        </div>
        <InputField id="email" label="Email" placeholder="Email" value={email} onChange={setEmail} />
        <InputField id="expertise" label="Expertise" placeholder="e.g., Cricket scouting" value={expertise} onChange={setExpertise} />
        <InputField id="regions" label="Regions Covered" placeholder="e.g., Maharashtra, Karnataka" value={regions} onChange={setRegions} />
        <TextArea id="bio" label="Bio" placeholder="Short Bio" value={bio} onChange={setBio} />
        <InputField id="photoUrl" label="Photo URL" placeholder="Photo URL" value={photoUrl} onChange={setPhotoUrl} />
        <Button onClick={save} disabled={saving} className="w-full mt-2">{saving ? 'Saving...' : 'Save Changes'}</Button>
      </div>
    );
  }

  const PlayerDashboard = () => {
    const localOpportunities = indiaEvents.filter(e => e.state === playerInfo.state && (e.city === playerInfo.city || e.level !== 'District'));

    return (
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar items={["Profile", "Dashboard", "Achievements", "Media", "Opportunities"]} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* Welcome */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Welcome, {profile.fullName}</CardTitle>
                  <CardDescription>Role: {userRole === 'player' ? 'Player' : 'Selector/Coach'}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
          {/* Quick Info */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
                <CardTitle>Player Quick Info</CardTitle>
                <CardDescription>India-first profile snapshot</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Name</p><p className="text-lg font-medium">{playerInfo.name}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Sport</p><p className="text-lg font-medium">{playerInfo.sport}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">State</p><p className="text-lg font-medium">{playerInfo.state}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">City</p><p className="text-lg font-medium">{playerInfo.city}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">District</p><p className="text-lg font-medium">{playerInfo.district}</p></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

          {/* Local Opportunities */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
                <CardTitle>Local Opportunities</CardTitle>
                <CardDescription>Events in your state/city posted by selectors</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localOpportunities.map((ev, idx) => (
                    <Card key={idx} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {ev.title}
                          <Badge variant={ev.level === 'National' ? 'default' : ev.level === 'State' ? 'secondary' : 'outline'}>{ev.level}</Badge>
                        </CardTitle>
                        <CardDescription>
                          <span className="inline-flex items-center gap-1 mr-4"><Calendar className="w-4 h-4" />{ev.date}</span>
                          <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{ev.city}, {ev.state}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-foreground">{ev.description}</p>
                        {ev.link && (
                          <a href={ev.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-primary underline">
                            <LinkIcon className="w-4 h-4 mr-1" /> Registration Link
                          </a>
                        )}
            </CardContent>
          </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Achievements */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Highlights at District, State, and National levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentAchievements.map((a, idx) => (
                    <Card key={idx} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span>{a.icon}</span> {a.title}
                          <Badge variant={a.level === 'National' ? 'default' : a.level === 'State' ? 'secondary' : 'outline'}>{a.level}</Badge>
                        </CardTitle>
                        <CardDescription>{a.detail}</CardDescription>
            </CardHeader>
            <CardContent>
                        <Badge variant="secondary">{a.date}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            </CardContent>
          </Card>
        </motion.div>

          {/* Progress Tracker */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
                <CardTitle>Progress Tracker</CardTitle>
                <CardDescription>Recent improvement across key areas</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Batting Technique', value: '+6%' },
                    { label: 'Stamina', value: '+4%' },
                    { label: 'Fielding', value: '+5%' },
                    { label: 'Agility', value: '+7%' },
                  ].map((p) => (
                    <div key={p.label} className="p-4 border rounded-lg flex items-center justify-between">
                      <span className="font-medium">{p.label}</span>
                      <span className="text-green-600">{p.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
  };

  const SelectorDashboard = () => {
    const postedEvents = indiaEvents;
    const applications = [
      { name: 'Rohit Patil', sport: 'Cricket', location: 'Pune, Maharashtra', status: 'Pending' },
      { name: 'Aman Verma', sport: 'Cricket', location: 'Mumbai, Maharashtra', status: 'Reviewed' },
      { name: 'Kiran Shetty', sport: 'Cricket', location: 'Hyderabad, Telangana', status: 'Shortlisted' },
    ];

    return (
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar items={["Profile", "Dashboard", "Events", "Managed Players", "Resources"]} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* Quick Info */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Selector Quick Info</CardTitle>
                <CardDescription>India-first profile snapshot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Name</p><p className="text-lg font-medium">{selectorInfo.name}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Sport</p><p className="text-lg font-medium">{selectorInfo.sport}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">State</p><p className="text-lg font-medium">{selectorInfo.state}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">City</p><p className="text-lg font-medium">{selectorInfo.city}</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Posted Events */}
      <motion.div variants={fadeInUp}>
        <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle>Posted Events</CardTitle>
                  <CardDescription>Events you've posted across India</CardDescription>
                </div>
                <Button size="sm">Post New Event</Button>
          </CardHeader>
          <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {postedEvents.map((ev, idx) => (
                    <Card key={idx} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {ev.title}
                          <Badge variant={ev.level === 'National' ? 'default' : ev.level === 'State' ? 'secondary' : 'outline'}>{ev.level}</Badge>
                        </CardTitle>
                        <CardDescription>
                          <span className="inline-flex items-center gap-1 mr-4"><Calendar className="w-4 h-4" />{ev.date}</span>
                          <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{ev.city}, {ev.state}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-foreground">{ev.description}</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">Upload Event Poster</Button>
                          {ev.link && (
                            <a href={ev.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-primary underline">
                              <LinkIcon className="w-4 h-4 mr-1" /> Registration Link
                            </a>
                          )}
            </div>
          </CardContent>
        </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

          {/* Player Applications */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
                <CardTitle>Player Applications</CardTitle>
                <CardDescription>Manage applications for your events</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player Name</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>{app.sport}</TableCell>
                        <TableCell>{app.location}</TableCell>
                        <TableCell>
                          <Badge variant={app.status === 'Pending' ? 'secondary' : app.status === 'Shortlisted' ? 'default' : 'outline'}>{app.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
  };

  // Dashboard Scout Section (Players can search Players or Coaches/Selectors)
  function DashboardScoutSection() {
    const [role, setRole] = useState<'Player' | 'Coach' | 'Selector'>('Player');
    const [sport, setSport] = useState<string>('Cricket');
    const [state, setState] = useState<string>('Maharashtra');
    const [city, setCity] = useState<string>('');

    const sportsOptions = ['Cricket', 'Football', 'Badminton', 'Hockey', 'Kabaddi', 'Athletics'];
    const states = ['Maharashtra', 'Telangana', 'Delhi', 'Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh', 'Karnataka'];

    const mockResults = [
      { id: 1, photo: '', name: 'Rohit Patil', role: 'Player', sport: 'Cricket', state: 'Maharashtra', city: 'Pune' },
      { id: 2, photo: '', name: 'Coach Priya Sharma', role: 'Coach', sport: 'Athletics', state: 'Karnataka', city: 'Bengaluru' },
      { id: 3, photo: '', name: 'Selector Rahul Mehta', role: 'Selector', sport: 'Kabaddi', state: 'Haryana', city: 'Sonipat' },
      { id: 4, photo: '', name: 'Aman Verma', role: 'Player', sport: 'Cricket', state: 'Maharashtra', city: 'Mumbai' },
    ].filter(r => (role ? r.role === role : true) && (sport ? r.sport === sport : true) && (state ? r.state === state : true) && (city ? r.city.toLowerCase().includes(city.toLowerCase()) : true));

    return (
      <Card>
        <CardHeader>
          <CardTitle>Scout Section</CardTitle>
          <CardDescription>Search Players or Coaches/Selectors across India</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Select value={role} onValueChange={(v: 'Player' | 'Coach' | 'Selector') => setRole(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Player">Player</SelectItem>
                <SelectItem value="Coach">Coach</SelectItem>
                <SelectItem value="Selector">Selector</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger>
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                {sportsOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {states.map(st => <SelectItem key={st} value={st}>{st}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          {/* Results */}
          {mockResults.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">No matches found. Try different filters.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockResults.map(r => (
                <Card key={r.id} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold">
                        {r.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{r.name}</CardTitle>
                        <CardDescription>{r.role} • {r.sport}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" /> {r.city}, {r.state}
                    </div>
                    <Button size="sm">View Profile</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header with Edit Profile */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-xl text-muted-foreground">Welcome back! Here's your overview.</p>
            </div>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg"><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-full p-0 overflow-hidden">
                <div className="sticky top-0 z-10 bg-white border-b px-6 py-4">
                  <DialogHeader className="p-0">
                    <DialogTitle className="text-xl">Edit Profile ({userRole === 'player' ? 'Player' : 'Selector/Coach/Scout'})</DialogTitle>
                  </DialogHeader>
                </div>
                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                  <div className="w-full flex items-center justify-center mb-4">
                    <AvatarGenerator name={profile.fullName || user?.name || 'User'} size={96} />
                  </div>
                  {userRole === 'player' ? (
                    <PlayerEditForm onClose={() => setEditOpen(false)} />
                  ) : (
                    <SelectorEditForm onClose={() => setEditOpen(false)} />
                  )}
                </div>
                <div className="sticky bottom-0 z-10 bg-white border-t px-6 py-4 flex items-center justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                  {/* Save button is handled inside forms; keeping footer for UX consistency */}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Render dashboards based on logged-in role */}
          {userRole === 'player' ? <PlayerDashboard /> : <SelectorDashboard />}

          {/* Scout Section visible for both (esp. for players) */}
          <div className="mt-8">
            <DashboardScoutSection />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;