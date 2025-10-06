import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Upload, Play, FileText, Link as LinkIcon, Calendar, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface ProfileTabsProps {
  userType: "player" | "coach";
}

type SelectorEvent = { title: string; level: 'District' | 'State' | 'National'; date: string; city: string; state: string; description: string; link?: string };

const playerTabs = [
  { value: "overview", label: "Overview" },
  { value: "achievements", label: "Achievements" },
  { value: "media", label: "Media" },
  { value: "training", label: "Training Logs" },
  { value: "sponsorships", label: "Sponsorships" }
];

const selectorTabs = [
  { value: "overview", label: "Overview" },
  { value: "events", label: "Events" },
  { value: "players", label: "Managed Players" },
  { value: "feedback", label: "Feedback" },
  { value: "resources", label: "Resources" }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const ProfileTabs = ({ userType, profileData }: ProfileTabsProps & { profileData?: any }) => {
  const tabs = userType === "player" ? playerTabs : selectorTabs;
  const [events, setEvents] = useState<Array<SelectorEvent>>([
    { title: "Pune District Trials", level: 'District', date: "2024-02-05", city: "Pune", state: "Maharashtra", description: "Open trials for U-19 cricket talents." },
    { title: "Maharashtra State Showcase", level: 'State', date: "2024-03-12", city: "Mumbai", state: "Maharashtra", description: "State-level showcase for top performers.", link: "https://forms.gle/sample" },
    { title: "National Talent Hunt", level: 'National', date: "2024-04-10", city: "New Delhi", state: "Delhi", description: "Nationwide selection for elite prospects." },
  ]);

  function handleAddEvent() {
    setEvents([{ title: "Hyderabad District Selection", level: 'District', date: "2024-04-20", city: "Hyderabad", state: "Telangana", description: "District trials for U-17 and U-19.", link: "https://forms.gle/newcamp" }, ...events]);
  }

  return (
    <motion.div {...fadeInUp}>
      <Tabs defaultValue={tabs[0].value} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {userType === "player" ? (
          <>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Player Overview</CardTitle>
                  <CardDescription>Basic information about the player</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Sport</p>
                      <p className="text-lg">{profileData?.sport || 'Cricket'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p className="text-lg">{profileData?.age ? `${profileData.age} years` : '20 years'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Country</p>
                      <p className="text-lg">{profileData?.country || profileData?.extra?.country || 'India'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">State</p>
                      <p className="text-lg">{profileData?.state || profileData?.extra?.state || 'Maharashtra'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">District</p>
                      <p className="text-lg">{profileData?.district || profileData?.extra?.district || 'Pune'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">City</p>
                      <p className="text-lg">{profileData?.city || profileData?.location || 'Pune'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">Local Club / Academy</p>
                      <p className="text-lg">{profileData?.club || profileData?.extra?.club || 'Warriors Cricket Academy'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Bio</p>
                    <p className="text-foreground leading-relaxed">
                      {profileData?.bio || 'Opening batsman with a strong technique and consistent performances in district and state-level tournaments.'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Skills</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(profileData?.skills || profileData?.extra?.skills ? 
                        (typeof profileData?.skills === 'string' ? JSON.parse(profileData.skills) : 
                         typeof profileData?.extra?.skills === 'string' ? JSON.parse(profileData.extra.skills) : 
                         profileData?.skills || profileData?.extra?.skills || []) : 
                        [{ label: "Batting Technique", value: 90 }, { label: "Stamina", value: 88 }, { label: "Fielding", value: 85 }, { label: "Agility", value: 92 }]
                      ).map((skill) => (
                        <div key={skill.label} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground font-medium">{skill.label}</span>
                            <span className="text-muted-foreground">{skill.value}%</span>
                          </div>
                          <Progress value={skill.value} className="h-2 bg-gradient-subtle/20">
                          </Progress>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "District Champion", level: "District", description: "Pune District U-19 Championship", date: "2023" },
                  { title: "State Runner-up", level: "State", description: "Maharashtra State U-19 T20", date: "2023" },
                  { title: "National Trials Participant", level: "National", description: "BCCI U-19 Trials", date: "2024" },
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {achievement.title}
                          <Badge variant={achievement.level === 'National' ? 'default' : achievement.level === 'State' ? 'secondary' : 'outline'}>
                            {achievement.level}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="secondary">{achievement.date}</Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media Gallery</CardTitle>
                  <CardDescription>Upload and manage your sports media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">Upload Videos & Photos</p>
                    <p className="text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
                    <Button>Choose Files</Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Play className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Logs</CardTitle>
                  <CardDescription>Track your training activities and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Performance Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { date: "2024-01-15", activity: "Batting Nets", duration: "2h 00m", score: "8.5/10" },
                        { date: "2024-01-12", activity: "Strength Training", duration: "1h 30m", score: "9.0/10" },
                        { date: "2024-01-10", activity: "Fielding Drills", duration: "1h 15m", score: "8.2/10" },
                        { date: "2024-01-08", activity: "Cardio & Agility", duration: "1h 00m", score: "8.0/10" }
                      ].map((log, index) => (
                        <TableRow key={index}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.activity}</TableCell>
                          <TableCell>{log.duration}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{log.score}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sponsorships" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sponsorship Opportunities</CardTitle>
                  <CardDescription>Connect with brands and sponsors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="bg-gradient-primary text-white rounded-lg p-6 max-w-md mx-auto">
                      <h3 className="text-xl font-bold mb-2">🚀 Micro-Sponsorship Available</h3>
                      <p className="mb-4">Get sponsored by brands that believe in your potential</p>
                      <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                        Apply for Sponsorship
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        ) : (
          <>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selector Overview</CardTitle>
                  <CardDescription>Expertise, coaching style, and past experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Expertise</p>
                      <p className="text-lg">{profileData?.expertise || profileData?.extra?.expertise || 'Scouting, Player Development'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Coaching Style</p>
                      <p className="text-lg">{profileData?.coachingStyle || profileData?.extra?.coachingStyle || 'Analytical, Development-Focused'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Past Experience</p>
                      <p className="text-lg">{profileData?.pastExperience || profileData?.extra?.pastExperience || '10+ years, Collegiate and Semi-Pro'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Organization</p>
                      <p className="text-lg">{profileData?.organization || profileData?.extra?.organization || 'NextGen Sports'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Bio</p>
                    <p className="text-foreground leading-relaxed">
                      {profileData?.bio || 'Selector and coach with a decade of experience building strong programs and identifying high-potential athletes. Passionate about data-driven scouting and holistic player development.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle>Events (India)</CardTitle>
                    <CardDescription>Post district, state, or national events</CardDescription>
                  </div>
                  <Button size="sm" onClick={handleAddEvent}>Post New Event</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((ev, idx) => (
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
                            <Button size="sm" variant="outline"><Upload className="w-4 h-4 mr-1" /> Upload Event Poster</Button>
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
            </TabsContent>

            <TabsContent value="players" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Managed Players</CardTitle>
                  <CardDescription>Athletes under your guidance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player Name</TableHead>
                        <TableHead>Sport</TableHead>
                        <TableHead>Performance Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "Alex Johnson", sport: "Basketball", score: "8.5/10", status: "Active" },
                        { name: "Maria Garcia", sport: "Basketball", score: "9.2/10", status: "Injured" },
                        { name: "David Chen", sport: "Basketball", score: "7.8/10", status: "Training" },
                        { name: "Sarah Williams", sport: "Basketball", score: "8.9/10", status: "Active" }
                      ].map((player, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{player.name}</TableCell>
                          <TableCell>{player.sport}</TableCell>
                          <TableCell><Badge variant="secondary">{player.score}</Badge></TableCell>
                          <TableCell>
                            <Badge variant={player.status === 'Active' ? 'default' : 'outline'}>{player.status}</Badge>
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
            </TabsContent>

            <TabsContent value="feedback" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>Feedback from athletes and partners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { author: "Alex Johnson", text: "Great communication and transparent feedback throughout the season.", rating: "5/5" },
                      { author: "Maria Garcia", text: "Helped me find the right showcase opportunities.", rating: "4.8/5" }
                    ].map((review, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{review.author}</h4>
                          <Badge>{review.rating}</Badge>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Upload and manage training materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="font-medium mb-1">Upload Training Documents</p>
                    <p className="text-sm text-muted-foreground mb-3">PDFs, videos, and other training materials</p>
                    <Button size="sm">Upload Files</Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Scouting Checklist.pdf",
                      "Player Development Drills.mp4",
                      "Season Planning Template.xlsx"
                    ].map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </motion.div>
  );
};