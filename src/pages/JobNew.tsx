import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Car, 
  User,
  Wrench,
  Calendar,
  Save,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehiclePlate: "",
    vehicleVin: "",
    mileage: "",
    description: "",
    priority: "medium",
    assignedTechnician: "",
    assignedAdvisor: "",
    estimatedHours: "",
    notes: "",
  });

  // Mock data for dropdowns
  const technicians = [
    { id: "tech1", name: "Mike Johnson" },
    { id: "tech2", name: "Tom Wilson" },
    { id: "tech3", name: "Alex Chen" },
    { id: "tech4", name: "Sarah Martinez" },
  ];

  const advisors = [
    { id: "adv1", name: "Sarah Davis" },
    { id: "adv2", name: "Mark Brown" },
    { id: "adv3", name: "Lisa Johnson" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to Supabase
    console.log("Creating new job:", formData);
    // Navigate back to trunk after creation
    navigate("/trunk");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/trunk")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create New Job</h1>
              <p className="text-muted-foreground">Add a new service job to the system</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Customer Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Customer's full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    placeholder="customer@email.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleYear">Year *</Label>
                    <Input
                      id="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                      placeholder="2020"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleMake">Make *</Label>
                    <Input
                      id="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                      placeholder="Honda"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Model *</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                    placeholder="Civic"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehiclePlate">License Plate</Label>
                  <Input
                    id="vehiclePlate"
                    value={formData.vehiclePlate}
                    onChange={(e) => handleInputChange("vehiclePlate", e.target.value)}
                    placeholder="ABC123"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicleVin">VIN</Label>
                  <Input
                    id="vehicleVin"
                    value={formData.vehicleVin}
                    onChange={(e) => handleInputChange("vehicleVin", e.target.value)}
                    placeholder="1HGBH41JXMN109186"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mileage">Current Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange("mileage", e.target.value)}
                    placeholder="50000"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Service Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the service needed..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => handleInputChange("priority", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <Badge className={getPriorityColor(formData.priority)}>
                    {formData.priority} priority
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignedTechnician">Assigned Technician</Label>
                  <select
                    id="assignedTechnician"
                    value={formData.assignedTechnician}
                    onChange={(e) => handleInputChange("assignedTechnician", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="">Select Technician</option>
                    {technicians.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignedAdvisor">Assigned Advisor</Label>
                  <select
                    id="assignedAdvisor"
                    value={formData.assignedAdvisor}
                    onChange={(e) => handleInputChange("assignedAdvisor", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="">Select Advisor</option>
                    {advisors.map((advisor) => (
                      <option key={advisor.id} value={advisor.id}>
                        {advisor.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estimatedHours">Estimated Hours</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    step="0.5"
                    value={formData.estimatedHours}
                    onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                    placeholder="2.5"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any additional notes or special instructions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex gap-4 justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/trunk")}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="garage" className="gap-2">
                  <Save className="h-4 w-4" />
                  Create Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default JobNew;