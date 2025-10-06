import { useMemo, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search, MapPin, Trophy, User, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Scout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'players' | 'selectors'>('players');
  const [sport, setSport] = useState<string>('Cricket');
  const [state, setState] = useState<string>('Maharashtra');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const sports = ['Cricket', 'Football', 'Kabaddi', 'Athletics', 'Hockey'];
  const states = ['Maharashtra', 'Telangana', 'Delhi', 'Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh', 'Karnataka'];

  // Mock India-focused data
  const mockPlayers = [
    { id: 1, name: 'Rohit Patil', sport: 'Cricket', state: 'Maharashtra', city: 'Pune', district: 'Pune', level: 'District' as const },
    { id: 2, name: 'Aman Verma', sport: 'Cricket', state: 'Maharashtra', city: 'Mumbai', district: 'Mumbai Suburban', level: 'State' as const },
    { id: 3, name: 'Kiran Shetty', sport: 'Cricket', state: 'Telangana', city: 'Hyderabad', district: 'Hyderabad', level: 'National' as const },
    { id: 4, name: 'Arjun Singh', sport: 'Football', state: 'Delhi', city: 'New Delhi', district: 'New Delhi', level: 'State' as const },
  ];

  const mockSelectors = [
    { id: 101, name: 'Coach Michael Rodriguez', role: 'Selector' as const, expertise: 'Scouting • Player Development', sport: 'Cricket', state: 'Maharashtra', city: 'Mumbai' },
    { id: 102, name: 'Coach Priya Sharma', role: 'Coach' as const, expertise: 'Athletics', sport: 'Athletics', state: 'Karnataka', city: 'Bengaluru' },
    { id: 103, name: 'Selector Rahul Mehta', role: 'Selector' as const, expertise: 'Kabaddi', sport: 'Kabaddi', state: 'Haryana', city: 'Sonipat' },
  ];

  const filteredPlayers = useMemo(() => {
    return mockPlayers.filter(p =>
      (searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
      (sport ? p.sport === sport : true) &&
      (state ? p.state === state : true) &&
      (city ? p.city.toLowerCase().includes(city.toLowerCase()) : true) &&
      (district ? p.district.toLowerCase().includes(district.toLowerCase()) : true)
    );
  }, [searchQuery, sport, state, city, district]);

  const filteredSelectors = useMemo(() => {
    return mockSelectors.filter(s =>
      (searchQuery ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
      (sport ? s.sport === sport : true) &&
      (state ? s.state === state : true) &&
      (city ? s.city.toLowerCase().includes(city.toLowerCase()) : true)
    );
  }, [searchQuery, sport, state, city]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const Results = () => {
    const isPlayers = searchType === 'players';
    const data = isPlayers ? filteredPlayers : filteredSelectors;

    if (data.length === 0) {
      return (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">No matches found. Try adjusting filters.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isPlayers
          ? data.map((p: typeof filteredPlayers[number]) => (
              <Card key={p.id} className="h-full hover:shadow-medium transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{p.sport}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {p.district}, {p.city}, {p.state}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={p.level === 'National' ? 'default' : p.level === 'State' ? 'secondary' : 'outline'}>
                      {p.level}
                    </Badge>
                    <Button size="sm">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          : data.map((s: typeof filteredSelectors[number]) => (
              <Card key={s.id} className="h-full hover:shadow-medium transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{s.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{s.expertise} • {s.sport}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {s.city}, {s.state}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={s.role === 'Selector' ? 'default' : 'secondary'}>
                      {s.role}
                    </Badge>
                    <Button size="sm">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Scout & Discover</h1>
            <p className="text-xl text-muted-foreground">Find Indian athletes and selectors with powerful filters</p>
          </div>

          {/* Search & Filters */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
                <CardDescription>Search by type, sport, and location (State/City/District)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div>
                    <Select value={searchType} onValueChange={(v: 'players' | 'selectors') => setSearchType(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Search Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="players"><div className="flex items-center gap-2"><User className="w-4 h-4" /> Players</div></SelectItem>
                        <SelectItem value="selectors"><div className="flex items-center gap-2"><Users className="w-4 h-4" /> Coaches/Selectors</div></SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={sport} onValueChange={setSport}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {sports.map(sp => (
                          <SelectItem key={sp} value={sp}>{sp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(st => (
                          <SelectItem key={st} value={st}>{st}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                  <Input placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div variants={fadeInUp}>
            <Results />
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Scout;