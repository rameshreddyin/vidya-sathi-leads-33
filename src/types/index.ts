
// Contact and Lead types for the lead management system

export type ContactHistoryEntry = {
  id: string;
  date: string;
  type: 'Phone Call' | 'Email' | 'Meeting' | 'WhatsApp' | 'Other';
  notes: string;
  status: string;
  leadId: string;
};

export type Lead = {
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
  contactHistory?: ContactHistoryEntry[];
};
