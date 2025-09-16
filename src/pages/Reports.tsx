import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Wrench
} from "lucide-react";

const Reports = () => {
  const [dateRange, setDateRange] = useState("this-month");
  const [reportType, setReportType] = useState("overview");

  // Mock report data
  const reportData = {
    overview: {
      totalJobs: 156,
      completedJobs: 142,
      totalRevenue: 45230.50,
      avgJobValue: 318.45,
      topTechnician: "Mike Johnson",
      topTechJobs: 38,
    },
    technicians: [
      { name: "Mike Johnson", jobsCompleted: 38, revenue: 12450.00, avgTime: 3.2 },
      { name: "Tom Wilson", jobsCompleted: 35, revenue: 11820.50, avgTime: 3.5 },
      { name: "Alex Chen", jobsCompleted: 32, revenue: 10960.25, avgTime: 2.8 },
      { name: "Sarah Martinez", jobsCompleted: 28, revenue: 9340.75, avgTime: 3.1 },
    ],
    revenue: {
      thisMonth: 45230.50,
      lastMonth: 38940.25,
      growth: 16.2,
      avgDaily: 1507.68,
    },
    services: [
      { service: "Oil Changes", count: 45, revenue: 4050.00 },
      { service: "Brake Service", count: 28, revenue: 12600.00 },
      { service: "Engine Diagnostics", count: 18, revenue: 8100.00 },
      { service: "Transmission Service", count: 12, revenue: 7200.00 },
      { service: "Tire Service", count: 22, revenue: 5280.00 },
    ],
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log("Exporting report to CSV");
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export functionality
    console.log("Exporting report to PDF");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground">Business insights and performance metrics</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportCSV} className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="garage" onClick={handleExportPDF} className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-4 items-center">
                <label className="text-sm font-medium">Date Range:</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="today">Today</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="this-quarter">This Quarter</option>
                  <option value="this-year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <div className="flex gap-4 items-center">
                <label className="text-sm font-medium">Report Type:</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="overview">Overview</option>
                  <option value="technicians">Technicians</option>
                  <option value="revenue">Revenue</option>
                  <option value="services">Services</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Jobs
              </CardTitle>
              <Wrench className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{reportData.overview.totalJobs}</div>
              <p className="text-xs text-success">
                {reportData.overview.completedJobs} completed
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${reportData.overview.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-success">
                +{reportData.revenue.growth}% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Job Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${reportData.overview.avgJobValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Per completed job
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Technician
              </CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">{reportData.overview.topTechnician}</div>
              <p className="text-xs text-success">
                {reportData.overview.topTechJobs} jobs completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technician Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Technician Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Technician</th>
                    <th className="text-left py-3 px-2">Jobs Completed</th>
                    <th className="text-left py-3 px-2">Revenue Generated</th>
                    <th className="text-left py-3 px-2">Avg Time (hrs)</th>
                    <th className="text-left py-3 px-2">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.technicians.map((tech, index) => (
                    <tr key={tech.name} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{tech.name}</td>
                      <td className="py-3 px-2">{tech.jobsCompleted}</td>
                      <td className="py-3 px-2">${tech.revenue.toLocaleString()}</td>
                      <td className="py-3 px-2">{tech.avgTime}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-status rounded-full"
                              style={{ width: `${Math.max(20, 100 - index * 15)}%` }}
                            />
                          </div>
                          <span className="text-xs">{Math.max(85, 100 - index * 5)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Service Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Service Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.services.map((service) => (
                <div key={service.service} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{service.service}</span>
                      <span className="text-sm text-muted-foreground">
                        {service.count} jobs | ${service.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-accent rounded-full"
                        style={{ width: `${(service.count / 45) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;