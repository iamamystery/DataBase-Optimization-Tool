"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Database,
  Zap,
  BarChart3,
  Settings,
  Users,
  Bell,
  FileText,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Cpu,
  Activity,
  Search,
  AlertTriangle,
  TrendingUp,
  Clock,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Database, label: "Databases", href: "/databases" },
  { icon: Zap, label: "Query Optimizer", href: "/optimizer" },
  { icon: Search, label: "Index Advisor", href: "/indexes" },
  { icon: Activity, label: "Performance", href: "/performance" },
  { icon: AlertTriangle, label: "Alerts", href: "/alerts" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Shield, label: "Security", href: "/security" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const performanceData = [
  { time: "00:00", queries: 1200, latency: 45, cpu: 35 },
  { time: "04:00", queries: 800, latency: 35, cpu: 25 },
  { time: "08:00", queries: 2400, latency: 65, cpu: 55 },
  { time: "12:00", queries: 3200, latency: 85, cpu: 75 },
  { time: "16:00", queries: 2800, latency: 70, cpu: 65 },
  { time: "20:00", queries: 1800, latency: 50, cpu: 40 },
];

const dbTypeData = [
  { name: "PostgreSQL", value: 45, color: "#3b82f6" },
  { name: "MySQL", value: 30, color: "#10b981" },
  { name: "MongoDB", value: 15, color: "#f59e0b" },
  { name: "Redis", value: 10, color: "#ef4444" },
];

const slowQueries = [
  { id: 1, query: "SELECT * FROM orders WHERE...", duration: "2.3s", rows: "1.2M", lastRun: "2 min ago" },
  { id: 2, query: "UPDATE inventory SET...", duration: "1.8s", rows: "850K", lastRun: "5 min ago" },
  { id: 3, query: "DELETE FROM logs WHERE...", duration: "1.5s", rows: "500K", lastRun: "12 min ago" },
];

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 h-screen glass-nav z-50 border-r"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
            <motion.div 
              className="flex items-center gap-3"
              animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="font-bold text-lg gradient-text">DBOptima</h1>
                  <p className="text-xs text-muted-foreground">King Group Of Technology</p>
                </div>
              )}
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-11 ${sidebarCollapsed ? "px-3" : "px-4"}`}
                  >
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Section */}
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">MJ</AvatarFallback>
              </Avatar>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Muhammad Jawad</p>
                  <p className="text-xs text-muted-foreground truncate">CEO & Founder</p>
                </div>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
      >
        {/* Header */}
        <header className="h-16 glass-nav sticky top-0 z-40 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Dashboard Overview</h1>
            <p className="text-sm text-muted-foreground">Real-time database performance monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Active Databases
                </CardDescription>
                <CardTitle className="text-3xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2 this month
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Query Performance
                </CardDescription>
                <CardTitle className="text-3xl">98.5%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5.2% improvement
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Avg CPU Usage
                </CardDescription>
                <CardTitle className="text-3xl">42.3%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-warning">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  +8% from last hour
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Avg Query Time
                </CardDescription>
                <CardTitle className="text-3xl">45ms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  -12ms optimized
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart */}
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Query volume and latency over last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Area type="monotone" dataKey="queries" stroke="#3b82f6" fillOpacity={1} fill="url(#colorQueries)" />
                    <Area type="monotone" dataKey="latency" stroke="#10b981" fillOpacity={1} fill="url(#colorLatency)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Database Distribution */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Database Distribution</CardTitle>
                <CardDescription>By query volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dbTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dbTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {dbTypeData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Slow Queries & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Slow Queries
                </CardTitle>
                <CardDescription>Queries exceeding 1 second execution time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slowQueries.map((query) => (
                    <div key={query.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{query.query}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{query.rows} rows</span>
                          <span>{query.lastRun}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-destructive">{query.duration}</p>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          Optimize
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  System Health
                </CardTitle>
                <CardDescription>Real-time system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "CPU Usage", value: 42, color: "bg-primary" },
                    { label: "Memory Usage", value: 68, color: "bg-success" },
                    { label: "Disk I/O", value: 35, color: "bg-warning" },
                    { label: "Network", value: 55, color: "bg-info" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{metric.label}</span>
                        <span className="font-medium">{metric.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${metric.color} transition-all duration-500`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <footer className="border-t border-border/50 pt-6 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <span className="font-semibold">DBOptima</span>
                <span className="text-muted-foreground">by King Group Of Technology</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 King Group Of Technology. Muhammad Jawad, CEO & Founder. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
