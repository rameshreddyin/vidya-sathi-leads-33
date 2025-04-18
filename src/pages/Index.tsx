
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";
import { LeadTable } from "@/components/LeadTable";
import { Metrics } from "@/components/Metrics";
import { useToast } from "@/components/ui/use-toast";

// Sample data for initial demo
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
    address: "123 Main St, Delhi",
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
    address: "456 Oak St, Mumbai",
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
    address: "789 Pine St, Chandigarh",
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
    address: "101 Elm St, Hyderabad",
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
    address: "202 Cedar St, Bangalore",
    notes: "Decided to go with another school"
  }
];

const Index = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Persist leads to localStorage
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
    const newLead = {
      ...data,
      id: `lead-${Date.now()}`
    };
    setLeads([newLead, ...leads]);
    toast({
      title: "Lead Added",
      description: `${newLead.name}'s information has been saved.`,
    });
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
            <p className="text-muted-foreground">Keep track of all prospective admissions</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-education-600 hover:bg-education-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </DialogTrigger>
            <LeadForm onSubmit={handleAddLead} onClose={() => setOpen(false)} />
          </Dialog>
        </div>

        <Metrics leads={leads} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Student Leads</h2>
          </div>
          <LeadTable leads={leads} onDeleteLead={handleDeleteLead} />
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>VidyaSathi Lead Manager - Simplifying school admissions</p>
      </footer>
    </div>
  );
};

export default Index;
