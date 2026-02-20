"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Trash2,
  Database,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  Filter,
  Sparkles,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IndexRecommendation {
  id: string;
  tableName: string;
  columns: string[];
  type: string;
  reason: string;
  impact: "high" | "medium" | "low";
  estimatedImprovement: number;
  createdAt: string;
  status: "pending" | "applied" | "rejected";
}

const mockRecommendations: IndexRecommendation[] = [
  {
    id: "1",
    tableName: "orders",
    columns: ["customer_id", "order_date"],
    type: "B-tree Composite",
    reason: "Frequently used in WHERE and ORDER BY clauses",
    impact: "high",
    estimatedImprovement: 75,
    createdAt: "2 hours ago",
    status: "pending"
  },
  {
    id: "2",
    tableName: "products",
    columns: ["category_id"],
    type: "B-tree",
    reason: "Used in JOIN operations with categories table",
    impact: "medium",
    estimatedImprovement: 45,
    createdAt: "5 hours ago",
    status: "applied"
  },
  {
    id: "3",
    tableName: "order_items",
    columns: ["order_id", "product_id"],
    type: "Composite",
    reason: "Composite index for frequent lookups",
    impact: "high",
    estimatedImprovement: 60,
    createdAt: "1 day ago",
    status: "pending"
  },
  {
    id: "4",
    tableName: "customers",
    columns: ["email"],
    type: "Unique",
    reason: "Email lookups for authentication",
    impact: "medium",
    estimatedImprovement: 30,
    createdAt: "2 days ago",
    status: "rejected"
  },
];

const impactColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20"
};

const statusColors = {
  pending: "bg-muted text-muted-foreground",
  applied: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground"
};

export default function IndexAdvisorPage() {
  const [recommendations, setRecommendations] = useState<IndexRecommendation[]>(mockRecommendations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const filteredRecommendations = recommendations.filter(rec =>
    rec.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.columns.some(col => col.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleScan = () => {
    setIsScanning(true);
    toast({
      title: "Scanning Database",
      description: "Analyzing query patterns and table structures...",
    });
    
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Scan Complete",
        description: "Found 3 new index recommendations",
        variant: "success",
      });
    }, 3000);
  };

  const handleApply = (id: string) => {
    setRecommendations(recs => recs.map(rec =>
      rec.id === id ? { ...rec, status: "applied" } : rec
    ));
    toast({
      title: "Index Applied",
      description: "The index has been created successfully",
      variant: "success",
    });
  };

  const handleReject = (id: string) => {
    setRecommendations(recs => recs.map(rec =>
      rec.id === id ? { ...rec, status: "rejected" } : rec
    ));
    toast({
      title: "Recommendation Rejected",
      description: "The index recommendation has been dismissed",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
              <Search className="w-8 h-8 text-primary" />
              AI Index Advisor
            </h1>
            <p className="text-muted-foreground">
              Intelligent index recommendations based on query analysis
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleScan}
              disabled={isScanning}
              className="gap-2"
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Scan Database
                </>
              )}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">
                    {recommendations.filter(r => r.status === "pending").length}
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
                  <p className="text-sm text-muted-foreground">Applied</p>
                  <p className="text-2xl font-bold text-success">
                    {recommendations.filter(r => r.status === "applied").length}
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
                  <p className="text-sm text-muted-foreground">High Impact</p>
                  <p className="text-2xl font-bold text-destructive">
                    {recommendations.filter(r => r.impact === "high").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Improvement</p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round(recommendations.reduce((acc, r) => acc + r.estimatedImprovement, 0) / recommendations.length)}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
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
              placeholder="Search recommendations..."
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

        {/* Recommendations */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="high-impact">High Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Database className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-lg">{rec.tableName}</h3>
                            <Badge className={impactColors[rec.impact]}>
                              {rec.impact} impact
                            </Badge>
                            <Badge className={statusColors[rec.status]}>
                              {rec.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-muted-foreground">Columns:</span>
                            {rec.columns.map(col => (
                              <Badge key={col} variant="secondary">{col}</Badge>
                            ))}
                            <Badge variant="outline">{rec.type}</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {rec.reason}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-success" />
                              <span>+{rec.estimatedImprovement}% improvement</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{rec.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        
                        {rec.status === "pending" && (
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => handleApply(rec.id)}
                              className="gap-1"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Apply
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(rec.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filteredRecommendations
                .filter(r => r.status === "pending")
                .map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Database className="w-5 h-5 text-primary" />
                              <h3 className="font-semibold text-lg">{rec.tableName}</h3>
                              <Badge className={impactColors[rec.impact]}>
                                {rec.impact} impact
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm text-muted-foreground">Columns:</span>
                              {rec.columns.map(col => (
                                <Badge key={col} variant="secondary">{col}</Badge>
                              ))}
                              <Badge variant="outline">{rec.type}</Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {rec.reason}
                            </p>
                            
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-success" />
                                <span>+{rec.estimatedImprovement}% improvement</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => handleApply(rec.id)}
                              className="gap-1"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Apply
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(rec.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Best Practices */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Index Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Selective Columns", desc: "Index columns used in WHERE, JOIN, and ORDER BY", icon: Search },
                { title: "Cardinality", desc: "Index columns with high cardinality (many unique values)", icon: BarChart3 },
                { title: "Composite Index", desc: "Use composite indexes for multi-column queries", icon: Database },
                { title: "Maintenance", desc: "Regularly monitor and rebuild fragmented indexes", icon: Clock },
              ].map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-muted/50"
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
