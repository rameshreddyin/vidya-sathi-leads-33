
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { UserTable } from "@/components/UserTable";
import { UserDialog } from "@/components/UserDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationManagement } from "@/components/LocationManagement";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  assignedLocation: string;
  status: string;
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const { toast } = useToast();

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const handleCreateUser = (userData: Omit<User, 'id'>) => {
    // In a real app, this would send data to an API
    console.log("Creating user:", userData);
    
    toast({
      title: "User Created",
      description: `${userData.name} has been added successfully.`,
    });
  };

  const handleUpdateUser = (userData: Omit<User, 'id'>) => {
    // In a real app, this would send data to an API
    console.log("Updating user:", userData);
    
    toast({
      title: "User Updated",
      description: `${userData.name} has been updated successfully.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                  School Management
                </h1>
              </div>

              <Tabs defaultValue="users" className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="locations">Locations</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-[300px]">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="pl-9 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => {
                        setSelectedUser(undefined);
                        setIsUserDialogOpen(true);
                      }}
                      className="bg-education-600 hover:bg-education-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="users" className="space-y-4">
                  <UserTable 
                    searchTerm={searchTerm}
                    onEditUser={handleEditUser}
                  />
                </TabsContent>
                
                <TabsContent value="locations" className="space-y-4">
                  <LocationManagement />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>

      <UserDialog 
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        initialData={selectedUser}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
      />
    </SidebarProvider>
  );
}
