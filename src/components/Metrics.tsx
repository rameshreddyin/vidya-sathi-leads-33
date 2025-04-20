import { Activity, BookOpen, Clock, TrendingUp, Users, CheckCircle, Award, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type Lead = {
  id: string;
  status: string;
  date: string;
  source: string;
};
export function Metrics({
  leads
}: {
  leads: Lead[];
}) {
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
  const conversionRate = totalLeads > 0 ? Math.round(enrolledLeads / totalLeads * 100) : 0;

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
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        
        
      </Card>
    </div>;
}