
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit, 
  Clock,
  MessageSquare,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";
import { ContactHistoryDialog } from "@/components/ContactHistoryDialog";
import { ContactHistoryList } from "@/components/ContactHistoryList";
import { ReminderDialog } from "@/components/ReminderDialog";
import { ReminderList } from "@/components/ReminderList";
import { Lead, ContactHistoryEntry, Reminder } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [lead, setLead] = useState<Lead | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [contactHistory, setContactHistory] = useState<ContactHistoryEntry[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Mock data fetch - in production, this would be an API call
  useEffect(() => {
    // Simulate API call to get lead details
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      const leads = JSON.parse(storedLeads);
      const foundLead = leads.find((lead: Lead) => lead.id === id);
      if (foundLead) {
        setLead(foundLead);
      }
    }

    // Simulate fetching contact history
    const mockContactHistory = [
      {
        id: "ch1",
        leadId: id || "",
        type: "Phone Call" as const,
        notes: "Discussed admission requirements and fee structure",
        status: "Contacted",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "ch2",
        leadId: id || "",
        type: "Email" as const,
        notes: "Sent brochure and application form",
        status: "Information Sent",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    setContactHistory(mockContactHistory);

    // Simulate fetching reminders
    const mockReminders = [
      {
        id: "r1",
        leadId: id || "",
        title: "Follow-up call",
        description: "Call to check if they've reviewed the brochure",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        isCompleted: false
      }
    ];
    setReminders(mockReminders);
  }, [id]);

  if (!lead) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-xl mb-4">Lead not found</h2>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-education-600 hover:bg-education-700"
                >
                  Back to Dashboard
                </Button>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const handleEditLead = (updatedLead: Lead) => {
    setLead(updatedLead);
    // In production, this would be an API call
    toast({
      title: "Lead Updated",
      description: "Lead information has been updated successfully",
    });
  };

  const handleAddContactHistory = (entry: Omit<ContactHistoryEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: `ch-${Date.now()}`
    };
    setContactHistory([newEntry, ...contactHistory]);
    // Update lead status if needed
    if (entry.status && entry.status !== lead.status) {
      setLead({ ...lead, status: entry.status });
    }
    toast({
      title: "Contact Recorded",
      description: "Contact history has been added successfully",
    });
  };

  const handleAddReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: `rem-${Date.now()}`
    };
    setReminders([...reminders, newReminder]);
    toast({
      title: "Reminder Set",
      description: "A new reminder has been set",
    });
  };

  const handleToggleReminder = (reminderId: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, isCompleted: !reminder.isCompleted }
        : reminder
    ));
    toast({
      title: "Reminder Updated",
      description: "Reminder status has been updated",
    });
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
    toast({
      title: "Reminder Deleted",
      description: "Reminder has been deleted",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => navigate('/')}
                    className="h-8 w-8 rounded-full bg-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h1 className="text-2xl font-bold">Lead Details</h1>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="bg-white"
                    onClick={() => setIsReminderDialogOpen(true)}
                  >
                    <Bell className="h-4 w-4 mr-2 text-education-600" />
                    Set Reminder
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white"
                    onClick={() => setIsContactDialogOpen(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 text-education-600" />
                    Add Contact
                  </Button>
                  <Button 
                    onClick={() => setIsEditDialogOpen(true)}
                    className="bg-education-600 hover:bg-education-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Lead
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Student Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarFallback className="text-2xl bg-education-100 text-education-600">
                          {lead.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-semibold">{lead.name}</h2>
                      <Badge className="mt-2">{lead.status}</Badge>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-1 text-education-600" />
                        <div>
                          <p className="text-sm font-medium">Lead Date</p>
                          <p className="text-sm text-gray-500">
                            {new Date(lead.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-education-600" />
                        <div>
                          <p className="text-sm font-medium">Grade Interested In</p>
                          <p className="text-sm text-gray-500">Class {lead.grade}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 mt-1 text-education-600" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-500">{lead.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 mt-1 text-education-600" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1 text-education-600" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-gray-500">
                            {lead.address}, {lead.area}, {lead.city}, {lead.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="md:col-span-2 space-y-6">
                  <Tabs defaultValue="contact" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="contact">Contact History</TabsTrigger>
                      <TabsTrigger value="reminders">Reminders</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="contact">
                      <ContactHistoryList 
                        contactHistory={contactHistory}
                        onAddContact={() => setIsContactDialogOpen(true)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="reminders">
                      <ReminderList 
                        reminders={reminders}
                        onAddReminder={() => setIsReminderDialogOpen(true)}
                        onToggleComplete={handleToggleReminder}
                        onDeleteReminder={handleDeleteReminder}
                      />
                    </TabsContent>
                    
                    <TabsContent value="notes">
                      <Card>
                        <CardHeader>
                          <CardTitle>Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{lead.notes || "No notes added yet."}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Parent/Guardian Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p className="text-gray-600">{lead.parentName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Contact</p>
                          <p className="text-gray-600">{lead.phone}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-gray-600">{lead.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Lead Source</p>
                          <p className="text-gray-600">{lead.source}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Edit Lead Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <LeadForm 
          onSubmit={handleEditLead} 
          onClose={() => setIsEditDialogOpen(false)}
          initialData={lead}
        />
      </Dialog>

      {/* Add Contact Dialog */}
      <ContactHistoryDialog 
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        onSave={handleAddContactHistory}
        leadId={lead.id}
        leadName={lead.name}
      />

      {/* Add Reminder Dialog */}
      {isReminderDialogOpen && (
        <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
          <ReminderDialog 
            leadId={lead.id}
            leadName={lead.name}
            onSave={handleAddReminder}
            onClose={() => setIsReminderDialogOpen(false)}
          />
        </Dialog>
      )}
    </SidebarProvider>
  );
}
