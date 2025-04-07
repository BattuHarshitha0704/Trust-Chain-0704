
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/70">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {description && <p className="text-xs text-white/60 mt-1">{description}</p>}
        </div>
        <div className="bg-safespeak-blue/15 p-2 rounded-lg">
          <Icon className="h-6 w-6 text-safespeak-blue" />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center mt-2">
          <div
            className={cn(
              "text-xs font-medium flex items-center",
              trend.isPositive ? "text-safespeak-green" : "text-red-500"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
          <span className="text-xs text-white/60 ml-1">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
