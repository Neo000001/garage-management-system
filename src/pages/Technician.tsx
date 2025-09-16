import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  Camera,
  FileText,
  Play,
  Square
} from "lucide-react";

const Technician = () => {
  const [activeJob, setActiveJob] = useState<string | null>(null);

  // Mock data for technician-assigned jobs
  const assignedJobs = [
    {
      id: "JOB001",
      vehicleInfo: "2020 Honda Civic - ABC123",
      customerName: "John Smith",
      description: "Oil change and inspection",
      status: "in-progress",
      priority: "medium",
      estimatedTime: "2 hours",
      startTime: "09:00 AM",
      notes: "Customer requested full synthetic oil",
    },
    {
      id: "JOB004",
      vehicleInfo: "2018 BMW X5 - BMW999",
      customerName: "Alice Wilson",
      description: "Brake inspection and replacement",
      status: "pending",
      priority: "high",
      estimatedTime: "3 hours",
      startTime: "11:00 AM",
      notes: "Customer reported squeaking noise",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-info text-info-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const handleStartJob = (jobId: string) => {
    setActiveJob(jobId);
    // TODO: Update job status in Supabase
  };

  const handleCompleteJob = (jobId: string) => {
    setActiveJob(null);
    // TODO: Update job status in Supabase
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Jobs</h1>
              <p className="text-muted-foreground">Jobs assigned to you</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                Active: {activeJob ? 1 : 0}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Total: {assignedJobs.length}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {assignedJobs.map((job) => (
            <Card key={job.id} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    {job.id}
                  </CardTitle>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{job.vehicleInfo}</h3>
                    <p className="text-sm text-muted-foreground">Customer: {job.customerName}</p>
                    <p className="text-sm text-muted-foreground">Description: {job.description}</p>
                    <p className="text-sm text-muted-foreground">Notes: {job.notes}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>Estimated: {job.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Start Time: {job.startTime}</span>
                    </div>
                    <Badge className="bg-destructive-light text-destructive">
                      {job.priority} priority
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {job.status === 'pending' && (
                    <Button 
                      variant="garage" 
                      onClick={() => handleStartJob(job.id)}
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Start Job
                    </Button>
                  )}
                  
                  {job.status === 'in-progress' && activeJob === job.id && (
                    <Button 
                      variant="success" 
                      onClick={() => handleCompleteJob(job.id)}
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Complete Job
                    </Button>
                  )}
                  
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Add Photo
                  </Button>
                  
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Add Notes
                  </Button>
                  
                  {job.status === 'in-progress' && (
                    <Button variant="outline" className="gap-2">
                      <Square className="h-4 w-4" />
                      Pause Job
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {assignedJobs.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="text-center py-8">
                <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Jobs Assigned</h3>
                <p className="text-muted-foreground">Check back later for new assignments.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Technician;