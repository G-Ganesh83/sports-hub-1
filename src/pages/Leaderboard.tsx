import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Leaderboard = () => {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const mockPlayers = [
    { rank: 1, name: "Rohit Patil", sport: "Cricket", state: "Maharashtra", city: "Pune", score: 9.8, trend: "up" },
    { rank: 2, name: "Aman Verma", sport: "Cricket", state: "Maharashtra", city: "Mumbai", score: 9.7, trend: "up" },
    { rank: 3, name: "Kiran Shetty", sport: "Cricket", state: "Telangana", city: "Hyderabad", score: 9.6, trend: "same" },
    { rank: 4, name: "Arjun Singh", sport: "Football", state: "Delhi", city: "New Delhi", score: 9.5, trend: "down" },
    { rank: 5, name: "Vikram Iyer", sport: "Hockey", state: "Punjab", city: "Amritsar", score: 9.4, trend: "up" },
    { rank: 6, name: "Nitin Rao", sport: "Kabaddi", state: "Haryana", city: "Sonipat", score: 9.3, trend: "up" },
    { rank: 7, name: "Rahul Das", sport: "Athletics", state: "West Bengal", city: "Kolkata", score: 9.2, trend: "same" },
    { rank: 8, name: "Harsh Gupta", sport: "Cricket", state: "Uttar Pradesh", city: "Lucknow", score: 9.1, trend: "up" },
    { rank: 9, name: "Shivani Kulkarni", sport: "Athletics", state: "Maharashtra", city: "Pune", score: 9.0, trend: "down" },
    { rank: 10, name: "Aisha Khan", sport: "Football", state: "Karnataka", city: "Bengaluru", score: 8.9, trend: "up" }
  ];

  const sports = ['all', 'Cricket', 'Football', 'Kabaddi', 'Athletics', 'Hockey'];
  const states = ['all', 'Maharashtra', 'Telangana', 'Delhi', 'Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh', 'Karnataka'];
  const cities = ['all', 'Pune', 'Mumbai', 'Hyderabad', 'New Delhi', 'Amritsar', 'Sonipat', 'Kolkata', 'Lucknow', 'Bengaluru'];

  const filteredPlayers = mockPlayers.filter(player => {
    const sportMatch = selectedSport === 'all' || player.sport === selectedSport;
    const regionMatch = selectedRegion === 'all' || player.state === selectedRegion || player.city === selectedRegion;
    return sportMatch && regionMatch;
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getTrendSymbol = (trend: string) => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">India Leaderboard</h1>
            <p className="text-xl text-muted-foreground">
              Top athletes ranked within State/City by performance
            </p>
          </div>

          {/* Top 3 Highlight */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPlayers.slice(0, 3).map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${index === 0 ? 'md:order-2 md:-mt-4' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
                >
                  <Card className={`${index === 0 ? 'bg-gradient-primary text-white' : 'bg-card'} ${index === 0 ? 'scale-105' : ''} transition-all duration-300`}>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        {getRankIcon(player.rank)}
                      </div>
                      <h3 className={`text-lg font-bold mb-2 ${index === 0 ? 'text-white' : 'text-foreground'}`}>
                        {player.name}
                      </h3>
                      <p className={`text-sm mb-2 ${index === 0 ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {player.sport} • {player.country}
                      </p>
                      <div className={`text-2xl font-bold ${index === 0 ? 'text-white' : 'text-primary'}`}>
                        {player.score}/10
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Filter by sport and State/City in India</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search athletes..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Sport</Button>
                    <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> State/City</Button>
                  </div>
                </div>
                
                {/* Sport Filter */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {sports.map((sport) => (
                    <Button
                      key={sport}
                      variant={selectedSport === sport ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSport(sport)}
                    >
                      {sport === 'all' ? 'All Sports' : sport}
                    </Button>
                  ))}
                </div>
                {/* State/City Filter */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[...states, ...cities].map((region) => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region === 'all' ? 'All India' : region}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Full Leaderboard Table */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Complete Rankings</CardTitle>
                <CardDescription>Full leaderboard of all athletes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Athlete</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Performance Score</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlayers.map((player, index) => (
                      <motion.tr
                        key={player.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{player.name}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{player.sport}</Badge>
                        </TableCell>
                        <TableCell>{player.country}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">{player.score}/10</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getTrendColor(player.trend)}`}>
                            {getTrendSymbol(player.trend)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Leaderboard;