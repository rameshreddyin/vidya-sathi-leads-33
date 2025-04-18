
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6">
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
        <div className="ml-auto flex items-center gap-4">
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
    </header>
  );
}
