
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FilePenLine, CheckCircle, Clock, BarChart2, ShieldAlert } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';

// Mock data for demonstration
const mockStats = {
  totalReports: 156,
  solvedCases: 87,
  underInvestigation: 62,
  criticalCases: 7
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    // In a real app, this would fetch data from your blockchain/backend
    console.log("Dashboard mounted for user:", user?.pseudonym);
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-safespeak-dark">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.pseudonym}</h1>
            <p className="text-white/70">Your anonymous dashboard for crime reporting and tracking.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Total Reports" 
              value={stats.totalReports.toString()} 
              icon={FilePenLine} 
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title="Cases Solved" 
              value={stats.solvedCases.toString()} 
              icon={CheckCircle} 
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard 
              title="Under Investigation" 
              value={stats.underInvestigation.toString()} 
              icon={Clock} 
              trend={{ value: 3, isPositive: false }}
            />
            <StatCard 
              title="Critical Cases" 
              value={stats.criticalCases.toString()} 
              icon={ShieldAlert} 
              trend={{ value: 5, isPositive: false }}
            />
          </div>
          
          {/* Case Resolution Progress */}
          <motion.div 
            className="glass-card rounded-2xl p-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Case Resolution Progress</h3>
              <Button variant="outline" size="sm" className="text-xs">
                <BarChart2 className="h-4 w-4 mr-1" /> View Detailed Stats
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Cases Solved</div>
                  <div className="text-sm text-white/70">{Math.round(stats.solvedCases / stats.totalReports * 100)}%</div>
                </div>
                <Progress value={Math.round(stats.solvedCases / stats.totalReports * 100)} className="h-2 bg-white/10" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Under Investigation</div>
                  <div className="text-sm text-white/70">{Math.round(stats.underInvestigation / stats.totalReports * 100)}%</div>
                </div>
                <Progress value={Math.round(stats.underInvestigation / stats.totalReports * 100)} className="h-2 bg-white/10" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Critical Cases</div>
                  <div className="text-sm text-white/70">{Math.round(stats.criticalCases / stats.totalReports * 100)}%</div>
                </div>
                <Progress value={Math.round(stats.criticalCases / stats.totalReports * 100)} className="h-2 bg-white/10" />
              </div>
            </div>
          </motion.div>
          
          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="glass-card rounded-2xl p-6 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-safespeak-blue/15 p-4 rounded-full mb-4">
                <FilePenLine className="h-8 w-8 text-safespeak-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Report a Crime</h3>
              <p className="text-white/70 text-sm mb-4">Submit a new anonymous crime report securely.</p>
              <Link to="/report" className="btn-primary w-full">Report Now</Link>
            </motion.div>
            
            <motion.div 
              className="glass-card rounded-2xl p-6 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-safespeak-green/15 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-safespeak-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track a Report</h3>
              <p className="text-white/70 text-sm mb-4">Check the status of your previously submitted report.</p>
              <Link to="/track" className="btn-secondary w-full">Track Report</Link>
            </motion.div>
            
            <motion.div 
              className="glass-card rounded-2xl p-6 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-purple-500/15 p-4 rounded-full mb-4">
                <ShieldAlert className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Give Feedback</h3>
              <p className="text-white/70 text-sm mb-4">Share your experience with SafeSpeak.</p>
              <Link to="/feedback" className="btn-ghost w-full">Provide Feedback</Link>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
