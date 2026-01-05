import { Circle, ListTodo } from "lucide-react";

interface TaskStatsProps {
    total: number;
    pending: number;
    completed: number
}

const TaskStats = ({total, pending, completed}: TaskStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <ListTodo className="h-4 w-4" />
            <span className="text-sm font-medium">Total</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{total}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Circle className="h-4 w-4" />
            <span className="text-sm font-medium">Pending</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{pending}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Circle className="h-4 w-4" />
            <span className="text-sm font-medium">Completed</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{completed}</p>
        </div>
    </div>
  );
};

export default TaskStats;