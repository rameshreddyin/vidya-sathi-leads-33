
import { 
  Activity, BookOpen, Clock, TrendingUp, 
  Users, CheckCircle, Award, BarChart 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Lead = {
  id: string;
  status: string;
  date: string;
  source: string;
};

export function Metrics({ leads }: { leads: Lead[] }) {
  // Calculate metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === "New").length;
  const contactedLeads = leads.filter(lead => lead.status === "Contacted").length;
  const qualifiedLeads = leads.filter(lead => lead.status === "Qualified").length;
  const enrolledLeads = leads.filter(lead => lead.status === "Enrolled").length;
  
  // Last 7 days leads
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const lastWeekLeads = leads.filter(lead => new Date(lead.date) >= lastWeekDate).length;

  // Calculate conversion rate
  const conversionRate = totalLeads > 0 ? Math.round((enrolledLeads / totalLeads) * 100) : 0;

  // Calculate source breakdown
  const leadsBySource: Record<string, number> = {};
  leads.forEach(lead => {
    leadsBySource[lead.source] = (leadsBySource[lead.source] || 0) + 1;
  });

  // Find top source
  let topSource = "None";
  let topSourceCount = 0;
  Object.entries(leadsBySource).forEach(([source, count]) => {
    if (count > topSourceCount) {
      topSource = source;
      topSourceCount = count;
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads}</div>
          <p className="text-xs text-muted-foreground">Total prospective students</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New This Week</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lastWeekLeads}</div>
          <p className="text-xs text-muted-foreground">New leads in last 7 days</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Enrollment Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversionRate}%</div>
          <p className="text-xs text-muted-foreground">Of leads convert to enrollment</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Source</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topSource}</div>
          <p className="text-xs text-muted-foreground">Most effective lead source</p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lead Status Breakdown</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-100 p-2">
                <Activity className="h-4 w-4 text-blue-500" />
              </div>
              <div className="mt-2 text-xl font-bold">{newLeads}</div>
              <p className="text-xs text-center text-muted-foreground">New</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-yellow-100 p-2">
                <BookOpen className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="mt-2 text-xl font-bold">{contactedLeads}</div>
              <p className="text-xs text-center text-muted-foreground">Contacted</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-teal-100 p-2">
                <TrendingUp className="h-4 w-4 text-teal-500" />
              </div>
              <div className="mt-2 text-xl font-bold">{qualifiedLeads}</div>
              <p className="text-xs text-center text-muted-foreground">Qualified</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="mt-2 text-xl font-bold">{enrolledLeads}</div>
              <p className="text-xs text-center text-muted-foreground">Enrolled</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-gray-100 p-2">
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <div className="mt-2 text-xl font-bold">{leads.filter(lead => lead.status === "Closed").length}</div>
              <p className="text-xs text-center text-muted-foreground">Closed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
