import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  userType: "player" | "coach";
  name: string;
  avatarUrl?: string;
  age?: number;
  sport?: string;
  country?: string;
  tagline?: string;
  expertise?: string;
  organization?: string;
  sportCategory?: string;
}

export const ProfileHeader = ({ userType, name, avatarUrl, age, sport, country, tagline, expertise, organization, sportCategory }: ProfileHeaderProps) => {
  const isSelector = userType === "coach";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 shadow-soft mb-6"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-2">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 ring-4 ring-white shadow-medium">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="text-2xl font-bold">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{name}</h1>
              {tagline && (
                <p className="text-sm text-muted-foreground mt-1">{tagline}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                {isSelector ? (
                  <>
                    {expertise && <Badge variant="secondary">{expertise}</Badge>}
                    {organization && <Badge variant="outline">{organization}</Badge>}
                    <Badge className="bg-gradient-primary text-white">🎯 Selector / Coach</Badge>
                  </>
                ) : (
                  <>
                    {sportCategory && <Badge variant="secondary">{sportCategory}</Badge>}
                    {sport && <Badge variant="outline">{sport}</Badge>}
                    {typeof age === 'number' && <Badge variant="outline">Age: {age}</Badge>}
                    {country && <Badge variant="outline">{country}</Badge>}
                    <Badge className="bg-gradient-primary text-white">🏃‍♂️ Player</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="mt-3 flex md:justify-end gap-2">
              {isSelector ? (
                <>
                  <Button variant="hero" size="sm">Message</Button>
                  <Button variant="outline" size="sm">Connect</Button>
                </>
              ) : (
                <>
                  <Button variant="hero" size="sm">Connect</Button>
                  <Button variant="outline" size="sm">Follow</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};