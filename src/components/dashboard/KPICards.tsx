import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Users,
  Wrench,
  TrendingUp
} from "lucide-react";

// Mock data - will be replaced with Supabase queries
const kpiData = {
  todaysJobs: 12,
  inProgress: 8,
  completed: 24,
  revenue: 15420,
  activeTechnicians: 6,
  pendingJobs: 15,
  avgCompletionTime: 4.2,
  customerSatisfaction: 4.8,
};

export const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Today's Jobs */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Today's Jobs
          </CardTitle>
          <Calendar className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{kpiData.todaysJobs}</div>
          <p className="text-xs text-success">
            +2 from yesterday
          </p>
        </CardContent>
      </Card>

      {/* In Progress */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            In Progress
          </CardTitle>
          <Clock className="h-4 w-4 text-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{kpiData.inProgress}</div>
          <p className="text-xs text-muted-foreground">
            Active jobs
          </p>
        </CardContent>
      </Card>

      {/* Completed Today */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completed Today
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{kpiData.completed}</div>
          <p className="text-xs text-success">
            +18% from last week
          </p>
        </CardContent>
      </Card>

      {/* Daily Revenue */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Daily Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ${kpiData.revenue.toLocaleString()}
          </div>
          <p className="text-xs text-success">
            +12% from yesterday
          </p>
        </CardContent>
      </Card>

      {/* Active Technicians */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Technicians
          </CardTitle>
          <Users className="h-4 w-4 text-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{kpiData.activeTechnicians}</div>
          <p className="text-xs text-muted-foreground">
            Currently working
          </p>
        </CardContent>
      </Card>

      {/* Pending Jobs */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending Jobs
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{kpiData.pendingJobs}</div>
          <p className="text-xs text-warning">
            Awaiting assignment
          </p>
        </CardContent>
      </Card>

      {/* Avg Completion Time */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Avg Completion
          </CardTitle>
          <Wrench className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{kpiData.avgCompletionTime}h</div>
          <p className="text-xs text-success">
            -0.5h from last week
          </p>
        </CardContent>
      </Card>

      {/* Customer Satisfaction */}
      <Card className="shadow-card hover:shadow-elevated transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Customer Rating
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{kpiData.customerSatisfaction}/5</div>
          <p className="text-xs text-success">
            +0.2 this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};