import { useState } from "react";
import { 
  ArrowUpDown, MoreHorizontal, Search, Filter,
  Check, X, Phone, Mail, Edit, Trash, Download,
  MessageSquare,
  WhatsApp,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ContactHistoryDialog } from "./ContactHistoryDialog";
import { Lead, ContactHistoryEntry } from "@/types";

export function LeadTable({ leads, onDeleteLead, onEditLead, onAddContactHistory }: { 
  leads: Lead[]; 
  onDeleteLead: (id: string) => void;
  onEditLead: (lead: Lead) => void;
  onAddContactHistory: (leadId: string, entry: Omit<ContactHistoryEntry, 'id'>) => void;
}) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<{ key: keyof Lead; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const itemsPerPage = 10;
  const { toast } = useToast();

  const uniqueAreas = Array.from(new Set(leads.map(lead => lead.area)));
  const uniqueGrades = Array.from(new Set(leads.map(lead => lead.grade))).sort((a, b) => Number(a) - Number(b));

  const requestSort = (key: keyof Lead) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

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

  const exportToCSV = () => {
    const headers = ['Name', 'Parent Name', 'Phone', 'Email', 'Area', 'City', 'Grade', 'Status', 'Date'];
    const data = filteredLeads.map(lead => [
      lead.name,
      lead.parentName,
      lead.phone,
      lead.email,
      lead.area,
      lead.city,
      lead.grade,
      lead.status,
      format(new Date(lead.date), 'yyyy-MM-dd')
    ]);

    const csvContent = [headers, ...data]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "The leads data has been exported to CSV",
    });
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

  const handleStatusUpdate = (leadId: string, newStatus: string) => {
    // Find the lead to update
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      // Create a contact history entry for the status update
      onAddContactHistory(leadId, {
        leadId,
        type: 'Other',
        notes: `Status updated to ${newStatus}`,
        status: newStatus,
        date: new Date().toISOString()
      });
    }
    
    toast({
      title: "Status Updated",
      description: `Lead status has been changed to ${newStatus}`,
    });
  };

  const handleSendEmail = (email: string, leadId?: string) => {
    window.location.href = `mailto:${email}`;
    
    // If we have a lead ID, open the contact dialog to log the email
    if (leadId) {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        setSelectedLead(lead);
        setContactDialogOpen(true);
      }
    }
    
    toast({
      title: "Email Client Opened",
      description: "Your default email client has been opened.",
    });
  };

  const handleCallLog = (phone: string, leadId?: string) => {
    // If we have a lead ID, open the contact dialog to log the call
    if (leadId) {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        setSelectedLead(lead);
        setContactDialogOpen(true);
      }
    }
    
    toast({
      title: "Call Logged",
      description: `Initiating call to ${phone}`,
    });
  };

  const handleSaveContactHistory = (entry: Omit<ContactHistoryEntry, 'id'>) => {
    if (selectedLead) {
      onAddContactHistory(selectedLead.id, entry);
      setContactDialogOpen(false);
      setSelectedLead(null);
    }
  };

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const handleWhatsAppClick = (phone: string, leadId?: string) => {
    // Format phone number (remove spaces, ensure it starts with country code)
    const formattedPhone = phone.replace(/\s+/g, '');
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    window.open(whatsappUrl, '_blank');

    // If we have a lead ID, open the contact dialog to log the interaction
    if (leadId) {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        setSelectedLead(lead);
        setContactDialogOpen(true);
      }
    }
    
    toast({
      title: "WhatsApp Opening",
      description: "Opening WhatsApp chat window",
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads..."
            className="pl-9 bg-white border-gray-200 hover:border-gray-300 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Filter className="h-4 w-4 text-gray-500 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Status</h4>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select status" />
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
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Area</h4>
                  <Select value={areaFilter} onValueChange={setAreaFilter}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      {uniqueAreas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Grade</h4>
                  <Select value={gradeFilter} onValueChange={setGradeFilter}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      {uniqueGrades.map((grade) => (
                        <SelectItem key={grade} value={grade}>Class {grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Source</h4>
                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select source" />
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
            </PopoverContent>
          </Popover>

          <Button 
            variant="outline" 
            onClick={exportToCSV}
            className="bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="h-4 w-4 mr-2 text-gray-500" />
            Export
          </Button>
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
            {paginatedLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    <button
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className="text-left hover:text-primary hover:underline"
                    >
                      {lead.name}
                    </button>
                  </TableCell>
                  <TableCell>{lead.parentName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8" 
                        title={lead.phone}
                        onClick={() => handleCallLog(lead.phone, lead.id)}
                      >
                        <Phone className="h-4 w-4 text-education-600" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8" 
                        title="Open in WhatsApp"
                        onClick={() => handleWhatsAppClick(lead.phone, lead.id)}
                      >
                        <WhatsApp className="h-4 w-4 text-green-500" />
                      </Button>
                      {lead.email && (
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8" 
                          title={lead.email}
                          onClick={() => handleSendEmail(lead.email, lead.id)}
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
                        <DropdownMenuItem onClick={() => handleSendEmail(lead.email, lead.id)}>
                          <Mail className="mr-2 h-4 w-4 text-education-600" />
                          <span>Send Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCallLog(lead.phone, lead.id)}>
                          <Phone className="mr-2 h-4 w-4 text-education-600" />
                          <span>Log Call</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedLead(lead);
                            setContactDialogOpen(true);
                          }}
                        >
                          <MessageSquare className="mr-2 h-4 w-4 text-education-600" />
                          <span>Add Contact Record</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleWhatsAppClick(lead.phone, lead.id)}>
                          <WhatsApp className="mr-2 h-4 w-4 text-green-500" />
                          <span>Open WhatsApp</span>
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

      <div className="mt-4 flex items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
      {selectedLead && (
        <ContactHistoryDialog 
          open={contactDialogOpen} 
          onOpenChange={setContactDialogOpen}
          onSave={handleSaveContactHistory}
          leadId={selectedLead.id}
          leadName={selectedLead.name}
        />
      )}
    </div>
  );
}
