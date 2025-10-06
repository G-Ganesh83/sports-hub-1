import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <Layout>
      <Hero />
      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{title:'Create your profile',desc:'Set up your Player/Selector profile with details'}, {title:'Upload skills & achievements',desc:'Showcase videos, stats, and achievements'}, {title:'Get scouted for opportunities',desc:'Connect with selectors and join events'}].map((s, idx) => (
              <Card key={idx} className="text-center">
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sports */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Sports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Cricket','Football','Badminton','Hockey','Athletics','Kabaddi'].map((sport) => (
              <Card key={sport} className="text-center">
                <CardHeader>
                  <CardTitle>{sport}</CardTitle>
                  <CardDescription>Opportunities and scouting for {sport}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Upcoming Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{title:'Pune District Trials',date:'2024-02-05',loc:'Pune, Maharashtra'},{title:'Maharashtra State Showcase',date:'2024-03-12',loc:'Mumbai, Maharashtra'},{title:'National Talent Hunt',date:'2024-04-10',loc:'New Delhi, Delhi'}].map((ev, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{ev.title}</CardTitle>
                  <CardDescription>
                    <span className="inline-flex items-center gap-1 mr-4"><Calendar className="w-4 h-4" />{ev.date}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{ev.loc}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rahul • Maharashtra</CardTitle>
                <CardDescription>“Got scouted by a top coach via SportsHub India.”</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Coach Meera • Karnataka</CardTitle>
                <CardDescription>“Discovered hidden talents from small towns.”</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Be the next sports star. Start your journey today.</h2>
          {isAuthenticated ? (
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          ) : (
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg" onClick={() => navigate('/auth')}>Get Started</Button>
          )}
          <p className="mt-3 text-white/80 text-sm">Use your browser back button to return here anytime.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
