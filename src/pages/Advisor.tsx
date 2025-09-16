import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  UserCheck, 
  Plus, 
  Send, 
  Phone,
  Mail,
  FileText,
  DollarSign
} from "lucide-react";

const Advisor = () => {
  const [estimateForm, setEstimateForm] = useState({
    jobId: "",
    customerName: "",
    vehicleInfo: "",
    services: "",
    laborCost: "",
    partsCost: "",
    notes: "",
  });

  // Mock data for advisor-managed jobs
  const managedJobs = [
    {
      id: "JOB002",
      vehicleInfo: "2019 Ford F-150 - XYZ789",
      customerName: "Jane Doe",
      customerPhone: "(555) 123-4567",
      customerEmail: "jane.doe@email.com",
      description: "Brake pad replacement",
      status: "estimate-sent",
      priority: "high",
      estimateAmount: 450,
      lastContact: "2024-01-15",
    },
    {
      id: "JOB005",
      vehicleInfo: "2017 Toyota Camry - TOY123",
      customerName: "Mike Chen",
      customerPhone: "(555) 987-6543",
      customerEmail: "mike.chen@email.com",
      description: "Transmission service",
      status: "estimate-pending",
      priority: "medium",
      estimateAmount: 0,
      lastContact: "2024-01-14",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'estimate-pending': return 'bg-warning text-warning-foreground';
      case 'estimate-sent': return 'bg-info text-info-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'declined': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const handleCreateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create estimate in Supabase
    console.log("Creating estimate:", estimateForm);
  };

  const handleSendEstimate = (jobId: string) => {
    // TODO: Send estimate via email/SMS
    console.log("Sending estimate for job:", jobId);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Service Advisor</h1>
              <p className="text-muted-foreground">Manage customer communications and estimates</p>
            </div>
            <Button variant="garage" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Job
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Estimate Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quick Estimate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateEstimate} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer Name</label>
                  <Input
                    value={estimateForm.customerName}
                    onChange={(e) => setEstimateForm({...estimateForm, customerName: e.target.value})}
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Info</label>
                  <Input
                    value={estimateForm.vehicleInfo}
                    onChange={(e) => setEstimateForm({...estimateForm, vehicleInfo: e.target.value})}
                    placeholder="Year Make Model - Plate"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Services Needed</label>
                <Textarea
                  value={estimateForm.services}
                  onChange={(e) => setEstimateForm({...estimateForm, services: e.target.value})}
                  placeholder="Describe the services needed..."
                  rows={3}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Labor Cost ($)</label>
                  <Input
                    type="number"
                    value={estimateForm.laborCost}
                    onChange={(e) => setEstimateForm({...estimateForm, laborCost: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parts Cost ($)</label>
                  <Input
                    type="number"
                    value={estimateForm.partsCost}
                    onChange={(e) => setEstimateForm({...estimateForm, partsCost: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <Button type="submit" variant="garage" className="gap-2">
                <DollarSign className="h-4 w-4" />
                Create Estimate
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Customer Jobs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Customer Jobs ({managedJobs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {managedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{job.id}</h3>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div><strong>Vehicle:</strong> {job.vehicleInfo}</div>
                        <div><strong>Customer:</strong> {job.customerName}</div>
                        <div><strong>Service:</strong> {job.description}</div>
                        {job.estimateAmount > 0 && (
                          <div><strong>Estimate:</strong> ${job.estimateAmount}</div>
                        )}
                        <div><strong>Last Contact:</strong> {job.lastContact}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Button>
                      {job.status === 'estimate-pending' && (
                        <Button 
                          variant="garage" 
                          size="sm" 
                          onClick={() => handleSendEstimate(job.id)}
                          className="gap-2"
                        >
                          <Send className="h-4 w-4" />
                          Send Estimate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {managedJobs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No customer jobs to manage.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Advisor;