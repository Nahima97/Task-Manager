import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../types/task";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskCard = ({task, onToggle, onEdit, onDelete}: TaskCardProps) => {
  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-md 
    border-border bg-card animate-fade-in">
        <div className="flex items-start gap-3">
            <Checkbox checked={task.completed} onCheckedChange={() => onToggle(task.id)} className="mt-1" />
                <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-card-foreground transition-all duration-200" 
                    ${task.completed ? 'line-through opacity-50' : ''}`}>{task.title}</h3>
                    {task.description && (
                        <p className={`text-sm text-muted-foreground mt-1 transition-all duration-200 ${task.completed ? 'line-through opacity-50' : ''}`}>{task.description}</p>
                    )}
                </div>
                <div className="flex gap-1">
                    <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(task)}
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(task.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
        </div>
    </Card>
  );
};

export default TaskCard;