
export interface Lead {
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
  status: string;
  source: string;
  notes: string;
  date: string;
}

export interface ContactHistoryEntry {
  id: string;
  leadId: string;
  type: 'Phone Call' | 'Email' | 'Meeting' | 'WhatsApp' | 'Other';
  notes: string;
  status: string;
  date: string;
}

export interface Reminder {
  id: string;
  leadId: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}
