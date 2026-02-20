"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Plus,
  Server,
  MoreVertical,
  Trash2,
  Edit,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Settings,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DatabaseConnection {
  id: string;
  name: string;
  type: "postgresql" | "mysql" | "mongodb" | "redis";
  host: string;
  port: number;
  database: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  queriesPerSecond: number;
  latency: number;
}

const mockDatabases: DatabaseConnection[] = [
  {
    id: "1",
    name: "Production PostgreSQL",
    type: "postgresql",
    host: "prod-db.company.com",
    port: 5432,
    database: "production",
    status: "connected",
    lastSync: "2 min ago",
    queriesPerSecond: 1250,
    latency: 23,
  },
  {
    id: "2",
    name: "Analytics MySQL",
    type: "mysql",
    host: "analytics.company.com",
    port: 3306,
    database: "analytics",
    status: "connected",
    lastSync: "5 min ago",
    queriesPerSecond: 890,
    latency: 45,
  },
  {
    id: "3",
    name: "Cache Redis",
    type: "redis",
    host: "cache.company.com",
    port: 6379,
    database: "0",
    status: "connected",
    lastSync: "1 min ago",
    queriesPerSecond: 5600,
    latency: 2,
  },
  {
    id: "4",
    name: "Logs MongoDB",
    type: "mongodb",
    host: "logs.company.com",
    port: 27017,
    database: "logs",
    status: "error",
    lastSync: "1 hour ago",
    queriesPerSecond: 0,
    latency: 0,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected":
      return "bg-success text-success-foreground";
    case "error":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return CheckCircle2;
    case "error":
      return XCircle;
    default:
      return Pause;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "postgresql":
      return Database;
    case "mysql":
      return Database;
    case "mongodb":
      return Server;
    case "redis":
      return Activity;
    default:
      return Database;
  }
};

export default function DatabasesPage() {
  const [databases, setDatabases] = useState<DatabaseConnection[]>(mockDatabases);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredDatabases = databases.filter((db) =>
    db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    db.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestConnection = (id: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to database ${id}...`,
    });
  };

  const handleDelete = (id: string) => {
    setDatabases(databases.filter((db) => db.id !== id));
    toast({
      title: "Database Removed",
      description: "The database connection has been removed successfully.",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Database Connections</h1>
            <p className="text-muted-foreground">Manage and monitor your database connections</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Database
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Database Connection</DialogTitle>
                <DialogDescription>
                  Configure a new database connection to monitor and optimize.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Production Database" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <select id="type" className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mysql">MySQL</option>
                    <option value="mongodb">MongoDB</option>
                    <option value="redis">Redis</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="host" className="text-right">
                    Host
                  </Label>
                  <Input id="host" placeholder="localhost" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="port" className="text-right">
                    Port
                  </Label>
                  <Input id="port" placeholder="5432" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="database" className="text-right">
                    Database
                  </Label>
                  <Input id="database" placeholder="mydb" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                  Test & Save Connection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search databases..."
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

        {/* Database Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatabases.map((db, index) => {
            const StatusIcon = getStatusIcon(db.status);
            const TypeIcon = getTypeIcon(db.type);
            
            return (
              <motion.div
                key={db.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card hover-lift h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          db.type === 'postgresql' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          db.type === 'mysql' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                          db.type === 'mongodb' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{db.name}</CardTitle>
                          <CardDescription className="text-xs">{db.host}:{db.port}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleTestConnection(db.id)}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Test Connection
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(db.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={db.status === "connected" ? "default" : "destructive"} className={getStatusColor(db.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {db.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{db.lastSync}</span>
                    </div>
                    
                    {db.status === "connected" && (
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Queries/sec</p>
                          <p className="text-lg font-semibold">{db.queriesPerSecond.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Latency</p>
                          <p className="text-lg font-semibold">{db.latency}ms</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Activity className="w-3 h-3" />
                        Monitor
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Settings className="w-3 h-3" />
                        Optimize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Connections</p>
                  <p className="text-2xl font-bold">{databases.length}</p>
                </div>
                <Database className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-success">
                    {databases.filter(d => d.status === "connected").length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-success opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Errors</p>
                  <p className="text-2xl font-bold text-destructive">
                    {databases.filter(d => d.status === "error").length}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-destructive opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total QPS</p>
                  <p className="text-2xl font-bold">
                    {databases.reduce((acc, d) => acc + d.queriesPerSecond, 0).toLocaleString()}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-warning opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
