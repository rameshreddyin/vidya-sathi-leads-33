
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  Clock, 
  Calculator, 
  CalendarDays, 
  MessageSquare, 
  LogOut 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Leads", icon: Users, href: "/leads" },
];

const academicMenuItems = [
  { title: "Classes", icon: BookOpen, href: "/classes" },
  { title: "Attendance", icon: Calendar, href: "/attendance" },
  { title: "Exams", icon: ClipboardList, href: "/exams" },
  { title: "Timetable", icon: Clock, href: "/timetable" },
];

const adminMenuItems = [
  { title: "Finance", icon: Calculator, href: "/finance" },
  { title: "Events", icon: CalendarDays, href: "/events" },
  { title: "Messages", icon: MessageSquare, href: "/messages" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <SidebarContent>
        <div className="flex items-center gap-2 px-4 py-4">
          <img src="/logo.svg" alt="" className="h-8 w-8" />
          <span className="text-xl font-bold">VidyaSathi</span>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>MAIN</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="hover:bg-sidebar-hover">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>ACADEMIC</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {academicMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="hover:bg-sidebar-hover">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>ADMINISTRATION</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="hover:bg-sidebar-hover">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button className="w-full hover:bg-sidebar-hover">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
