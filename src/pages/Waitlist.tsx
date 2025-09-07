import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { ArrowRight, Mail, Calendar, User } from "lucide-react"

interface WaitlistEntry {
  id: string
  email_address: string
  created_at: string
  position: number
}

const getPositionColor = (position: number) => {
  if (position <= 3) return "text-green-600 bg-green-50 border-green-200"
  if (position <= 10) return "text-blue-600 bg-blue-50 border-blue-200"
  if (position <= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200"
  return "text-gray-600 bg-gray-50 border-gray-200"
}

const Waitlist = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_WAITLIST_URL}/hackathon/waitlist`)
        setTotalCount(data.total_count)
        setWaitlistEntries(data?.data || [])
      } catch (error) {
        console.error("Error fetching waitlist:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWaitlist()
  }, [])

  console.log(totalCount)

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading waitlist...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div className="text-2xl font-bold gradient-text" whileHover={{ scale: 1.05 }}>
            Uplix
          </motion.div>
          <div className="text-muted-foreground font-medium">Waitlist Management</div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-12">
        {/* Stats */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Waitlist Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage and track all users who have joined your product waitlist
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalCount}</div>
              <div className="text-sm text-muted-foreground">Total Signups</div>
            </div>
          </div>
        </div>

        {/* Waitlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {waitlistEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-lg transition-all duration-300 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardDescription className="flex items-center gap-1 text-base font-medium">
                      <Mail className="w-4 h-4" />
                      {entry.email_address}
                    </CardDescription>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-sm font-semibold border ${getPositionColor(entry.position)}`}>
                    #{entry.position}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(entry.created_at).toLocaleDateString()}
                </div>
                <Button className="w-full mt-4 group" variant="outline">
                  <span>Contact User</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Waitlist
