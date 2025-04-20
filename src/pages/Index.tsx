import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";
import { LeadTable } from "@/components/LeadTable";
import { Metrics } from "@/components/Metrics";
import { useToast } from "@/components/ui/use-toast";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
    address: "34 Jubilee Hills",
    area: "Jubilee Hills",
    city: "Hyderabad",
    pincode: "500033",
    notes: "Sports scholarship inquiry"
  },
  {
    id: "13",
    name: "Advait Menon",
    parentName: "Lakshmi Menon",
    phone: "9876543218",
    email: "lakshmi.menon@example.com",
    grade: "10",
    date: "2024-04-08T16:30:00Z",
    status: "Qualified",
    source: "Exhibition",
    address: "12 Poes Garden",
    area: "Poes Garden",
    city: "Chennai",
    pincode: "600086",
    notes: "Science stream interest"
  },
  {
    id: "14",
    name: "Myra Kapoor",
    parentName: "Sunita Kapoor",
    phone: "9876543219",
    email: "sunita.kapoor@example.com",
    grade: "1",
    date: "2024-04-07T10:30:00Z",
    status: "Contacted",
    source: "WalkIn",
    address: "67 Model Town",
    area: "Model Town",
    city: "Ludhiana",
    pincode: "141002",
    notes: "Primary education inquiry"
  },
  {
    id: "15",
    name: "Ved Mathur",
    parentName: "Anjali Mathur",
    phone: "9876543220",
    email: "anjali.mathur@example.com",
    grade: "8",
    date: "2024-04-06T11:30:00Z",
    status: "New",
    source: "Website",
    address: "45 Scheme 54",
    area: "Vijay Nagar",
    city: "Indore",
    pincode: "452010",
    notes: "Computer science focus"
  },
  {
    id: "16",
    name: "Anaya Reddy",
    parentName: "Kiran Reddy",
    phone: "9876543221",
    email: "kiran.reddy@example.com",
    grade: "11",
    date: "2024-04-05T14:30:00Z",
    status: "Enrolled",
    source: "Referral",
    address: "23 Banjara Hills",
    area: "Banjara Hills",
    city: "Hyderabad",
    pincode: "500034",
    notes: "Commerce stream admission"
  },
  {
    id: "17",
    name: "Vihaan Joshi",
    parentName: "Prerna Joshi",
    phone: "9876543222",
    email: "prerna.joshi@example.com",
    grade: "4",
    date: "2024-04-04T13:30:00Z",
    status: "Qualified",
    source: "Exhibition",
    address: "90 Aundh",
    area: "Aundh",
    city: "Pune",
    pincode: "411007",
    notes: "Extra-curricular activities"
  },
  {
    id: "18",
    name: "Aadhya Gupta",
    parentName: "Rajesh Gupta",
    phone: "9876543223",
    email: "rajesh.gupta@example.com",
    grade: "7",
    date: "2024-04-03T15:30:00Z",
    status: "New",
    source: "SocialMedia",
    address: "78 Salt Lake",
    area: "Salt Lake",
    city: "Kolkata",
    pincode: "700091",
    notes: "Language program interest"
  },
  {
    id: "19",
    name: "Kabir Malhotra",
    parentName: "Neeta Malhotra",
    phone: "9876543224",
    email: "neeta.malhotra@example.com",
    grade: "12",
    date: "2024-04-02T16:30:00Z",
    status: "Contacted",
    source: "Website",
    address: "56 Defence Colony",
    area: "Defence Colony",
    city: "Delhi",
    pincode: "110024",
    notes: "Science stream admission"
  },
  {
    id: "20",
    name: "Kiara Mehta",
    parentName: "Rohan Mehta",
    phone: "9876543225",
    email: "rohan.mehta@example.com",
    grade: "6",
    date: "2024-04-01T10:30:00Z",
    status: "New",
    source: "WalkIn",
    address: "34 Alkapuri",
    area: "Alkapuri",
    city: "Vadodara",
    pincode: "390007",
    notes: "School infrastructure inquiry"
  }
];

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
  notes: string;
};

const Index = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [open, setOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const savedLeads = localStorage.getItem("vidyasathi-leads");
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vidyasathi-leads", JSON.stringify(leads));
  }, [leads]);

  const handleAddLead = (data: any) => {
    if (editingLead) {
      setLeads(leads.map(lead => 
        lead.id === editingLead.id ? { ...data, id: editingLead.id } : lead
      ));
      toast({
        title: "Lead Updated",
        description: `${data.name}'s information has been updated.`,
      });
      setEditingLead(undefined);
    } else {
      const newLead = {
        ...data,
        id: `lead-${Date.now()}`
      };
      setLeads([newLead, ...leads]);
      toast({
        title: "Lead Added",
        description: `${newLead.name}'s information has been saved.`,
      });
    }
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setOpen(true);
  };

  const handleDeleteLead = (id: string) => {
    const leadToDelete = leads.find(lead => lead.id === id);
    setLeads(leads.filter(lead => lead.id !== id));
    toast({
      title: "Lead Deleted",
      description: `${leadToDelete?.name}'s information has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="flex-1 space-y-6 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
                <p className="text-muted-foreground">Keep track of all prospective admissions</p>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Lead
                  </Button>
                </DialogTrigger>
                <LeadForm 
                  onSubmit={handleAddLead} 
                  onClose={() => {
                    setOpen(false);
                    setEditingLead(undefined);
                  }}
                  initialData={editingLead}
                />
              </Dialog>
            </div>

            <Metrics leads={leads} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Student Leads</h2>
              </div>
              <LeadTable 
                leads={leads} 
                onDeleteLead={handleDeleteLead}
                onEditLead={handleEditLead}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
