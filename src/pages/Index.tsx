
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";
import { LeadTable } from "@/components/LeadTable";
import { Metrics } from "@/components/Metrics";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/pages/UserManagement";
import { Lead, ContactHistoryEntry } from "@/types";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

const initialLeads = [
  {
    id: "1",
    name: "Aarav Sharma",
    parentName: "Rajesh Sharma",
    phone: "9876543210",
    email: "rajesh.sharma@example.com",
    grade: "8",
    date: "2023-03-15T10:30:00Z",
    status: "New",
    source: "Website",
    address: "123 Main St",
    area: "Vasant Kunj",
    city: "Delhi",
    pincode: "110070",
    notes: "Interested in school's science program"
  }, 
  {
    id: "2",
    name: "Priya Patel",
    parentName: "Amit Patel",
    phone: "8765432109",
    email: "amit.patel@example.com",
    grade: "5",
    date: "2023-03-10T14:45:00Z",
    status: "Contacted",
    source: "Referral",
    address: "456 Oak St",
    area: "Bandra",
    city: "Mumbai",
    pincode: "400050",
    notes: "Wants to know about extracurricular activities"
  }, 
  {
    id: "3",
    name: "Arjun Singh",
    parentName: "Gurmeet Singh",
    phone: "7654321098",
    email: "gurmeet.singh@example.com",
    grade: "10",
    date: "2023-03-05T09:15:00Z",
    status: "Qualified",
    source: "Exhibition",
    address: "789 Pine St",
    area: "Sector 17",
    city: "Chandigarh",
    pincode: "160017",
    notes: "Looking for strong academic program"
  }, 
  {
    id: "4",
    name: "Ananya Reddy",
    parentName: "Vikram Reddy",
    phone: "6543210987",
    email: "vikram.reddy@example.com",
    grade: "1",
    date: "2023-03-01T11:00:00Z",
    status: "Enrolled",
    source: "WalkIn",
    address: "101 Elm St",
    area: "Jubilee Hills",
    city: "Hyderabad",
    pincode: "500033",
    notes: "Starting in the new semester"
  }, 
  {
    id: "5",
    name: "Rohit Kapoor",
    parentName: "Neha Kapoor",
    phone: "5432109876",
    email: "neha.kapoor@example.com",
    grade: "3",
    date: "2023-02-25T13:30:00Z",
    status: "Closed",
    source: "Advertisement",
    address: "202 Cedar St",
    area: "Indiranagar",
    city: "Bangalore",
    pincode: "560038",
    notes: "Decided to go with another school"
  }, 
  {
    id: "6",
    name: "Meera Verma",
    parentName: "Rahul Verma",
    phone: "9876543211",
    email: "rahul.verma@example.com",
    grade: "4",
    date: "2024-04-15T10:30:00Z",
    status: "New",
    source: "Website",
    address: "42 Park Street",
    area: "Koregaon Park",
    city: "Pune",
    pincode: "411001",
    notes: "Interested in sports program"
  }, 
  {
    id: "7",
    name: "Aryan Kumar",
    parentName: "Priya Kumar",
    phone: "9876543212",
    email: "priya.kumar@example.com",
    grade: "9",
    date: "2024-04-14T11:30:00Z",
    status: "Contacted",
    source: "Referral",
    address: "15 MG Road",
    area: "Indiranagar",
    city: "Bangalore",
    pincode: "560038",
    notes: "Looking for STEM focus"
  }, 
  {
    id: "8",
    name: "Sara Ali",
    parentName: "Imran Ali",
    phone: "9876543213",
    email: "imran.ali@example.com",
    grade: "6",
    date: "2024-04-13T09:30:00Z",
    status: "Qualified",
    source: "Exhibition",
    address: "78 Hill Road",
    area: "Bandra West",
    city: "Mumbai",
    pincode: "400050",
    notes: "Interested in music program"
  }, 
  {
    id: "9",
    name: "Aditya Singh",
    parentName: "Kavita Singh",
    phone: "9876543214",
    email: "kavita.singh@example.com",
    grade: "2",
    date: "2024-04-12T14:30:00Z",
    status: "New",
    source: "WalkIn",
    address: "25 Civil Lines",
    area: "Civil Lines",
    city: "Delhi",
    pincode: "110054",
    notes: "Seeking admission next term"
  }, 
  {
    id: "10",
    name: "Riya Patel",
    parentName: "Mehul Patel",
    phone: "9876543215",
    email: "mehul.patel@example.com",
    grade: "7",
    date: "2024-04-11T13:30:00Z",
    status: "Contacted",
    source: "Website",
    address: "56 Ring Road",
    area: "Satellite",
    city: "Ahmedabad",
    pincode: "380015",
    notes: "International curriculum inquiry"
  }, 
  {
    id: "11",
    name: "Ishaan Sharma",
    parentName: "Deepak Sharma",
    phone: "9876543216",
    email: "deepak.sharma@example.com",
    grade: "5",
    date: "2024-04-10T15:30:00Z",
    status: "Enrolled",
    source: "Referral",
    address: "89 Lake Gardens",
    area: "Lake Gardens",
    city: "Kolkata",
    pincode: "700045",
    notes: "Confirmed admission"
  }, 
  {
    id: "12",
    name: "Zara Khan",
    parentName: "Asif Khan",
    phone: "9876543217",
    email: "asif.khan@example.com",
    grade: "3",
    date: "2024-04-09T12:30:00Z",
    status: "New",
    source: "SocialMedia",
    address: "34 MG Road",
    area: "Deccan",
    city: "Pune",
    pincode: "411004",
    notes: "Looking for after-school programs"
  }
];

