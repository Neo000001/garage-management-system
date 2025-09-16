import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Clock, 
  User, 
  Eye,
  Edit,
  Calendar
} from "lucide-react";

interface JobListProps {
  searchQuery: string;
  statusFilter: string;
  dateRange: string;
}

// Mock data - will be replaced with Supabase data
const mockJobs = [
  {
    id: "JOB001",
    vehicleInfo: "2020 Honda Civic - ABC123",
    vin: "1HGBH41JXMN109186",
    customerName: "John Smith",
    description: "Oil change and inspection",
    status: "in-progress",
    priority: "medium",
    assignedTechnician: "Mike Johnson",
    assignedAdvisor: "Sarah Davis",
    createdAt: "2024-01-15T09:00:00Z",
    estimatedCompletion: "2024-01-15T17:00:00Z",
  },
  {
    id: "JOB002", 
    vehicleInfo: "2019 Ford F-150 - XYZ789",
    vin: "1FTEW1E50KFA10312",
    customerName: "Jane Doe",
    description: "Brake pad replacement",
    status: "pending",
    priority: "high",
    assignedTechnician: "Tom Wilson",
    assignedAdvisor: "Sarah Davis",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedCompletion: "2024-01-16T15:00:00Z",
  },
  {
    id: "JOB003",
    vehicleInfo: "2021 Tesla Model 3 - TEL456",
    vin: "5YJ3E1EA4MF000001",
    customerName: "Bob Johnson",
    description: "Annual inspection",
    status: "completed",
    priority: "low",
    assignedTechnician: "Alex Chen",
    assignedAdvisor: "Mark Brown",
    createdAt: "2024-01-14T14:00:00Z",
    estimatedCompletion: "2024-01-14T16:00:00Z",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-warning text-warning-foreground';
    case 'in-progress': return 'bg-info text-info-foreground';
    case 'completed': return 'bg-success text-success-foreground';
    case 'cancelled': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-secondary text-secondary-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive text-destructive-foreground';
    case 'medium': return 'bg-warning text-warning-foreground';
    case 'low': return 'bg-success text-success-foreground';
    default: return 'bg-secondary text-secondary-foreground';
  }
};

export const JobList = ({ searchQuery, statusFilter, dateRange }: JobListProps) => {
  // Filter jobs based on search and filters
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.vehicleInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.vin.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    // Simple date filtering - in real app would use proper date logic
    const matchesDate = dateRange === 'all' || true;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Jobs ({filteredJobs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{job.id}</h3>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      <span>{job.vehicleInfo}</span>
                    </div>
                    <div>VIN: {job.vin}</div>
                    <div>Customer: {job.customerName}</div>
                    <div>Description: {job.description}</div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Tech: {job.assignedTechnician}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Advisor: {job.assignedAdvisor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Due: {new Date(job.estimatedCompletion).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No jobs found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};