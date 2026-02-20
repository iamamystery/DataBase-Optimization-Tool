"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  Filter,
  Search,
  Trash2,
  Settings,
  MoreVertical,
  Mail,
  Database,
  Cpu,
  TrendingUp,
  X
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

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  category: "performance" | "availability" | "security" | "capacity";
  status: "unread" | "read" | "resolved";
  timestamp: string;
  database?: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "High CPU Usage Detected",
    description: "Database server CPU usage exceeded 85% for more than 5 minutes",
    severity: "critical",
    category: "performance",
    status: "unread",
    timestamp: "5 minutes ago",
    database: "Production PostgreSQL"
  },
  {
    id: "2",
    title: "Slow Query Detected",
    description: "Query execution time exceeded 2 seconds threshold",
    severity: "warning",
    category: "performance",
    status: "unread",
    timestamp: "12 minutes ago",
    database: "Analytics MySQL"
  },
  {
    id: "3",
    title: "Connection Pool Exhausted",
    description: "Maximum number of database connections reached",
    severity: "critical",
    category: "availability",
    status: "read",
    timestamp: "1 hour ago",
    database: "Production PostgreSQL"
  },
  {
    id: "4",
    title: "Index Fragmentation High",
    description: "Table indexes are over 30% fragmented",
    severity: "warning",
    category: "performance",
    status: "resolved",
    timestamp: "3 hours ago",
    database: "Logs MongoDB"
  },
  {
    id: "5",
    title: "Storage Capacity Warning",
    description: "Database storage is 85% full",
    severity: "warning",
    category: "capacity",
    status: "unread",
    timestamp: "2 hours ago",
    database: "Cache Redis"
  },
  {
    id: "6",
    title: "Failed Login Attempts",
    description: "Multiple failed login attempts detected",
    severity: "info",
    category: "security",
    status: "read",
    timestamp: "30 minutes ago",
    database: "Production PostgreSQL"
  }
];

const severityConfig = {
  critical: {
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: AlertCircle,
    badge: "bg-destructive text-destructive-foreground"
  },
  warning: {
    color: "bg-warning/10 text-warning border-warning/20",
    icon: AlertTriangle,
    badge: "bg-warning text-warning-foreground"
  },
  info: {
    color: "bg-info/10 text-info border-info/20",
    icon: Bell,
    badge: "bg-info text-info-foreground"
  }
};

const categoryIcons = {
  performance: TrendingUp,
  availability: Database,
  security: AlertCircle,
  capacity: Cpu
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (alert.database && alert.database.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const unreadCount = alerts.filter(a => a.status === "unread").length;
  const criticalCount = alerts.filter(a => a.severity === "critical" && a.status !== "resolved").length;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: "read" } : alert
    ));
  };

  const markAsResolved = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: "resolved" } : alert
    ));
    toast({
      title: "Alert Resolved",
      description: "The alert has been marked as resolved",
      variant: "success"
    });
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "The alert has been removed"
    });
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert =>
      alert.status === "unread" ? { ...alert, status: "read" } : alert
    ));
    toast({
      title: "All Alerts Read",
      description: "All alerts have been marked as read",
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
              <Bell className="w-8 h-8 text-primary" />
              Alerts & Notifications
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage database alerts and notifications
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Alert Settings
            </Button>
            <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
              <CheckCircle2 className="w-4 h-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="text-2xl font-bold text-warning">
                    {alerts.filter(a => a.category === "performance" && a.status !== "resolved").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-success">
                    {alerts.filter(a => a.status === "resolved").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
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

        {/* Alerts List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredAlerts.map((alert, index) => {
                const config = severityConfig[alert.severity];
                const CategoryIcon = categoryIcons[alert.category];
                
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`glass-card hover-lift ${alert.status === "unread" ? "border-l-4 border-l-primary" : ""}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}>
                            <config.icon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{alert.title}</h3>
                                  <Badge className={config.badge}>
                                    {alert.severity}
                                  </Badge>
                                  {alert.status === "unread" && (
                                    <Badge variant="default">New</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {alert.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <CategoryIcon className="w-3 h-3" />
                                    {alert.category}
                                  </span>
                                  {alert.database && (
                                    <span className="flex items-center gap-1">
                                      <Database className="w-3 h-3" />
                                      {alert.database}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {alert.timestamp}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {alert.status !== "resolved" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => markAsResolved(alert.id)}
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    Resolve
                                  </Button>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {alert.status === "unread" && (
                                      <DropdownMenuItem onClick={() => markAsRead(alert.id)}>
                                        Mark as read
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem onClick={() => deleteAlert(alert.id)} className="text-destructive">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
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
      </div>
    </div>
  );
}