function Index() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [contactHistory, setContactHistory] = useState<Record<string, ContactHistoryEntry[]>>({});
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined);

  const handleAddLead = (data: Lead) => {
    const newLead = {
      ...data,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      status: "New"
    };
    setLeads([newLead, ...leads]);
    toast({
      title: "Success",
      description: "New lead has been added",
    });
  };

  const handleEditLead = (data: Lead) => {
    setLeads(
      leads.map((lead) => (lead.id === data.id ? { ...data } : lead))
    );
    toast({
      title: "Success",
      description: "Lead has been updated",
    });
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
    toast({
      title: "Success",
      description: "Lead has been deleted",
    });
  };

  const handleOpenEditDialog = (lead: Lead) => {
    setEditingLead(lead);
    setIsOpen(true);
  };

  const handleAddContactHistory = (leadId: string, entry: Omit<ContactHistoryEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: `contact-${Date.now()}`
    };
    
    setContactHistory(prev => ({
      ...prev,
      [leadId]: [...(prev[leadId] || []), newEntry]
    }));
    
    // Update lead status
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: entry.status }
        : lead
    ));
    
    toast({
      title: "Contact Recorded",
      description: "Contact history has been updated",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            <Tabs defaultValue="dashboard" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-education-600 hover:bg-education-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Lead
                    </Button>
                  </DialogTrigger>
                  <LeadForm 
                    onSubmit={editingLead ? handleEditLead : handleAddLead} 
                    onClose={() => {
                      setIsOpen(false);
                      setEditingLead(undefined);
                    }}
                    initialData={editingLead}
                  />
                </Dialog>
              </div>
              
              <TabsContent value="dashboard" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">VidyaSathi Dashboard</h2>
                <Metrics leads={leads} />
              </TabsContent>
              
              <TabsContent value="leads" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Manage Leads</h2>
                <LeadTable 
                  leads={leads} 
                  onDeleteLead={handleDeleteLead} 
                  onEditLead={handleOpenEditDialog}
                  onAddContactHistory={handleAddContactHistory}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
                <AnalyticsDashboard leads={leads} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Index;
