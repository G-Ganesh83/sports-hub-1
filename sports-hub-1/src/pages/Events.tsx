import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Link as LinkIcon, MapPin, Upload } from 'lucide-react';
import { useState } from 'react';

type EventItem = { title: string; sport: string; level: 'District' | 'State' | 'National'; date: string; city: string; state: string; link?: string; };

const Events = () => {
  const [filters, setFilters] = useState<{ state: string; city: string; sport: string }>({ state: 'Maharashtra', city: 'Pune', sport: 'Cricket' });
  const [events, setEvents] = useState<EventItem[]>([
    { title: 'Pune District Trials', sport: 'Cricket', level: 'District', date: '2024-02-05', city: 'Pune', state: 'Maharashtra', link: 'https://forms.gle/district' },
    { title: 'Maharashtra State Showcase', sport: 'Cricket', level: 'State', date: '2024-03-12', city: 'Mumbai', state: 'Maharashtra', link: 'https://forms.gle/state' },
    { title: 'National Talent Hunt', sport: 'Cricket', level: 'National', date: '2024-04-10', city: 'New Delhi', state: 'Delhi' },
  ]);

  const filtered = events.filter(e => (filters.state ? e.state === filters.state : true) && (filters.city ? e.city === filters.city : true) && (filters.sport ? e.sport === filters.sport : true));

  function postEvent() {
    setEvents([{ title: 'Hyderabad District Selection', sport: filters.sport || 'Cricket', level: 'District', date: '2024-04-20', city: 'Hyderabad', state: 'Telangana', link: 'https://forms.gle/newcamp' }, ...events]);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Posting Form */}
        <Card className="mb-8">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle>Post New Event</CardTitle>
              <CardDescription>District / State / National events across India</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Event Name" />
              <Select value={filters.sport} onValueChange={(v) => setFilters({ ...filters, sport: v })}>
                <SelectTrigger><SelectValue placeholder="Sport" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Kabaddi">Kabaddi</SelectItem>
                  <SelectItem value="Athletics">Athletics</SelectItem>
                  <SelectItem value="Hockey">Hockey</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="City" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
                <Input placeholder="State" value={filters.state} onChange={(e) => setFilters({ ...filters, state: e.target.value })} />
              </div>
              <Input type="date" placeholder="Date" />
              <Input placeholder="Registration Link (optional)" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline"><Upload className="w-4 h-4 mr-2" /> Upload Poster</Button>
              <Button onClick={postEvent}>Publish Event</Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Events</CardTitle>
            <CardDescription>Filter by sport and location</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filters.sport} onValueChange={(v) => setFilters({ ...filters, sport: v })}>
              <SelectTrigger><SelectValue placeholder="Sport" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Kabaddi">Kabaddi</SelectItem>
                <SelectItem value="Athletics">Athletics</SelectItem>
                <SelectItem value="Hockey">Hockey</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="City" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
            <Input placeholder="State" value={filters.state} onChange={(e) => setFilters({ ...filters, state: e.target.value })} />
            <Button variant="outline" onClick={() => setFilters({ state: '', city: '', sport: '' })}>Reset</Button>
          </CardContent>
        </Card>

        {/* Events Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ev, idx) => (
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
                <p className="text-sm text-foreground">Sport: {ev.sport}</p>
                {ev.link && (
                  <a href={ev.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-primary underline">
                    <LinkIcon className="w-4 h-4 mr-1" /> Registration Link
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;


