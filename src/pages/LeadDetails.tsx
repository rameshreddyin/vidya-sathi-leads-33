
import React from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Clock, FileText, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

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

const contactHistory = [
  {
    date: "2024-04-19T10:30:00Z",
    type: "Phone Call",
    notes: "Discussed admission process and fee structure",
    status: "Contacted"
  },
  {
    date: "2024-04-15T14:45:00Z",
    type: "Email",
    notes: "Sent course curriculum and facility details",
    status: "Information Sent"
  },
  {
    date: "2024-04-10T09:15:00Z",
    type: "Meeting",
    notes: "Campus visit scheduled for next week",
    status: "Meeting Scheduled"
  }
];

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // For demo, we'll use static data - in real app this would come from a data source
  const lead: Lead = {
    id: "1",
    name: "Aarav Sharma",
    parentName: "Rajesh Sharma",
    phone: "9876543210",
    email: "rajesh.sharma@example.com",
    grade: "8",
    date: "2024-04-15T10:30:00Z",
    status: "Qualified",
    source: "Website",
    address: "123 Main St",
    area: "Vasant Kunj",
    city: "Delhi",
    pincode: "110070",
    notes: "Interested in science program and extracurricular activities"
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
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Call Lead
            </Button>
            <Button>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Contact History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {contactHistory.map((contact, index) => (
                    <div key={index} className="relative pl-6 pb-4">
                      <div className="absolute left-0 top-2 w-px h-full bg-gray-200" />
                      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-gray-400" />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{contact.type}</p>
                          <Badge variant="outline">{contact.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(contact.date)}
                        </p>
                        <p className="text-sm text-gray-600">{contact.notes}</p>
                      </div>
                      {index < contactHistory.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
