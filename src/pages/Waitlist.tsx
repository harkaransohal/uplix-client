import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Calendar, User, MapPin, Download } from "lucide-react";

// Mock data for waitlist entries
const mockWaitlistEntries = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    joinedDate: "2024-01-15",
    position: 1,
    location: "San Francisco, CA",
    interests: ["React", "TypeScript", "AI/ML"],
    referralSource: "Twitter"
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    joinedDate: "2024-01-14",
    position: 2,
    location: "New York, NY",
    interests: ["Python", "Data Science", "Backend"],
    referralSource: "Product Hunt"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    joinedDate: "2024-01-14",
    position: 3,
    location: "Austin, TX",
    interests: ["Vue.js", "Node.js", "DevOps"],
    referralSource: "Friend Referral"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    joinedDate: "2024-01-13",
    position: 4,
    location: "Seattle, WA",
    interests: ["React Native", "Mobile Dev", "UI/UX"],
    referralSource: "LinkedIn"
  },
  {
    id: 5,
    name: "David Kim",
    email: "david.kim@email.com",
    joinedDate: "2024-01-12",
    position: 5,
    location: "Los Angeles, CA",
    interests: ["Java", "Spring Boot", "Microservices"],
    referralSource: "Google Search"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    joinedDate: "2024-01-11",
    position: 6,
    location: "Chicago, IL",
    interests: ["JavaScript", "Full Stack", "GraphQL"],
    referralSource: "Hacker News"
  }
];

const getPositionColor = (position: number) => {
  if (position <= 3) return "text-green-600 bg-green-50 border-green-200";
  if (position <= 10) return "text-blue-600 bg-blue-50 border-blue-200";
  if (position <= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
};

const getReferralColor = (source: string) => {
  const colors = {
    "Twitter": "bg-blue-100 text-blue-800",
    "Product Hunt": "bg-orange-100 text-orange-800",
    "Friend Referral": "bg-green-100 text-green-800",
    "LinkedIn": "bg-indigo-100 text-indigo-800",
    "Google Search": "bg-purple-100 text-purple-800",
    "Hacker News": "bg-red-100 text-red-800"
  };
  return colors[source as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const Waitlist = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Uplix
            </motion.div>
            <div className="text-muted-foreground font-medium">
              Waitlist Management
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Waitlist Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage and track all users who have joined your product waitlist
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{mockWaitlistEntries.length}</div>
              <div className="text-sm text-muted-foreground">Total Signups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3.2%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Waitlist Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {mockWaitlistEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center gap-2">
                        <User className="w-5 h-5 text-muted-foreground" />
                        {entry.name}
                      </CardTitle>
                      <CardDescription className="text-sm flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {entry.email}
                      </CardDescription>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-sm font-semibold border ${getPositionColor(entry.position)}`}>
                      #{entry.position}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Location and Date */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{entry.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {entry.joinedDate}</span>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Referral Source */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Source:</p>
                    <Badge className={`text-xs ${getReferralColor(entry.referralSource)}`}>
                      {entry.referralSource}
                    </Badge>
                  </div>

                  {/* Contact Button */}
                  <Button 
                    className="w-full mt-4 group"
                    variant="outline"
                  >
                    <span>Contact User</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="btn-primary rounded-full px-8 py-3 text-lg font-semibold mr-4"
          >
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 py-3 text-lg"
          >
            Send Update Email
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Waitlist;