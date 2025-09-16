import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Receipt, 
  Search, 
  Download, 
  Eye,
  Plus,
  Calendar,
  DollarSign
} from "lucide-react";

const Invoices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock invoice data
  const invoices = [
    {
      id: "INV-2024-001",
      jobId: "JOB001",
      customerName: "John Smith",
      vehicleInfo: "2020 Honda Civic - ABC123",
      amount: 156.50,
      status: "paid",
      createdDate: "2024-01-15",
      dueDate: "2024-02-15",
      paidDate: "2024-01-18",
      services: ["Oil Change", "Multi-point Inspection"],
    },
    {
      id: "INV-2024-002",
      jobId: "JOB002",
      customerName: "Jane Doe",
      vehicleInfo: "2019 Ford F-150 - XYZ789",
      amount: 450.00,
      status: "pending",
      createdDate: "2024-01-15",
      dueDate: "2024-02-15",
      paidDate: null,
      services: ["Brake Pad Replacement", "Brake Fluid Flush"],
    },
    {
      id: "INV-2024-003",
      jobId: "JOB003",
      customerName: "Bob Johnson",
      vehicleInfo: "2021 Tesla Model 3 - TEL456",
      amount: 89.99,
      status: "paid",
      createdDate: "2024-01-14",
      dueDate: "2024-02-14",
      paidDate: "2024-01-14",
      services: ["Annual Inspection"],
    },
    {
      id: "INV-2024-004",
      jobId: "JOB006",
      customerName: "Alice Wilson",
      vehicleInfo: "2018 BMW X5 - BMW999",
      amount: 1250.75,
      status: "overdue",
      createdDate: "2024-01-10",
      dueDate: "2024-01-25",
      paidDate: null,
      services: ["Engine Diagnostics", "Timing Belt Replacement"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'overdue': return 'bg-destructive text-destructive-foreground';
      case 'draft': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = !searchQuery || 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.jobId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  const handleGeneratePDF = (invoiceId: string) => {
    // TODO: Implement PDF generation via serverless function
    console.log("Generating PDF for invoice:", invoiceId);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Invoice Management</h1>
              <p className="text-muted-foreground">Track billing and payments</p>
            </div>
            <Button variant="garage" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-success">
                Paid invoices
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <Calendar className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${pendingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-warning">
                Awaiting payment
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overdue
              </CardTitle>
              <Receipt className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${overdueAmount.toLocaleString()}
              </div>
              <p className="text-xs text-destructive">
                Past due date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by invoice ID, customer, or job..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Invoice List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Invoices ({filteredInvoices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{invoice.id}</h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Job: {invoice.jobId} | Customer: {invoice.customerName}</div>
                        <div>Vehicle: {invoice.vehicleInfo}</div>
                        <div>Services: {invoice.services.join(", ")}</div>
                        <div className="flex gap-4">
                          <span>Created: {invoice.createdDate}</span>
                          <span>Due: {invoice.dueDate}</span>
                          {invoice.paidDate && <span>Paid: {invoice.paidDate}</span>}
                        </div>
                      </div>
                      
                      <div className="text-lg font-semibold text-foreground">
                        ${invoice.amount.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleGeneratePDF(invoice.id)}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredInvoices.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No invoices found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoices;