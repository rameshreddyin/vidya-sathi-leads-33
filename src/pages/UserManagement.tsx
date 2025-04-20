
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/UserTable";
import { UserDialog } from "@/components/UserDialog";
import { LocationManagement } from "@/components/LocationManagement";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  assignedLocation: string;
  status: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  const handleUserSubmit = (userData: Omit<User, 'id'>) => {
    // Here you would typically make an API call to update/create the user
    console.log('User data submitted:', userData);
    setDialogOpen(false);
    setEditingUser(undefined);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">User Management</h2>
        <p className="text-muted-foreground">
          Manage staff and admin users across all locations
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => {
          setEditingUser(undefined);
          setDialogOpen(true);
        }}>
          Add New User
        </Button>
      </div>

      <div className="space-y-8">
        <UserTable 
          searchTerm={searchTerm} 
          onEditUser={(user) => {
            setEditingUser(user);
            setDialogOpen(true);
          }}
        />
      </div>

      <LocationManagement />

      <UserDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={editingUser}
        onSubmit={handleUserSubmit}
      />
    </div>
  );
};

export default UserManagement;
