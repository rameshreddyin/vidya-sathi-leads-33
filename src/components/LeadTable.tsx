import { useState } from "react";
import { 
  ArrowUpDown, MoreHorizontal, Search, Filter, 
  Check, X, Phone, Mail, Edit, Trash, MapPin, GraduationCap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Lead = {
  id: string;
  name: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  grade: string;
  date: string;
  status: string;
  source: string;
};

export function LeadTable({ leads, onDeleteLead, onEditLead }: { 
  leads: Lead[]; 
  onDeleteLead: (id: string) => void;
  onEditLead: (lead: Lead) => void;
}) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Lead; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const { toast } = useToast();

  const uniqueAreas = Array.from(new Set(leads.map(lead => lead.area)));
  const uniqueGrades = Array.from(new Set(leads.map(lead => lead.grade))).sort((a, b) => Number(a) - Number(b));

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredLeads = sortedLeads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    const matchesArea = areaFilter === "all" || lead.area === areaFilter;
    const matchesGrade = gradeFilter === "all" || lead.grade === gradeFilter;
    
    return matchesSearch && matchesStatus && matchesSource && matchesArea && matchesGrade;
  });

  const requestSort = (key: keyof Lead) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-blue-500">New</Badge>;
      case "Contacted":
        return <Badge className="bg-yellow-500">Contacted</Badge>;
      case "Qualified":
        return <Badge className="bg-teal-500">Qualified</Badge>;
      case "Enrolled":
        return <Badge className="bg-green-600">Enrolled</Badge>;
      case "Closed":
        return <Badge variant="outline" className="text-gray-500">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleStatusUpdate = (leadId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Lead status has been changed to ${newStatus}`,
    });
  };

  const handleSendEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
    toast({
      title: "Email Client Opened",
      description: "Your default email client has been opened.",
    });
  };

  const handleCallLog = (phone: string) => {
    toast({
      title: "Call Logged",
      description: `Initiating call to ${phone}`,
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Enrolled">Enrolled</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Area</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {uniqueAreas.map((area) => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Grade</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {uniqueGrades.map((grade) => (
                <SelectItem key={grade} value={grade}>Class {grade}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Source</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="WalkIn">Walk-in</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="SocialMedia">Social Media</SelectItem>
              <SelectItem value="Advertisement">Advertisement</SelectItem>
              <SelectItem value="Exhibition">Exhibition</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => requestSort('name')} className="cursor-pointer w-[180px]">
                <div className="flex items-center">
                  Student Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => requestSort('parentName')} className="cursor-pointer">
                <div className="flex items-center">
                  Parent Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead onClick={() => requestSort('area')} className="cursor-pointer">
                <div className="flex items-center">
                  Area
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => requestSort('city')} className="cursor-pointer">
                <div className="flex items-center">
                  City
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.parentName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8" 
                        title={lead.phone}
                        onClick={() => handleCallLog(lead.phone)}
                      >
                        <Phone className="h-4 w-4 text-education-600" />
                      </Button>
                      {lead.email && (
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8" 
                          title={lead.email}
                          onClick={() => handleSendEmail(lead.email)}
                        >
                          <Mail className="h-4 w-4 text-education-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{lead.area}</TableCell>
                  <TableCell>{lead.city}</TableCell>
                  <TableCell>Class {lead.grade}</TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEditLead(lead)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Lead Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, "Contacted")}>
                          <Phone className="mr-2 h-4 w-4 text-blue-500" />
                          <span>Mark as Contacted</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, "Enrolled")}>
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                          <span>Mark as Enrolled</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, "Closed")}>
                          <X className="mr-2 h-4 w-4 text-gray-500" />
                          <span>Mark as Closed</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Communication</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleSendEmail(lead.email)}>
                          <Mail className="mr-2 h-4 w-4 text-education-600" />
                          <span>Send Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCallLog(lead.phone)}>
                          <Phone className="mr-2 h-4 w-4 text-education-600" />
                          <span>Log Call</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDeleteLead(lead.id)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete Lead</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
