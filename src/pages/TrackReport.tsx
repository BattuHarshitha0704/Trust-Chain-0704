
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, CheckCircle, Clock, AlertTriangle, ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for demonstration
const mockReportStatuses = {
  'SS-123456': { 
    status: 'under-investigation',
    lastUpdated: '2025-04-01',
    details: 'The report is currently being investigated by authorities. Additional evidence has been requested.',
  },
  'SS-234567': { 
    status: 'solved',
    lastUpdated: '2025-04-05',
    details: 'The case has been resolved. Legal action has been taken against the perpetrators.',
  },
  'SS-345678': { 
    status: 'pending',
    lastUpdated: '2025-04-06',
    details: 'Your report is waiting for initial assessment. It will be reviewed within 48 hours.',
  },
  'SS-456789': { 
    status: 'critical',
    lastUpdated: '2025-04-07',
    details: 'This case has been flagged as high priority and urgent action is being taken.',
  }
};

const TrackReport = () => {
  const { toast } = useToast();
  const [reportId, setReportId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState<any>(null);
  
  const handleTrack = async () => {
    if (!reportId) {
      toast({
        title: "Error",
        description: "Please enter a valid Report ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call your blockchain API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundStatus = mockReportStatuses[reportId as keyof typeof mockReportStatuses];
      
      if (foundStatus) {
        setReportStatus(foundStatus);
        toast({
          title: "Report Found",
          description: "Report status has been retrieved successfully.",
        });
      } else {
        toast({
          title: "Not Found",
          description: "No report found with this ID. Please check and try again.",
          variant: "destructive"
        });
        setReportStatus(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retrieve report status.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'under-investigation':
        return {
          icon: <Clock className="h-6 w-6 text-safespeak-blue" />,
          label: 'Under Investigation',
          color: 'text-safespeak-blue',
          bg: 'bg-safespeak-blue/15'
        };
      case 'solved':
        return {
          icon: <CheckCircle className="h-6 w-6 text-safespeak-green" />,
          label: 'Solved',
          color: 'text-safespeak-green',
          bg: 'bg-safespeak-green/15'
        };
      case 'pending':
        return {
          icon: <Clock className="h-6 w-6 text-amber-500" />,
          label: 'Pending Review',
          color: 'text-amber-500',
          bg: 'bg-amber-500/15'
        };
      case 'critical':
        return {
          icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
          label: 'Critical - Urgent',
          color: 'text-red-500',
          bg: 'bg-red-500/15'
        };
      default:
        return {
          icon: <Eye className="h-6 w-6 text-white" />,
          label: 'Unknown',
          color: 'text-white',
          bg: 'bg-white/15'
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-safespeak-dark">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-safespeak-green/15 p-3 rounded-full">
                <Eye className="h-8 w-8 text-safespeak-green" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Track Your Report</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Enter your Report ID below to check the current status of your submitted report. 
              Your anonymity remains protected throughout this process.
            </p>
          </div>
          
          <motion.div 
            className="max-w-xl mx-auto glass-card rounded-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Enter your Report ID (e.g. SS-123456)"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                className="flex-1 bg-safespeak-dark-accent border-white/10"
              />
              <Button 
                onClick={handleTrack} 
                disabled={isLoading}
                className="bg-safespeak-green hover:bg-safespeak-green/90"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">●</span> Tracking...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="mr-2 h-4 w-4" /> Track Report
                  </span>
                )}
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-white/60">
                For demonstration, try these IDs: SS-123456, SS-234567, SS-345678, SS-456789
              </p>
            </div>
          </motion.div>
          
          {/* Report Status */}
          {reportStatus && (
            <motion.div 
              className="max-w-2xl mx-auto glass-card rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Report Status</h2>
                <p className="text-white/60 text-sm">
                  ID: <span className="font-mono">{reportId}</span> | Last Updated: {reportStatus.lastUpdated}
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${getStatusDetails(reportStatus.status).bg}`}>
                  {getStatusDetails(reportStatus.status).icon}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className={`text-lg font-medium ${getStatusDetails(reportStatus.status).color}`}>
                  {getStatusDetails(reportStatus.status).label}
                </h3>
                <p className="mt-2 text-white/80">
                  {reportStatus.details}
                </p>
              </div>
              
              {/* Timeline for demonstration */}
              <div className="space-y-4 mt-8">
                <h3 className="text-md font-medium flex items-center">
                  <ArrowRightCircle className="h-4 w-4 mr-2" /> Timeline
                </h3>
                
                <div className="ml-6 border-l border-white/10 pl-6 space-y-6">
                  <div>
                    <div className="flex items-center">
                      <div className="absolute -ml-9 p-1 rounded-full bg-safespeak-green"></div>
                      <p className="text-sm text-white/60">April 1, 2025</p>
                    </div>
                    <p className="text-sm mt-1">Report received and logged into the blockchain system.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="absolute -ml-9 p-1 rounded-full bg-safespeak-blue"></div>
                      <p className="text-sm text-white/60">April 3, 2025</p>
                    </div>
                    <p className="text-sm mt-1">Report assigned to investigation team for review.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="absolute -ml-9 p-1 rounded-full bg-white/30"></div>
                      <p className="text-sm text-white/60">April 5, 2025 (Expected)</p>
                    </div>
                    <p className="text-sm mt-1">Preliminary investigation results expected.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setReportStatus(null)}
                >
                  Track Another Report
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Instructions */}
          <div className="max-w-2xl mx-auto mt-8">
            <h3 className="text-lg font-medium mb-4">How to Track Your Report</h3>
            <ol className="list-decimal list-inside space-y-2 text-white/80 text-sm">
              <li>Enter your Report ID in the field above (received when you submitted your report)</li>
              <li>Click the "Track Report" button to check the current status</li>
              <li>The system will securely retrieve your report status from the blockchain</li>
              <li>Your anonymity is maintained throughout the entire process</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackReport;
