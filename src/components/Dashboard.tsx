
import { FilePenLine, CheckCircle, Clock, BarChart2, ShieldAlert } from "lucide-react";
import StatCard from "./StatCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-white/70">Monitor crime reports and their status.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Reports" 
          value="2,567" 
          icon={FilePenLine} 
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Cases Solved" 
          value="1,342" 
          icon={CheckCircle} 
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Under Investigation" 
          value="895" 
          icon={Clock} 
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard 
          title="Critical Cases" 
          value="125" 
          icon={ShieldAlert} 
          trend={{ value: 5, isPositive: false }}
        />
      </div>
      
      {/* Case Resolution Progress */}
      <div className="glass-card rounded-2xl p-6 mb-10">
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
              <div className="text-sm text-white/70">52%</div>
            </div>
            <Progress value={52} className="h-2 bg-white/10" indicatorClassName="bg-safespeak-green" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Under Investigation</div>
              <div className="text-sm text-white/70">35%</div>
            </div>
            <Progress value={35} className="h-2 bg-white/10" indicatorClassName="bg-safespeak-blue" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Pending Review</div>
              <div className="text-sm text-white/70">13%</div>
            </div>
            <Progress value={13} className="h-2 bg-white/10" indicatorClassName="bg-amber-500" />
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center">
          <div className="bg-safespeak-blue/15 p-4 rounded-full mb-4">
            <FilePenLine className="h-8 w-8 text-safespeak-blue" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Report a Crime</h3>
          <p className="text-white/70 text-sm mb-4">Submit a new anonymous crime report securely.</p>
          <Link to="/report" className="btn-primary w-full">Report Now</Link>
        </div>
        
        <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center">
          <div className="bg-safespeak-green/15 p-4 rounded-full mb-4">
            <Clock className="h-8 w-8 text-safespeak-green" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Track a Report</h3>
          <p className="text-white/70 text-sm mb-4">Check the status of your previously submitted report.</p>
          <Link to="/track" className="btn-secondary w-full">Track Report</Link>
        </div>
        
        <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center">
          <div className="bg-purple-500/15 p-4 rounded-full mb-4">
            <ShieldAlert className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Emergency Help</h3>
          <p className="text-white/70 text-sm mb-4">Get immediate assistance for urgent situations.</p>
          <Link to="/emergency" className="btn-ghost w-full">Get Help</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
