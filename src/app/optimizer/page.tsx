"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Play,
  Sparkles,
  Clock,
  Database,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  History,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Code2,
  RotateCcw,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const performanceComparison = [
  { metric: "Execution Time", before: 2300, after: 450, unit: "ms" },
  { metric: "CPU Usage", before: 85, after: 35, unit: "%" },
  { metric: "Memory", before: 1200, after: 400, unit: "MB" },
  { metric: "IO Operations", before: 15000, after: 2500, unit: "ops" },
];

const historicalData = [
  { time: "Before", performance: 45 },
  { time: "After Index", performance: 65 },
  { time: "After Rewrite", performance: 85 },
  { time: "After Cache", performance: 95 },
];

export default function QueryOptimizerPage() {
  const [query, setQuery] = useState(`SELECT 
    o.order_id,
    o.order_date,
    c.customer_name,
    c.customer_email,
    p.product_name,
    p.product_price,
    oi.quantity,
    (p.product_price * oi.quantity) as total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC`);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState<null | {
    optimizedQuery: string;
    improvements: string[];
    estimatedImprovement: number;
    issues: string[];
  }>(null);
  
  const { toast } = useToast();

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setOptimizationResults({
        optimizedQuery: `SELECT 
    o.order_id,
    o.order_date,
    c.customer_name,
    c.customer_email,
    p.product_name,
    p.product_price,
    oi.quantity,
    (p.product_price * oi.quantity) as total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2024-01-01'
    AND o.status = 'completed'
ORDER BY o.order_date DESC
LIMIT 1000`,
        improvements: [
          "Added LIMIT clause to prevent large result sets",
          "Changed JOIN to INNER JOIN for better performance",
          "Added status filter to reduce scanned rows",
          "Consider adding composite index: (order_date, status)",
          "Query can benefit from covering index on joined tables"
        ],
        estimatedImprovement: 85,
        issues: [
          "Missing LIMIT clause can cause memory issues",
          "No index on order_date causing full table scan",
          "JOIN conditions not optimized",
          "Large result set may impact application performance"
        ]
      });
      
      toast({
        title: "Analysis Complete",
        description: "Query optimization recommendations are ready",
        variant: "success",
      });
    }, 2500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Query has been copied to your clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
              <Zap className="w-8 h-8 text-warning" />
              AI Query Optimizer
            </h1>
            <p className="text-muted-foreground">
              Analyze and optimize your SQL queries with AI-powered recommendations
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <History className="w-4 h-4" />
              History
            </Button>
            <Button variant="outline" className="gap-2">
              <Save className="w-4 h-4" />
              Save Query
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Query Input */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Original Query
              </CardTitle>
              <CardDescription>
                Paste your SQL query for AI analysis and optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={query}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Enter your SQL query here..."
              />
              <div className="flex gap-3">
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !query.trim()}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setQuery("")}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Optimization Results */}
          {optimizationResults ? (
            <Card className="glass-card border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-5 h-5" />
                  Optimized Query
                </CardTitle>
                <CardDescription>
                  AI-recommended optimizations with {optimizationResults.estimatedImprovement}% estimated improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={optimizationResults.optimizedQuery}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-success/5 border-success/20"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(optimizationResults.optimizedQuery)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" variant="default">
                    <Play className="w-4 h-4" />
                    Execute Optimized
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to Optimize</h3>
                <p className="text-muted-foreground max-w-sm">
                  Enter a SQL query and click "Analyze with AI" to get optimization recommendations
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analysis Results */}
        {optimizationResults && (
          <Tabs defaultValue="improvements" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="issues">Issues Found</TabsTrigger>
              <TabsTrigger value="performance">Performance Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="improvements" className="mt-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {optimizationResults.improvements.map((improvement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/20"
                      >
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{improvement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="issues" className="mt-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    Issues Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {optimizationResults.issues.map((issue, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                      >
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Performance Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceComparison} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="metric" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="before" fill="#ef4444" name="Before" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="after" fill="#10b981" name="After" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Optimization Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="performance" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Quick Tips */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Optimization Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Use Indexes", desc: "Add indexes on frequently queried columns", icon: Zap },
                { title: "Limit Results", desc: "Always use LIMIT for large datasets", icon: Clock },
                { title: "Avoid SELECT *", desc: "Select only needed columns", icon: Code2 },
                { title: "Analyze Queries", desc: "Use EXPLAIN to understand execution plans", icon: BarChart3 },
              ].map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <tip.icon className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
