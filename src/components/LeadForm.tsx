
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, DialogClose } from "@/components/ui/dialog";

type Lead = {
  id?: string;
  name: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  grade: string;
  status?: string;
  source: string;
  notes: string;
  date?: string;
};

interface LeadFormProps {
  onSubmit: (data: Lead) => void;
  onClose: () => void;
  initialData?: Lead;
}

export function LeadForm({ onSubmit, onClose, initialData }: LeadFormProps) {
  const [formData, setFormData] = useState<Lead>({
    name: "",
    parentName: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    city: "",
    pincode: "",
    grade: "",
    source: "",
    notes: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      ...formData,
      id: initialData?.id,
      status: initialData?.status || "New",
      date: initialData?.date || new Date().toISOString()
    });
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
        <DialogDescription>Enter details of the prospective student. All fields marked with * are required.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Student Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter student's full name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="parentName">Parent/Guardian Name *</Label>
            <Input
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              placeholder="Enter parent's full name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter contact number"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>

          <div className="col-span-2 grid gap-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter street address"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="area">Area/Locality *</Label>
            <Input
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              placeholder="Enter area or locality"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter city name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pincode">PIN Code *</Label>
            <Input
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              placeholder="Enter PIN code"
              maxLength={6}
              pattern="[0-9]*"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="grade">Interested Grade/Class *</Label>
            <Select name="grade" onValueChange={(value) => handleSelectChange(value, "grade")}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nursery">Nursery</SelectItem>
                <SelectItem value="LKG">LKG</SelectItem>
                <SelectItem value="UKG">UKG</SelectItem>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
                <SelectItem value="3">Class 3</SelectItem>
                <SelectItem value="4">Class 4</SelectItem>
                <SelectItem value="5">Class 5</SelectItem>
                <SelectItem value="6">Class 6</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="source">Lead Source *</Label>
            <Select name="source" onValueChange={(value) => handleSelectChange(value, "source")}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">School Website</SelectItem>
                <SelectItem value="WalkIn">Walk-in</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="SocialMedia">Social Media</SelectItem>
                <SelectItem value="Advertisement">Advertisement</SelectItem>
                <SelectItem value="Exhibition">School Exhibition</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 grid gap-2">
            <Label htmlFor="notes">Notes/Comments</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-education-600 hover:bg-education-700">Save Lead</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
