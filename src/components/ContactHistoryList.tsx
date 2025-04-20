
import { 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Clock 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactHistoryEntry } from "@/types";

interface ContactHistoryListProps {
  contactHistory: ContactHistoryEntry[];
  onAddContact: () => void;
}

export function ContactHistoryList({ contactHistory, onAddContact }: ContactHistoryListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'Phone Call':
        return <Phone className="h-4 w-4 text-education-600" />;
      case 'Email':
        return <Mail className="h-4 w-4 text-education-600" />;
      case 'Meeting':
        return <Calendar className="h-4 w-4 text-education-600" />;
      case 'WhatsApp':
        return <MessageSquare className="h-4 w-4 text-education-600" />;
      default:
        return <Clock className="h-4 w-4 text-education-600" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Contact History</CardTitle>
        <Button
          size="sm"
          onClick={onAddContact}
          className="bg-education-600 hover:bg-education-700"
        >
          Record Contact
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {contactHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-4">No contact history recorded yet</p>
              <Button 
                variant="outline" 
                onClick={onAddContact}
                className="text-education-600 border-education-600 hover:bg-education-50"
              >
                Record First Contact
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {contactHistory.map((contact, index) => (
                <div key={contact.id} className="relative pl-6 pb-4">
                  <div className="absolute left-0 top-2 w-px h-full bg-gray-200" />
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-gray-400" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getContactIcon(contact.type)}
                        <p className="font-medium ml-2">{contact.type}</p>
                      </div>
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
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
