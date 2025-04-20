
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, Area, AreaChart
} from "recharts";
import { 
  Users, TrendingUp, Award, BarChart as BarChartIcon,
  PieChart as PieChartIcon, Activity, MapPin, Book
} from "lucide-react";
import type { Lead } from "@/types";

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#FEC6A1'];

interface LeadsByMonth {
  name: string;
  count: number;
}

interface LeadsBySource {
  name: string;
  value: number;
}

interface LeadsByStatus {
  name: string;
  value: number;
}

interface LeadsByGrade {
  grade: string;
  count: number;
}

export function AnalyticsDashboard({ leads }: { leads: Lead[] }) {
  const [leadsByMonth, setLeadsByMonth] = useState<LeadsByMonth[]>([]);
  const [leadsBySource, setLeadsBySource] = useState<LeadsBySource[]>([]);
  const [leadsByStatus, setLeadsByStatus] = useState<LeadsByStatus[]>([]);
  const [leadsByGrade, setLeadsByGrade] = useState<LeadsByGrade[]>([]);
  const [conversionRate, setConversionRate] = useState(0);
  const [topLocation, setTopLocation] = useState("");
  const [totalEnrolled, setTotalEnrolled] = useState(0);

  useEffect(() => {
    // Calculate leads by month
    const monthlyData: Record<string, number> = {};
    leads.forEach(lead => {
      const month = new Date(lead.date).toLocaleString('default', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });
    setLeadsByMonth(Object.entries(monthlyData).map(([name, count]) => ({ name, count })));

    // Calculate leads by source
    const sourceData: Record<string, number> = {};
    leads.forEach(lead => {
      sourceData[lead.source] = (sourceData[lead.source] || 0) + 1;
    });
    setLeadsBySource(Object.entries(sourceData).map(([name, value]) => ({ name, value })));

    // Calculate leads by status
    const statusData: Record<string, number> = {};
    leads.forEach(lead => {
      statusData[lead.status] = (statusData[lead.status] || 0) + 1;
    });
    setLeadsByStatus(Object.entries(statusData).map(([name, value]) => ({ name, value })));

    // Calculate leads by grade
    const gradeData: Record<string, number> = {};
    leads.forEach(lead => {
      gradeData[lead.grade] = (gradeData[lead.grade] || 0) + 1;
    });
    setLeadsByGrade(Object.entries(gradeData)
      .map(([grade, count]) => ({ grade, count }))
      .sort((a, b) => Number(a.grade) - Number(b.grade)));

    // Calculate conversion rate
    const enrolled = leads.filter(lead => lead.status === 'Enrolled').length;
    setTotalEnrolled(enrolled);
    setConversionRate(Math.round((enrolled / leads.length) * 100));

    // Find top location
    const locationData: Record<string, number> = {};
    leads.forEach(lead => {
      locationData[lead.area] = (locationData[lead.area] || 0) + 1;
    });
    setTopLocation(Object.entries(locationData)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '');
  }, [leads]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-education-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
            <p className="text-xs text-gray-500">Total inquiries received</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-education-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{conversionRate}%</div>
            <p className="text-xs text-gray-500">{totalEnrolled} enrollments</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Location</CardTitle>
            <MapPin className="h-4 w-4 text-education-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{topLocation}</div>
            <p className="text-xs text-gray-500">Most active area</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Most Popular Grade</CardTitle>
            <Book className="h-4 w-4 text-education-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Class {leadsByGrade[0]?.grade}
            </div>
            <p className="text-xs text-gray-500">{leadsByGrade[0]?.count} inquiries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-education-600" />
              Lead Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leadsByMonth}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#9b87f5" 
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-education-600" />
              Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsBySource}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {leadsBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-4 w-4 text-education-600" />
              Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsByGrade}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-4 w-4 text-education-600" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsByStatus}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {leadsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
