import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type PlayerProfile = {
  role: 'player';
  fullName: string;
  email?: string;
  phone?: string;
  age?: number;
  sport: string;
  state: string;
  city: string;
  district?: string;
  country?: string;
  club?: string;
  position?: string;
  bio?: string;
  photoUrl?: string;
  performanceLink?: string;
  achievements: Array<{ title: string; description: string }>;
  skills?: Array<{ label: string; value: number }>;
  extra?: Record<string, any>;
};

type SelectorProfile = {
  role: 'coach';
  fullName: string;
  email?: string;
  phone?: string;
  selectorRole: 'Coach' | 'Selector';
  sport: string;
  state: string;
  city: string;
  specialization?: string;
  bio?: string;
  photoUrl?: string;
  credentialsUrl?: string;
  eventLink?: string;
  expertise?: string;
  coachingStyle?: string;
  pastExperience?: string;
  organization?: string;
  extra?: Record<string, any>;
};

type Profile = PlayerProfile | SelectorProfile;

type ProfileContextType = {
  profile: Profile;
  setProfile: (p: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    role: 'player',
    fullName: 'Alex Thompson',
    age: 20,
    sport: 'Cricket',
    state: 'Maharashtra',
    city: 'Pune',
    district: 'Pune',
    bio: 'Opening Batsman • Technique • Consistency',
    photoUrl: undefined,
    performanceLink: '',
    achievements: [
      { title: 'District Champion', description: 'Pune District U-19 Championship' },
      { title: 'State Runner-up', description: 'Maharashtra State U-19 T20' },
    ],
  });

  const value = useMemo(() => ({ profile, setProfile }), [profile]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}


