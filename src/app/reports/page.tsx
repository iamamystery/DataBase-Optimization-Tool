"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  FileJson,
  Eye,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Report {
  id: string;
  name: string;
  type: "performance" | "optimization" | "audit" | "compliance";
  format: "pdf" | "csv" | "json";
  status: "ready" | "generating" | "scheduled";
  createdAt: string;
  size: string;
  database?: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "Q4 2024 Performance Report",
    type: "performance",
    format: "pdf",
    status: "ready",
    createdAt: "2 hours ago",
    size: "2.4 MB",
    database: "Production PostgreSQL"
  },
  {
    id: "2",
    name: "Query Optimization Analysis",
    type: "optimization",
    format: "csv",
    status: "ready",
    createdAt: "1 day ago",
    size: "856 KB",
    database: "Analytics MySQL"
  },
  {
    id: "3",
    name: "Monthly Security Audit",
    type: "audit",
    format: "pdf",
    status: "generating",
    createdAt: "In progress",
    size: "--",
    database: "All Databases"
  },
  {
    id: "4",
    name: "SOC 2 Compliance Report",
    type: "compliance",
    format: "pdf",
    status: "scheduled",
    createdAt: "Tomorrow 9:00 AM",
    size: "--",
    database: "Production PostgreSQL"
  },
  {
    id: "5",
    name: "Index Usage Statistics",
    type: "optimization",
    format: "json",
    status: "ready",
    createdAt: "3 days ago",
    size: "124 KB",
    database: "Production PostgreSQL"
  },
];

const typeConfig = {
  performance: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: TrendingUp,
    label: "Performance"
  },
  optimization: {
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: BarChart3,
    label: "Optimization"
  },
  audit: {
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    icon: FileText,
    label: "Audit"
  },
  compliance: {
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: CheckCircle2,
    label: "Compliance"
  }
};

const formatIcons = {
  pdf: FileText,
  csv: FileSpreadsheet,
  json: FileJson
};

const statusConfig = {
  ready: {
    color: "bg-success/10 text-success",
    icon: CheckCircle2
  },
  generating: {
    color: "bg-warning/10 text-warning",
    icon: Clock
  },
  scheduled: {
    color: "bg-info/10 text-info",
    icon: Calendar
  }
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (report.database && report.database.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDownload = (report: Report) => {
    toast({
      title: "Download Started",
      description: `Downloading ${report.name}...`,
      variant: "success"
    });
  };

  const handleDelete = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
    toast({
      title: "Report Deleted",
      description: "The report has been removed",
    });
  };

  const handleGenerate = () => {
    setIsGenerateDialogOpen(false);
    toast({
      title: "Report Generation Started",
      description: "Your report will be ready shortly",
      variant: "success"
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Generate, view, and download performance reports
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Generate Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Generate New Report</DialogTitle>
                  <DialogDescription>
                    Create a custom report for your database performance analysis.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Report Name</Label>
                    <Input placeholder="Enter report name..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="optimization">Optimization</SelectItem>
                          <SelectItem value="audit">Security Audit</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                          <SelectItem value="json">JSON Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Database</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select database" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Databases</SelectItem>
                        <SelectItem value="prod">Production PostgreSQL</SelectItem>
                        <SelectItem value="analytics">Analytics MySQL</SelectItem>
                        <SelectItem value="cache">Cache Redis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleGenerate}>
                    Generate Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ready</p>
                  <p className="text-2xl font-bold text-success">
                    {reports.filter(r => r.status === "ready").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Generating</p>
                  <p className="text-2xl font-bold text-warning">
                    {reports.filter(r => r.status === "generating").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-info">
                    {reports.filter(r => r.status === "scheduled").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Reports List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredReports.map((report, index) => {
                const type = typeConfig[report.type];
                const status = statusConfig[report.status];
                const FormatIcon = formatIcons[report.format];
                
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="glass-card hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${type.color}`}>
                              <type.icon className="w-6 h-6" />
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{report.name}</h3>
                                <Badge className={status.color}>
                                  <status.icon className="w-3 h-3 mr-1" />
                                  {report.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <FormatIcon className="w-4 h-4" />
                                  {report.format.toUpperCase()}
                                </span>
                                {report.database && (
                                  <span className="flex items-center gap-1">
                                    <Database className="w-4 h-4" />
                                    {report.database}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {report.createdAt}
                                </span>
                                {report.size !== "--" && (
                                  <span>{report.size}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {report.status === "ready" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(report)}
                                className="gap-1"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Schedule
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(report.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Templates */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>
              Quick-start templates for common report types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Weekly Performance", desc: "Database performance summary", icon: TrendingUp, color: "bg-blue-100 text-blue-600" },
                { title: "Query Analysis", desc: "Slow query identification", icon: BarChart3, color: "bg-green-100 text-green-600" },
                { title: "Security Audit", desc: "Access and compliance check", icon: FileText, color: "bg-purple-100 text-purple-600" },
                { title: "Capacity Planning", desc: "Resource utilization forecast", icon: PieChart, color: "bg-orange-100 text-orange-600" },
              ].map((template, index) => (
                <motion.div
                  key={template.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center mb-3`}>
                    <template.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold mb-1">{template.title}</h4>
                  <p className="text-sm text-muted-foreground">{template.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
