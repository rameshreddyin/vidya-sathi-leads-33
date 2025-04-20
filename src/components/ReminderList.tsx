
import { format } from "date-fns";
import { Bell, Check, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reminder } from "@/types";

interface ReminderListProps {
  reminders: Reminder[];
  onAddReminder: () => void;
  onToggleComplete: (reminderId: string) => void;
  onDeleteReminder: (reminderId: string) => void;
}

export function ReminderList({
  reminders,
  onAddReminder,
  onToggleComplete,
  onDeleteReminder,
}: ReminderListProps) {
  const sortedReminders = [...reminders].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reminders</CardTitle>
            <CardDescription>Track follow-up tasks</CardDescription>
          </div>
          <Button onClick={onAddReminder} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Reminder
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedReminders.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No reminders set
          </div>
        ) : (
          sortedReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-start justify-between p-4 rounded-lg border"
            >
              <div className="flex items-start space-x-4">
                <Bell className="h-5 w-5 mt-1 text-gray-500" />
                <div>
                  <div className="font-medium">{reminder.title}</div>
                  {reminder.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {reminder.description}
                    </p>
                  )}
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant="outline">
                      {format(new Date(reminder.date), "PPP")}
                    </Badge>
                    <Badge
                      variant={reminder.isCompleted ? "default" : "secondary"}
                    >
                      {reminder.isCompleted ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleComplete(reminder.id)}
                >
                  <Check className={cn("h-4 w-4", reminder.isCompleted ? "text-green-500" : "text-gray-500")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteReminder(reminder.id)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
