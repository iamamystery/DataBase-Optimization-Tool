"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Mail,
  Shield,
  UserCog,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  ArrowRight,
  Crown,
  Database,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "DBA" | "Developer" | "Viewer";
  status: "active" | "invited" | "inactive";
  lastActive: string;
  avatar?: string;
}

const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "Muhammad Jawad",
    email: "jawad@kingtech.com",
    role: "Admin",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Sarah Ahmed",
    email: "sarah@kingtech.com",
    role: "DBA",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@kingtech.com",
    role: "Developer",
    status: "active",
    lastActive: "5 minutes ago",
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily@kingtech.com",
    role: "Viewer",
    status: "invited",
    lastActive: "Not yet",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@kingtech.com",
    role: "Developer",
    status: "inactive",
    lastActive: "3 days ago",
  },
];

const roleConfig = {
  Admin: {
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    icon: Crown,
    description: "Full system access"
  },
  DBA: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Database,
    description: "Database management"
  },
  Developer: {
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: Activity,
    description: "Query optimization"
  },
  Viewer: {
    color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    icon: User,
    description: "Read-only access"
  }
};

const statusConfig = {
  active: {
    color: "bg-success/10 text-success",
    icon: CheckCircle2
  },
  invited: {
    color: "bg-warning/10 text-warning",
    icon: Clock
  },
  inactive: {
    color: "bg-muted text-muted-foreground",
    icon: XCircle
  }
};

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<TeamMember["role"]>("Developer");
  const { toast } = useToast();

  const filteredTeam = team.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvite = () => {
    const newMember: TeamMember = {
      id: String(team.length + 1),
      name: newMemberEmail.split("@")[0],
      email: newMemberEmail,
      role: newMemberRole,
      status: "invited",
      lastActive: "Not yet",
    };
    
    setTeam([...team, newMember]);
    setIsInviteDialogOpen(false);
    setNewMemberEmail("");
    
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${newMemberEmail}`,
      variant: "success"
    });
  };

  const handleRoleChange = (id: string, newRole: TeamMember["role"]) => {
    setTeam(team.map(member =>
      member.id === id ? { ...member, role: newRole } : member
    ));
    toast({
      title: "Role Updated",
      description: `Member role has been updated to ${newRole}`,
      variant: "success"
    });
  };

  const handleRemove = (id: string) => {
    setTeam(team.filter(member => member.id !== id));
    toast({
      title: "Member Removed",
      description: "Team member has been removed",
    });
  };

  return (
    <DashboardLayout title="Team Management" description="Manage team members and their access permissions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text flex items-center gap-3">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              Team Management
            </h1>
            <p className="text-muted-foreground">
              Manage team members and their access permissions
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export List
            </Button>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your team.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@company.com"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newMemberRole} onValueChange={(v: TeamMember["role"]) => setNewMemberRole(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="DBA">DBA</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleInvite}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{team.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-success">
                    {team.filter(m => m.status === "active").length}
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
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">
                    {team.filter(m => m.status === "invited").length}
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
                  <p className="text-sm text-muted-foreground">Admins</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {team.filter(m => m.role === "Admin").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
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
              placeholder="Search team members..."
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

        {/* Team List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage your team and their access levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTeam.map((member, index) => {
                const role = roleConfig[member.role];
                const status = statusConfig[member.status];
                
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{member.name}</h4>
                          <Badge className={status.color}>
                            <status.icon className="w-3 h-3 mr-1" />
                            {member.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Badge className={role.color}>
                          <role.icon className="w-3 h-3 mr-1" />
                          {member.role}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {role.description}
                        </span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground w-24">
                        {member.lastActive}
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
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Resend Invite
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCog className="w-4 h-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleRemove(member.id)}
                            className="text-destructive"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Role Guide */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Understanding access levels and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(roleConfig).map(([role, config]) => (
                <div key={role} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color}`}>
                      <config.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">{role}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {role === "Admin" && (
                      <>
                        <li>• Full system access</li>
                        <li>• User management</li>
                        <li>• Billing control</li>
                        <li>• All databases</li>
                      </>
                    )}
                    {role === "DBA" && (
                      <>
                        <li>• Database management</li>
                        <li>• Index optimization</li>
                        <li>• Query tuning</li>
                        <li>• Performance monitoring</li>
                      </>
                    )}
                    {role === "Developer" && (
                      <>
                        <li>• Query analysis</li>
                        <li>• Optimization tools</li>
                        <li>• View metrics</li>
                        <li>• Create reports</li>
                      </>
                    )}
                    {role === "Viewer" && (
                      <>
                        <li>• View dashboards</li>
                        <li>• Read-only access</li>
                        <li>• Generate reports</li>
                        <li>• No modifications</li>
                      </>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
