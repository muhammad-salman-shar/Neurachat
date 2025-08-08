
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Clock, Trash2, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Reminder = {
  id: string;
  task: string;
  time: string;
};

const initialReminders: Reminder[] = [
  { id: "1", task: "Finish the report", time: "in 2 hours" },
  { id: "2", task: "Call the doctor", time: "tomorrow at 10 AM" },
  { id: "3", task: "Buy groceries", time: "in 3 days" },
];

function ReminderDialog({ reminder, onSave, children }: { reminder?: Reminder, onSave: (task: string, time: string) => void, children: React.ReactNode }) {
  const [task, setTask] = useState(reminder?.task || "");
  const [time, setTime] = useState(reminder?.time || "");

  const handleSave = () => {
    if (task && time) {
      onSave(task, time);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{reminder ? "Edit Reminder" : "Add New Reminder"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task">Task</Label>
            <Input id="task" value={task} onChange={(e) => setTask(e.target.value)} placeholder="e.g., School at 8 AM" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., in 2 hours" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
             <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const addReminder = (task: string, time: string) => {
    const newReminder = { id: Date.now().toString(), task, time };
    setReminders([newReminder, ...reminders]);
  };

  const editReminder = (id: string, updatedTask: string, updatedTime: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, task: updatedTask, time: updatedTime } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };
  
  return (
    <div className="space-y-6">
       <div className="flex justify-end items-center">
        <ReminderDialog onSave={addReminder}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </ReminderDialog>
      </div>

      <div className="space-y-4">
        {reminders.map((reminder) => (
           <DropdownMenu key={reminder.id}>
            <DropdownMenuTrigger asChild>
               <Card className="w-full cursor-pointer hover:bg-card/90 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{reminder.task}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{reminder.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <ReminderDialog 
                  reminder={reminder} 
                  onSave={(task, time) => editReminder(reminder.id, task, time)}
                >
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                  </DropdownMenuItem>
                </ReminderDialog>
              <DropdownMenuItem onClick={() => deleteReminder(reminder.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        {reminders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>You have no reminders set.</p>
                <p>Click "New Task" to add one.</p>
            </div>
        )}
      </div>
    </div>
  );
}
