
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6 lg:px-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="" className="h-8 w-8" />
              <span className="text-xl font-bold text-education-700">VidyaSathi</span>
            </div>
            <nav className="ml-10 hidden lg:flex">
              <ul className="flex items-center gap-6 text-sm font-medium">
                <li className="text-education-700 font-semibold border-b-2 border-education-500">Dashboard</li>
                <li className="text-muted-foreground">Leads</li>
                <li className="text-muted-foreground">Analytics</li>
                <li className="text-muted-foreground">Settings</li>
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>Academic Year:</span>
              <span className="font-medium text-foreground">{academicYear}</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>Current Month:</span>
              <span className="font-medium text-foreground">{currentMonth}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
