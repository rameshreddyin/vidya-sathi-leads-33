import { useState } from "react";
import { MessageSquare, Phone, Mail, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sanitizeObject } from "@/lib/sanitize";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { ContactHistoryEntry } from "@/types";

interface ContactHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entry: Omit<ContactHistoryEntry, 'id'>) => void;
  leadId: string;
  leadName: string;
}

export function ContactHistoryDialog({ 
  open, 
  onOpenChange, 
  onSave, 
  leadId,
  leadName 
}: ContactHistoryDialogProps) {
  const [formData, setFormData] = useState({
    type: '',
    notes: '',
    status: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.status) {
      return; // Basic validation
    }
    
    const sanitizedData = sanitizeObject({
      leadId,
      type: formData.type as ContactHistoryEntry['type'],
      notes: formData.notes,
      status: formData.status,
      date: new Date().toISOString(),
    });
    
    onSave(sanitizedData);
    
    // Reset form
    setFormData({
      type: '',
      notes: '',
      status: '',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Record Contact with {leadName}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            Record details about your interaction with this lead.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Contact Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phone Call">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-education-600" />
                      <span>Phone Call</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Email">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-education-600" />
                      <span>Email</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Meeting">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-education-600" />
                      <span>Meeting</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="WhatsApp">
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4 text-education-600" />
                      <span>WhatsApp</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Other">
                    <div className="flex items-center">
                      <span>Other</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status Update *</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Update lead status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Information Sent">Information Sent</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Meeting Scheduled">Meeting Scheduled</SelectItem>
                  <SelectItem value="Visited">Visited</SelectItem>
                  <SelectItem value="Application Received">Application Received</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Enrolled">Enrolled</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes *</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="min-h-[120px]"
                placeholder="Record details of your conversation or interaction"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-education-600 hover:bg-education-700">
              Save Contact Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
