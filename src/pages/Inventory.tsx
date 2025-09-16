import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle,
  Edit,
  Trash2,
  Filter
} from "lucide-react";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock inventory data
  const inventory = [
    {
      id: "P001",
      name: "Engine Oil 5W-30",
      category: "fluids",
      currentStock: 24,
      minThreshold: 10,
      unitPrice: 8.99,
      supplier: "Mobil 1",
      location: "A1-2",
    },
    {
      id: "P002", 
      name: "Brake Pads - Front",
      category: "brakes",
      currentStock: 6,
      minThreshold: 8,
      unitPrice: 45.99,
      supplier: "Brembo",
      location: "B2-1",
    },
    {
      id: "P003",
      name: "Air Filter",
      category: "filters",
      currentStock: 15,
      minThreshold: 5,
      unitPrice: 12.49,
      supplier: "K&N",
      location: "C1-3",
    },
    {
      id: "P004",
      name: "Transmission Fluid",
      category: "fluids",
      currentStock: 3,
      minThreshold: 6,
      unitPrice: 18.99,
      supplier: "Valvoline",
      location: "A2-1",
    },
  ];

  const getStockStatus = (current: number, threshold: number) => {
    if (current <= threshold) return { status: 'low', color: 'bg-destructive text-destructive-foreground' };
    if (current <= threshold * 1.5) return { status: 'medium', color: 'bg-warning text-warning-foreground' };
    return { status: 'good', color: 'bg-success text-success-foreground' };
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minThreshold);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
              <p className="text-muted-foreground">Track parts and supplies</p>
            </div>
            <Button variant="garage" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Part
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <Card className="shadow-card border-l-4 border-l-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alert ({lowStockItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span>{item.name} ({item.id})</span>
                    <Badge variant="destructive">
                      {item.currentStock} left (min: {item.minThreshold})
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search parts by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="all">All Categories</option>
                <option value="fluids">Fluids</option>
                <option value="brakes">Brakes</option>
                <option value="filters">Filters</option>
                <option value="electrical">Electrical</option>
                <option value="engine">Engine</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Parts Inventory ({filteredInventory.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Part ID</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Category</th>
                    <th className="text-left py-3 px-2">Stock</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Price</th>
                    <th className="text-left py-3 px-2">Supplier</th>
                    <th className="text-left py-3 px-2">Location</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => {
                    const stockStatus = getStockStatus(item.currentStock, item.minThreshold);
                    return (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2 font-mono">{item.id}</td>
                        <td className="py-3 px-2 font-medium">{item.name}</td>
                        <td className="py-3 px-2 capitalize">{item.category}</td>
                        <td className="py-3 px-2">{item.currentStock}</td>
                        <td className="py-3 px-2">
                          <Badge className={stockStatus.color}>
                            {stockStatus.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">${item.unitPrice}</td>
                        <td className="py-3 px-2">{item.supplier}</td>
                        <td className="py-3 px-2 font-mono">{item.location}</td>
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
                    );
                  })}
                </tbody>
              </table>
              
              {filteredInventory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No parts found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;