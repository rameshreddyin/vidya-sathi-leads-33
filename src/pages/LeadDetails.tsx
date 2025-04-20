import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, MessageCircle as Whatsapp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactHistoryList } from "@/components/ContactHistoryList";
import { ContactHistoryDialog } from "@/components/ContactHistoryDialog";
import { Lead, ContactHistoryEntry, Reminder } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Dialog } from "@/components/ui/dialog";
import { ReminderDialog } from "@/components/ReminderDialog";
import { ReminderList } from "@/components/ReminderList";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lead, setLead] = useState<Lead | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch lead data from localStorage
    const fetchLead = () => {
      setLoading(true);
      const savedLeads = localStorage.getItem("vidyasathi-leads");
      if (savedLeads) {
        const leads = JSON.parse(savedLeads) as Lead[];
        const foundLead = leads.find(lead => lead.id === id);
        if (foundLead) {
          setLead(foundLead);
        }
      }
      setLoading(false);
    };

    fetchLead();
  }, [id]);

  const handleAddContactHistory = (entry: Omit<ContactHistoryEntry, 'id'>) => {
    if (!lead || !id) return;

    const newEntry: ContactHistoryEntry = {
      ...entry,
      id: `contact-${Date.now()}`
    };

    // Create updated lead with new contact history
    const updatedLead = {
      ...lead,
      contactHistory: [...(lead.contactHistory || []), newEntry],
      // Update status if needed
      status: entry.status && ["Contacted", "Qualified", "Enrolled", "Closed"].includes(entry.status)
        ? entry.status
        : lead.status
    };

    setLead(updatedLead);

    // Update in localStorage
    const savedLeads = localStorage.getItem("vidyasathi-leads");
    if (savedLeads) {
      const leads = JSON.parse(savedLeads) as Lead[];
      const updatedLeads = leads.map(l => l.id === id ? updatedLead : l);
      localStorage.setItem("vidyasathi-leads", JSON.stringify(updatedLeads));
    }

    toast({
      title: "Contact Recorded",
      description: `Contact with ${lead.name} has been saved.`
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      New: "bg-blue-500",
      Contacted: "bg-yellow-500",
      Qualified: "bg-teal-500",
      Enrolled: "bg-green-600",
      Closed: "bg-gray-500"
    };
    return <Badge className={statusColors[status] || "bg-gray-500"}>{status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddReminder = (reminder: Omit<Reminder, 'id'>) => {
    if (!lead) return;

    const newReminder = {
      ...reminder,
      id: `reminder-${Date.now()}`
    };

    const updatedLead = {
      ...lead,
      reminders: [...(lead.reminders || []), newReminder]
    };

    setLead(updatedLead);

    // Update in localStorage
    const savedLeads = localStorage.getItem("vidyasathi-leads");
    if (savedLeads) {
      const leads = JSON.parse(savedLeads) as Lead[];
      const updatedLeads = leads.map(l => l.id === id ? updatedLead : l);
      localStorage.setItem("vidyasathi-leads", JSON.stringify(updatedLeads));
    }

    toast({
      title: "Reminder Set",
      description: `Reminder has been set for ${lead.name}`
    });
  };

  const handleToggleReminder = (reminderId: string) => {
    if (!lead) return;

    const updatedReminders = (lead.reminders || []).map(reminder =>
      reminder.id === reminderId
        ? { ...reminder, isCompleted: !reminder.isCompleted }
        : reminder
    );

    const updatedLead = {
      ...lead,
      reminders: updatedReminders
    };

    setLead(updatedLead);

    // Update in localStorage
    const savedLeads = localStorage.getItem("vidyasathi-leads");
    if (savedLeads) {
      const leads = JSON.parse(savedLeads) as Lead[];
      const updatedLeads = leads.map(l => l.id === id ? updatedLead : l);
      localStorage.setItem("vidyasathi-leads", JSON.stringify(updatedLeads));
    }
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (!lead) return;

    const updatedReminders = (lead.reminders || []).filter(
      reminder => reminder.id !== reminderId
    );

    const updatedLead = {
      ...lead,
      reminders: updatedReminders
    };

    setLead(updatedLead);

    // Update in localStorage
    const savedLeads = localStorage.getItem("vidyasathi-leads");
    if (savedLeads) {
      const leads = JSON.parse(savedLeads) as Lead[];
      const updatedLeads = leads.map(l => l.id === id ? updatedLead : l);
      localStorage.setItem("vidyasathi-leads", JSON.stringify(updatedLeads));
    }

    toast({
      title: "Reminder Deleted",
      description: "The reminder has been removed"
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!lead) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Leads
        </Button>
        <div className="flex flex-col items-center justify-center mt-12">
          <h1 className="text-2xl font-bold mb-4">Lead Not Found</h1>
          <p>The lead you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Leads
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{lead.name}</h1>
            <div className="flex items-center gap-4">
              {getStatusBadge(lead.status)}
              <span className="text-gray-500">Lead ID: {lead.id}</span>
            </div>
          </div>
          <div className="space-x-4">
            <Button 
              variant="outline"
              onClick={() => {
                window.location.href = `tel:${lead.phone}`;
                setContactDialogOpen(true);
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Lead
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const formattedPhone = lead.phone.replace(/\s+/g, '');
                window.open(`https://wa.me/${formattedPhone}`, '_blank');
                setContactDialogOpen(true);
              }}
              className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 hover:border-green-300"
            >
              <Whatsapp className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              onClick={() => {
                window.location.href = `mailto:${lead.email}`;
                setContactDialogOpen(true);
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Parent Name</p>
                  <p className="font-medium">{lead.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="font-medium">Class {lead.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{lead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{lead.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">{lead.address}</p>
                    <p className="text-gray-500">
                      {lead.area}, {lead.city} - {lead.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{lead.notes}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium">{lead.source}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created On</p>
                <p className="font-medium">{formatDate(lead.date)}</p>
              </div>
            </CardContent>
          </Card>

          <ReminderList
            reminders={lead?.reminders || []}
            onAddReminder={() => setReminderDialogOpen(true)}
            onToggleComplete={handleToggleReminder}
            onDeleteReminder={handleDeleteReminder}
          />
          
          <ContactHistoryList 
            contactHistory={lead.contactHistory || []}
            onAddContact={() => setContactDialogOpen(true)}
          />
        </div>
      </div>

      <ContactHistoryDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        onSave={handleAddContactHistory}
        leadId={lead.id}
        leadName={lead.name}
      />

      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <ReminderDialog
          leadId={lead?.id || ""}
          leadName={lead?.name || ""}
          onSave={handleAddReminder}
          onClose={() => setReminderDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
}
