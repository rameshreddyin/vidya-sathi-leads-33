
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function Header() {
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6 lg:px-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">VidyaSathi</span>
            </Link>
            <nav className="ml-10 hidden lg:flex">
              <ul className="flex items-center gap-6 text-sm font-medium">
                <li>
                  <Link 
                    to="/" 
                    className="text-muted-foreground hover:text-gray-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/users" 
                    className="text-muted-foreground hover:text-gray-900 transition-colors"
                  >
                    School Management
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
