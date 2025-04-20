
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function Header() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );

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
                <li>
                  <Link 
                    to="/" 
                    className="text-muted-foreground hover:text-education-700 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/users" 
                    className="text-muted-foreground hover:text-education-700 transition-colors"
                  >
                    User Management
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/leads" 
                    className="text-muted-foreground hover:text-education-700 transition-colors"
                  >
                    Leads
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/analytics" 
                    className="text-muted-foreground hover:text-education-700 transition-colors"
                  >
                    Analytics
                  </Link>
                </li>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="font-medium text-foreground p-2 h-auto flex items-center gap-2"
                  >
                    {selectedMonth}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {months.map((month) => (
                    <DropdownMenuItem
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className="cursor-pointer"
                    >
                      {month}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
