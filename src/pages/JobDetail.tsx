import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Car, 
  User,
  Clock,
  FileText,
  Camera,
  Receipt,
  Package,
  Edit,
  Play,
  CheckCircle,
  MessageSquare,
  Wrench
} from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newNote, setNewNote] = useState("");

  // Mock job data - would be fetched from Supabase
  const job = {
    id: "JOB001",
    customerName: "John Smith",
    customerPhone: "(555) 123-4567",
    customerEmail: "john.smith@email.com",
    vehicleInfo: "2020 Honda Civic",
    vehiclePlate: "ABC123",
    vehicleVin: "1HGBH41JXMN109186",
    mileage: 52000,
    description: "Oil change and multi-point inspection",
    status: "in-progress",
    priority: "medium",
    assignedTechnician: "Mike Johnson",
    assignedAdvisor: "Sarah Davis",
    createdAt: "2024-01-15T09:00:00Z",
    estimatedCompletion: "2024-01-15T17:00:00Z",
    estimatedHours: 2,
    actualHours: 1.5,
    laborRate: 95.00,
    notes: [
      { id: 1, author: "Sarah Davis", timestamp: "2024-01-15T09:15:00Z", text: "Customer requested full synthetic oil" },
      { id: 2, author: "Mike Johnson", timestamp: "2024-01-15T10:30:00Z", text: "Started oil change procedure" },
    ],
    timeline: [
      { id: 1, event: "Job Created", timestamp: "2024-01-15T09:00:00Z", user: "Sarah Davis" },
      { id: 2, event: "Assigned to Technician", timestamp: "2024-01-15T09:15:00Z", user: "Sarah Davis" },
      { id: 3, event: "Job Started", timestamp: "2024-01-15T10:30:00Z", user: "Mike Johnson" },
    ],
    parts: [
      { id: 1, name: "Engine Oil 5W-30", quantity: 5, unitPrice: 8.99, total: 44.95 },
      { id: 2, name: "Oil Filter", quantity: 1, unitPrice: 12.49, total: 12.49 },
    ],
    photos: [
      { id: 1, url: "/placeholder.svg", caption: "Before service", timestamp: "2024-01-15T10:30:00Z" },
    ],
  };

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

  const handleAddNote = () => {
    if (newNote.trim()) {
      // TODO: Add note to Supabase
      console.log("Adding note:", newNote);
      setNewNote("");
    }
  };

  const handleStatusChange = (newStatus: string) => {
    // TODO: Update status in Supabase
    console.log("Changing status to:", newStatus);
  };

  const totalPartsValue = job.parts.reduce((sum, part) => sum + part.total, 0);
  const totalLaborValue = job.actualHours * job.laborRate;
  const totalJobValue = totalPartsValue + totalLaborValue;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/trunk")} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{job.id}</h1>
                <p className="text-muted-foreground">{job.vehicleInfo} - {job.customerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(job.status)}>
                {job.status.replace('-', ' ')}
              </Badge>
              <Badge className={getPriorityColor(job.priority)}>
                {job.priority} priority
              </Badge>
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="parts">Parts</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="invoice">Invoice</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Job Details */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Job Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground">Description</h4>
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Estimated Hours</h4>
                        <p className="text-sm text-muted-foreground">{job.estimatedHours} hours</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground">Assigned Technician</h4>
                        <p className="text-sm text-muted-foreground">{job.assignedTechnician}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Service Advisor</h4>
                        <p className="text-sm text-muted-foreground">{job.assignedAdvisor}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground">Created</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(job.createdAt).toLocaleDateString()} at {new Date(job.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Estimated Completion</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(job.estimatedCompletion).toLocaleDateString()} at {new Date(job.estimatedCompletion).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer & Vehicle Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <h4 className="font-medium text-foreground">{job.customerName}</h4>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{job.customerPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{job.customerEmail}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Vehicle
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <h4 className="font-medium text-foreground">{job.vehicleInfo}</h4>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Plate: {job.vehiclePlate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">VIN: {job.vehicleVin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mileage: {job.mileage.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Job Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {job.timeline.map((event) => (
                        <div key={event.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                          <div className="h-2 w-2 bg-accent rounded-full mt-2"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{event.event}</h4>
                            <p className="text-sm text-muted-foreground">
                              by {event.user} at {new Date(event.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="parts">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Parts Used
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Part</th>
                            <th className="text-left py-2">Qty</th>
                            <th className="text-left py-2">Unit Price</th>
                            <th className="text-left py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {job.parts.map((part) => (
                            <tr key={part.id} className="border-b">
                              <td className="py-2">{part.name}</td>
                              <td className="py-2">{part.quantity}</td>
                              <td className="py-2">${part.unitPrice}</td>
                              <td className="py-2">${part.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t font-medium">
                            <td colSpan={3} className="py-2">Parts Total:</td>
                            <td className="py-2">${totalPartsValue.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="photos">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Job Photos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {job.photos.map((photo) => (
                        <div key={photo.id} className="space-y-2">
                          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                            <img 
                              src={photo.url} 
                              alt={photo.caption}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{photo.caption}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(photo.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="aspect-square flex-col gap-2">
                        <Camera className="h-6 w-6" />
                        <span className="text-sm">Add Photo</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoice">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5" />
                      Invoice Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Labor ({job.actualHours} hrs @ ${job.laborRate}/hr)</span>
                        <span>${totalLaborValue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Parts</span>
                        <span>${totalPartsValue.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${totalJobValue.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline">Generate Invoice</Button>
                      <Button variant="garage">Create Invoice</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {job.status === 'pending' && (
                  <Button 
                    variant="garage" 
                    className="w-full gap-2"
                    onClick={() => handleStatusChange('in-progress')}
                  >
                    <Play className="h-4 w-4" />
                    Start Job
                  </Button>
                )}
                
                {job.status === 'in-progress' && (
                  <Button 
                    variant="success" 
                    className="w-full gap-2"
                    onClick={() => handleStatusChange('completed')}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Complete Job
                  </Button>
                )}
                
                <Button variant="outline" className="w-full gap-2">
                  <Camera className="h-4 w-4" />
                  Add Photo
                </Button>
                
                <Button variant="outline" className="w-full gap-2">
                  <Package className="h-4 w-4" />
                  Add Parts
                </Button>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {job.notes.map((note) => (
                    <div key={note.id} className="text-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{note.text}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    rows={3}
                  />
                  <Button onClick={handleAddNote} className="w-full">
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;