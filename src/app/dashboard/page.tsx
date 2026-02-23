"use client";

import { motion } from "framer-motion";
import {
  Database,
  Zap,
  Cpu,
  AlertTriangle,
  TrendingUp,
  Clock,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { DashboardLayout } from "@/components/dashboard-layout";

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
  return (
    <DashboardLayout title="Dashboard Overview" description="Real-time database performance monitoring">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Active Databases
              </CardDescription>
              <CardTitle className="text-2xl md:text-3xl">12</CardTitle>
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
              <CardTitle className="text-2xl md:text-3xl">98.5%</CardTitle>
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
              <CardTitle className="text-2xl md:text-3xl">42.3%</CardTitle>
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
              <CardTitle className="text-2xl md:text-3xl">45ms</CardTitle>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Performance Chart */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Query volume and latency over last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
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
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Area type="monotone" dataKey="queries" stroke="#3b82f6" fillOpacity={1} fill="url(#colorQueries)" />
                    <Area type="monotone" dataKey="latency" stroke="#10b981" fillOpacity={1} fill="url(#colorLatency)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Database Distribution */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Database Distribution</CardTitle>
              <CardDescription>By query volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dbTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
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
              </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{query.rows} rows</span>
                        <span>{query.lastRun}</span>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-sm font-semibold text-destructive">{query.duration}</p>
                      <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <span className="font-semibold">DBOptima</span>
              <span className="text-muted-foreground hidden sm:inline">by King Group Of Technology</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2024 King Group Of Technology. Muhammad Jawad, CEO & Founder. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}
