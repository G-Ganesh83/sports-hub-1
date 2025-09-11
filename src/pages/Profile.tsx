import { useMemo, useEffect, useState } from "react";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

export default function Profile() {
  const { profile, setProfile } = useProfile();
  const { user, updateUser } = useAuth();
  const [dbProfile, setDbProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userType: 'player' | 'coach' = profile.role === 'coach' ? 'coach' : 'player';

  // Fetch profile from database
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/players/me');
        const profileData = response.data;
        setDbProfile(profileData);
        
        // Update local profile context with database data
        setProfile({
          role: profileData.role === 'coach' ? 'coach' : 'player',
          fullName: profileData.fullName || user?.name || '',
          age: profileData.age,
          sport: profileData.sport || 'Cricket',
          state: profileData.extra?.state || '',
          city: profileData.location || '',
          district: profileData.extra?.district || '',
          country: profileData.extra?.country || 'India',
          club: profileData.extra?.club || '',
          bio: profileData.bio,
          photoUrl: profileData.avatarUrl,
          performanceLink: profileData.extra?.performanceLink || '',
          achievements: profileData.achievements ? 
            (typeof profileData.achievements === 'string' ? 
              profileData.achievements.split(',').map(a => {
                const [title, description] = a.split(':');
                return { title: title?.trim() || '', description: description?.trim() || '' };
              }) : []) : [],
          skills: profileData.extra?.skills ? 
            (typeof profileData.extra.skills === 'string' ? 
              JSON.parse(profileData.extra.skills) : profileData.extra.skills) : [],
          selectorRole: profileData.extra?.selectorRole || 'Coach',
          credentialsUrl: profileData.extra?.credentialsUrl || '',
          eventLink: profileData.extra?.eventLink || '',
          expertise: profileData.extra?.expertise || '',
          coachingStyle: profileData.extra?.coachingStyle || '',
          pastExperience: profileData.extra?.pastExperience || '',
          organization: profileData.extra?.organization || '',
        } as any);
        
        // Update user context with avatar
        if (profileData.avatarUrl) {
          updateUser({ avatarUrl: profileData.avatarUrl });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, setProfile, updateUser]);

  const currentUser = useMemo(() => {
    if (userType === 'player') {
      return {
        name: dbProfile?.fullName || profile.fullName,
        walletAddress: '0x0000000000000000000000000000000000000000',
        avatarUrl: dbProfile?.avatarUrl || profile.photoUrl,
        age: dbProfile?.age || (profile as any).age,
        sport: dbProfile?.sport || profile.sport,
        country: dbProfile?.extra?.country || 'India',
        state: dbProfile?.extra?.state || profile.state,
        city: dbProfile?.location || profile.city,
        district: dbProfile?.extra?.district || (profile as any).district,
        club: dbProfile?.extra?.club || (profile as any).club,
        tagline: dbProfile?.bio || profile.bio,
        sportCategory: dbProfile?.sport || profile.sport,
      } as const;
    }
    return {
      name: dbProfile?.fullName || user?.name || profile.fullName,
      walletAddress: '0x0000000000000000000000000000000000000000',
      avatarUrl: dbProfile?.avatarUrl || profile.photoUrl,
      tagline: dbProfile?.bio || profile.bio,
      expertise: dbProfile?.extra?.expertise || (profile as any).expertise,
      organization: dbProfile?.extra?.organization || (profile as any).organization,
    } as const;
  }, [dbProfile, profile, user, userType]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ProfileHeader
          userType={userType}
          name={currentUser.name}
          walletAddress={currentUser.walletAddress}
          avatarUrl={currentUser.avatarUrl}
          age={(currentUser as any).age}
          sport={(currentUser as any).sport}
          country={(currentUser as any).country}
          tagline={(currentUser as any).tagline}
          expertise={(currentUser as any).expertise}
          organization={(currentUser as any).organization}
          sportCategory={(currentUser as any).sportCategory}
        />

        <ProfileTabs userType={userType} profileData={dbProfile} />

        {/* Engagement / Updates */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>{userType === 'player' ? 'Player Updates' : 'Announcements & Updates'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {(userType === 'player' ? [
                  {
                    author: currentUser.name,
                    content: "50-over practice match today, scored 78* with 10 boundaries.",
                    likes: 24,
                    comments: 6,
                    time: "2h"
                  },
                  {
                    author: currentUser.name,
                    content: "Morning nets at the academy—working on back-foot punches and timing.",
                    likes: 18,
                    comments: 3,
                    time: "1d"
                  }
                ] : [
                  {
                    author: currentUser.name,
                    content: "Announcing an open scouting session next weekend. Register via the Events tab.",
                    likes: 12,
                    comments: 4,
                    time: "3h"
                  },
                  {
                    author: currentUser.name,
                    content: "Reviewing recent performance analytics for managed players—great progress!",
                    likes: 9,
                    comments: 2,
                    time: "2d"
                  }
                ]).map((post, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{post.author}</p>
                      <span className="text-xs text-muted-foreground">{post.time} ago</span>
                    </div>
                    <p className="mb-3 text-sm text-foreground">{post.content}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">❤️ {post.likes}</Button>
                      <Button size="sm" variant="outline">💬 {post.comments}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}