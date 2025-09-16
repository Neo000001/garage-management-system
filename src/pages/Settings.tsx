import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon, 
  Users, 
  Building2,
  Bell,
  Shield,
  Database,
  Trash2,
  Edit,
  Plus
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  // Mock user data
  const users = [
    { id: 1, name: "Mike Johnson", email: "mike@garage.com", role: "technician", status: "active" },
    { id: 2, name: "Sarah Davis", email: "sarah@garage.com", role: "advisor", status: "active" },
    { id: 3, name: "Tom Wilson", email: "tom@garage.com", role: "technician", status: "active" },
    { id: 4, name: "John Admin", email: "admin@garage.com", role: "admin", status: "active" },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'manager': return 'bg-info text-info-foreground';
      case 'advisor': return 'bg-warning text-warning-foreground';
      case 'technician': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "users", label: "Users", icon: Users },
    { id: "company", label: "Company", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "backup", label: "Backup", icon: Database },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground">Configure your garage management system</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="shadow-card lg:col-span-1">
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "general" && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-6 (Central Time)</option>
                        <option>UTC-7 (Mountain Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                        <option>USD ($)</option>
                        <option>CAD (C$)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="work-hours">Business Hours</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" defaultValue="08:00" />
                      <Input type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  
                  <Button variant="garage">Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "users" && (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                    <Button variant="garage" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Name</th>
                          <th className="text-left py-3 px-2">Email</th>
                          <th className="text-left py-3 px-2">Role</th>
                          <th className="text-left py-3 px-2">Status</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2 font-medium">{user.name}</td>
                            <td className="py-3 px-2">{user.email}</td>
                            <td className="py-3 px-2">
                              <Badge className={getRoleColor(user.role)}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <Badge variant="outline" className="text-success">
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "company" && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="Premier Auto Garage" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="(555) 123-4567" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Main Street, Anytown, ST 12345" rows={3} />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="info@premierauto.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="www.premierauto.com" />
                    </div>
                  </div>
                  
                  <Button variant="garage">Update Company Info</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Job Status Updates</h4>
                        <p className="text-sm text-muted-foreground">Notify when job status changes</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Low Stock Alerts</h4>
                        <p className="text-sm text-muted-foreground">Alert when parts are running low</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Customer Messages</h4>
                        <p className="text-sm text-muted-foreground">Notify about customer communications</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Payment Notifications</h4>
                        <p className="text-sm text-muted-foreground">Alert when payments are received</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <Button variant="garage">Save Preferences</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Session Timeout</h4>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                      <select className="px-3 py-2 border border-input rounded-md bg-background text-sm">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                        <option>4 hours</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Password Requirements</Label>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>• Minimum 8 characters</div>
                        <div>• At least one uppercase letter</div>
                        <div>• At least one number</div>
                        <div>• At least one special character</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="garage">Update Security</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "backup" && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Data Backup & Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Automatic Backups</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your data is automatically backed up daily at 2:00 AM
                      </p>
                      <Badge variant="outline" className="text-success">
                        Last backup: Today at 2:15 AM
                      </Badge>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Manual Export</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Export your data for external storage or migration
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline">Export Jobs</Button>
                        <Button variant="outline">Export Customers</Button>
                        <Button variant="outline">Export Inventory</Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Data Retention</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Configure how long to keep different types of data
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Records</Label>
                          <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                            <option>7 years</option>
                            <option>5 years</option>
                            <option>3 years</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Customer Data</Label>
                          <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                            <option>Indefinitely</option>
                            <option>10 years</option>
                            <option>5 years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="garage">Save Settings</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;