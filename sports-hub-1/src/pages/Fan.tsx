import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Heart, Star, Trophy, Coins, Gift, Zap, Users, TrendingUp } from 'lucide-react';

const Fan = () => {
  const [selectedTab, setSelectedTab] = useState<'support' | 'collectibles' | 'tokens'>('support');

  const featuredPlayers = [
    {
      id: 1,
      name: "Alex Rodriguez",
      sport: "Basketball",
      image: "/placeholder.svg",
      supporters: 1247,
      sponsorshipGoal: 5000,
      currentSponsorship: 3200,
      tier: "Rising Star"
    },
    {
      id: 2,
      name: "Emma Chen",
      sport: "Tennis",
      image: "/placeholder.svg",
      supporters: 892,
      sponsorshipGoal: 3000,
      currentSponsorship: 2100,
      tier: "Elite"
    },
    {
      id: 3,
      name: "Marcus Johnson",
      sport: "Soccer",
      image: "/placeholder.svg",
      supporters: 2156,
      sponsorshipGoal: 8000,
      currentSponsorship: 6400,
      tier: "Champion"
    }
  ];

  const collectibles = [
    {
      id: 1,
      name: "Championship Moment #001",
      player: "Alex Rodriguez",
      rarity: "Legendary",
      price: "0.5 ETH",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Perfect Game #045",
      player: "Emma Chen",
      rarity: "Epic",
      price: "0.2 ETH",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Goal of the Century #012",
      player: "Marcus Johnson",
      rarity: "Rare",
      price: "0.1 ETH",
      image: "/placeholder.svg"
    }
  ];

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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-yellow-100 text-yellow-800';
      case 'Epic': return 'bg-purple-100 text-purple-800';
      case 'Rare': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Fan Engagement Hub</h1>
            <p className="text-xl text-muted-foreground">
              Support your favorite athletes and collect exclusive moments
            </p>
          </div>

          {/* Fan Token Balance */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Your Fan Token Balance</h3>
                    <div className="flex items-center gap-2">
                      <Coins className="h-8 w-8" />
                      <span className="text-3xl font-bold">1,250 FAN</span>
                    </div>
                    <p className="text-white/80 mt-2">Earn tokens by supporting athletes and participating in the community</p>
                  </div>
                  <div className="text-right">
                    <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                      Buy Tokens
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex justify-center gap-2">
              <Button
                variant={selectedTab === 'support' ? 'default' : 'outline'}
                onClick={() => setSelectedTab('support')}
              >
                <Heart className="h-4 w-4 mr-2" />
                Support Athletes
              </Button>
              <Button
                variant={selectedTab === 'collectibles' ? 'default' : 'outline'}
                onClick={() => setSelectedTab('collectibles')}
              >
                <Star className="h-4 w-4 mr-2" />
                Collectibles
              </Button>
              <Button
                variant={selectedTab === 'tokens' ? 'default' : 'outline'}
                onClick={() => setSelectedTab('tokens')}
              >
                <Coins className="h-4 w-4 mr-2" />
                Token Economy
              </Button>
            </div>
          </motion.div>

          {/* Support Athletes Tab */}
          {selectedTab === 'support' && (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl font-bold mb-6">Featured Athletes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPlayers.map((player, index) => (
                    <motion.div key={player.id} variants={fadeInUp}>
                      <Card className="h-full hover:shadow-medium transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{player.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{player.sport}</p>
                              <Badge className={getRarityColor(player.tier)}>{player.tier}</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Sponsorship Progress</span>
                              <span>{Math.round((player.currentSponsorship / player.sponsorshipGoal) * 100)}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(player.currentSponsorship / player.sponsorshipGoal) * 100}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>${player.currentSponsorship.toLocaleString()}</span>
                              <span>${player.sponsorshipGoal.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{player.supporters.toLocaleString()} supporters</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-green-600">+12% this week</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 bg-gradient-primary text-white">
                              <Heart className="h-4 w-4 mr-2" />
                              Support ($10)
                            </Button>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Micro-Sponsorship Info */}
              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>How Micro-Sponsorship Works</CardTitle>
                    <CardDescription>Support athletes with small contributions that make a big difference</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Coins className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Choose Amount</h4>
                        <p className="text-sm text-muted-foreground">Support with as little as $5 per month</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Track Progress</h4>
                        <p className="text-sm text-muted-foreground">See how your support helps athletes achieve their goals</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Gift className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Get Rewards</h4>
                        <p className="text-sm text-muted-foreground">Earn fan tokens and exclusive collectibles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Collectibles Tab */}
          {selectedTab === 'collectibles' && (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl font-bold mb-6">Exclusive Sports Collectibles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collectibles.map((item, index) => (
                    <motion.div key={item.id} variants={fadeInUp}>
                      <Card className="h-full hover:shadow-medium transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="aspect-square bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                            <Trophy className="h-16 w-16 text-white" />
                          </div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">by {item.player}</p>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                            <span className="font-bold text-primary">{item.price}</span>
                          </div>

                          <Button className="w-full bg-gradient-primary text-white">
                            <Zap className="h-4 w-4 mr-2" />
                            Mint NFT
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Your Collection */}
              <motion.div variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Collection</CardTitle>
                    <CardDescription>Sports moments and achievements you've collected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Start Your Collection</h3>
                      <p className="text-muted-foreground mb-4">Collect exclusive sports moments and build your fan portfolio</p>
                      <Button>Browse Collectibles</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Token Economy Tab */}
          {selectedTab === 'tokens' && (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeInUp}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Earn Fan Tokens</CardTitle>
                      <CardDescription>Ways to earn tokens in the SportsHub India ecosystem</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: "Support an athlete", reward: "10 FAN", icon: Heart },
                          { action: "Share athlete content", reward: "5 FAN", icon: Users },
                          { action: "Mint a collectible", reward: "25 FAN", icon: Star },
                          { action: "Refer a friend", reward: "50 FAN", icon: Gift }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5 text-primary" />
                              <span>{item.action}</span>
                            </div>
                            <Badge variant="secondary">+{item.reward}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Spend Fan Tokens</CardTitle>
                      <CardDescription>Use your tokens for exclusive benefits</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { benefit: "Exclusive athlete content", cost: "100 FAN", icon: Star },
                          { benefit: "Premium collectibles", cost: "250 FAN", icon: Trophy },
                          { benefit: "Early access to drops", cost: "500 FAN", icon: Zap },
                          { benefit: "Meet & greet events", cost: "1000 FAN", icon: Users }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5 text-primary" />
                              <span>{item.benefit}</span>
                            </div>
                            <Badge variant="outline">{item.cost}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-gradient-primary text-white">
                  <CardContent className="p-8 text-center">
                    <Coins className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Token Staking Coming Soon</h3>
                    <p className="text-white/80 mb-6">
                      Stake your FAN tokens to earn additional rewards and unlock premium features
                    </p>
                    <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                      Join Waitlist
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Fan;