
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, User, FileText, CheckCircle, AlertTriangle, 
  Clock, Search, Filter, Download, BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';

// Mock data for demonstration
const mockReports = [
  {
    id: 'SS-123456',
    type: 'Theft',
    location: 'Downtown, City Center',
    date: '2025-04-01',
    status: 'under-investigation',
    priority: 'medium'
  },
  {
    id: 'SS-234567',
    type: 'Fraud',
    location: 'Online',
    date: '2025-04-02',
    status: 'solved',
    priority: 'high'
  },
  {
    id: 'SS-345678',
    type: 'Assault',
    location: 'Riverside Park',
    date: '2025-04-03',
    status: 'pending',
    priority: 'low'
  },
  {
    id: 'SS-456789',
    type: 'Vandalism',
    location: 'Main Street',
    date: '2025-04-04',
    status: 'critical',
    priority: 'urgent'
  },
  {
    id: 'SS-567890',
    type: 'Cybercrime',
    location: 'Online',
    date: '2025-04-05',
    status: 'pending',
    priority: 'medium'
  }
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState(mockReports);
  
  // Filter reports based on search query
  const filteredReports = reports.filter(report => 
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalReports = reports.length;
  const solvedReports = reports.filter(r => r.status === 'solved').length;
  const criticalReports = reports.filter(r => r.status === 'critical').length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="h-4 w-4 text-safespeak-green" />;
      case 'under-investigation':
        return <Clock className="h-4 w-4 text-safespeak-blue" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'solved': return 'Solved';
      case 'under-investigation': return 'Investigating';
      case 'pending': return 'Pending';
      case 'critical': return 'Critical';
      default: return status;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-500">Urgent</span>;
      case 'high':
        return <span className="px-2 py-1 text-xs rounded bg-amber-500/20 text-amber-500">High</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs rounded bg-safespeak-blue/20 text-safespeak-blue">Medium</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs rounded bg-safespeak-green/20 text-safespeak-green">Low</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded bg-gray-500/20 text-gray-400">Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-safespeak-dark">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-safespeak-green/15 p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-safespeak-green" />
              </div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-white/70">Manage and track anonymous crime reports.</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="glass-card p-4 rounded-xl flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/10 p-3 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-white/70">Total Reports</p>
                <p className="text-2xl font-bold">{totalReports}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass-card p-4 rounded-xl flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-safespeak-green/15 p-3 rounded-lg">
                <CheckCircle className="h-5 w-5 text-safespeak-green" />
              </div>
              <div>
                <p className="text-sm text-white/70">Solved Cases</p>
                <p className="text-2xl font-bold">{solvedReports}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass-card p-4 rounded-xl flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="bg-amber-500/15 p-3 rounded-lg">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-white/70">Pending Review</p>
                <p className="text-2xl font-bold">{pendingReports}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass-card p-4 rounded-xl flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="bg-red-500/15 p-3 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-white/70">Critical Cases</p>
                <p className="text-2xl font-bold">{criticalReports}</p>
              </div>
            </motion.div>
          </div>
          
          {/* Progress Overview */}
          <motion.div 
            className="glass-card rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Case Progress Overview</h2>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" /> Export Analytics
              </Button>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium">Solved</p>
                  <p className="text-sm text-white/70">{(solvedReports / totalReports * 100).toFixed(1)}%</p>
                </div>
                <Progress value={solvedReports / totalReports * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium">Under Investigation</p>
                  <p className="text-sm text-white/70">{(reports.filter(r => r.status === 'under-investigation').length / totalReports * 100).toFixed(1)}%</p>
                </div>
                <Progress value={reports.filter(r => r.status === 'under-investigation').length / totalReports * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium">Pending Review</p>
                  <p className="text-sm text-white/70">{(pendingReports / totalReports * 100).toFixed(1)}%</p>
                </div>
                <Progress value={pendingReports / totalReports * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium">Critical Cases</p>
                  <p className="text-sm text-white/70">{(criticalReports / totalReports * 100).toFixed(1)}%</p>
                </div>
                <Progress value={criticalReports / totalReports * 100} className="h-2" />
              </div>
            </div>
          </motion.div>
          
          {/* Reports List */}
          <motion.div 
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Reports</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input 
                    placeholder="Search reports..." 
                    className="pl-10 bg-safespeak-dark-accent border-white/10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/60 border-b border-white/10">
                    <th className="whitespace-nowrap pb-4 font-medium text-sm">Report ID</th>
                    <th className="whitespace-nowrap pb-4 font-medium text-sm">Type</th>
                    <th className="whitespace-nowrap pb-4 font-medium text-sm">Location</th>
                    <th className="whitespace-nowrap pb-4 font-medium text-sm">Date</th>
                    <th className="whitespace-nowrap pb-4 font-medium text-sm">Priority</th>
                    <th className="whitespace-nowrap pb-4 font-medium text-sm">Status</th>
                    <th className="whitespace-nowrap pb-4 font-medium text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report, index) => (
                    <tr key={report.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 font-mono text-sm">{report.id}</td>
                      <td className="py-4">{report.type}</td>
                      <td className="py-4">{report.location}</td>
                      <td className="py-4 text-sm text-white/70">{report.date}</td>
                      <td className="py-4">{getPriorityBadge(report.priority)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(report.status)}
                          <span className="text-sm">{getStatusLabel(report.status)}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <Button size="sm" variant="outline" className="text-xs">View Details</Button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-white/60">
                        No reports found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
