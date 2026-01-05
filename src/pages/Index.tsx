import { useMemo, useState } from "react";
import FilterButtons from "../components/FilterButtons";
import TaskStats from "../components/TaskStats";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import type { FilterType, Task } from "../types/task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { toast } from "sonner";

const Index = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
    const [filter, setFilter] = useState<FilterType>('all');
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null); 


    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'completed':
                return tasks.filter((task) => task.completed);
            case 'pending':
                return tasks.filter((task) => !task.completed);
            default:
                return tasks
        };
    }, [tasks, filter]);

    const stats = useMemo (() => {
        return {
            total: tasks.length,
            completed: tasks.filter((task) => task.completed).length, 
            pending: tasks.filter((task) => !task.completed).length
        }
    }, [tasks])

    const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
        if (editingTask) {
            setTasks(
                tasks.map((task) => 
                    task.id === editingTask.id ? {...task, ...taskData} : task
                )
            )
            toast.success('Task updated successfully')
            setEditingTask(null)
        }   else {
            const newTask: Task = {
                ...taskData,
                id: crypto.randomUUID(),
                createdAt: Date.now()
            }
            setTasks([newTask, ...tasks])
            toast.success('Task added successfully')
        }
    }

    const handleOpenForm = () => {
        setEditingTask(null)
        setIsFormOpen(true)
    }

    const handleToggleTask = (id: string) => {
        setTasks(
            tasks.map((task) => 
            task.id === id ? {...task, completed: !task.completed} : task
            )
        )
        const task = tasks.find((t) => t.id === id)
        if (task) {
            toast.success(task.completed ? 'Task marked as pending' : 'Task completed!')
        }
    }

    const handleEditTask = (task: Task) => {
        setEditingTask(task)
        setIsFormOpen(true)
    }

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id ))
        toast.success('Task deleted')
    }

    return (
    <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-8 animate-slide-up">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-4xl font-bold text-foreground">Task Manager</h1>
                    <Button onClick={handleOpenForm} size="lg" className="gap-2">
                        <Plus className="h-5-w-5"/>
                        Add Task
                    </Button>
                </div>
                <p className="text-muted-foreground">Stay organised and productive. {stats.pending > 0 ? `${stats.pending} ${stats.pending > 1 ? "tasks" : "task"} remaining` : "All caught up!🎉"} </p>
            </header>

            {/* Stats */}
            <div className="mb-8 animate-fade-in">
            <TaskStats total={stats.total} pending={stats.pending} completed={stats.completed}/>
            </div>

            {/* Filters */}
            <div className="mb-8 animate-fade-in">
                <FilterButtons currentFilter={filter} onFilterChange={setFilter}/>
            </div>

            {/* Task List */}
            <div className="space-y-3">
            {filteredTasks.length === 0 ? (
                <div className="text-center py-12 animate-fade-in">
                    <p className="text-muted-foreground text-lg">
                    {filter === 'completed' && 'No completed tasks yet.'}
                    {filter === 'pending' && 'No pending tasks. Great work!'}
                    {filter === 'all' && 'No tasks yet. Add one to get started!'}
                    </p>
                </div>
            ) : (
                filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onToggle={handleToggleTask} 
                    onEdit={handleEditTask} onDelete={handleDeleteTask} />
                ))
            )}
            </div>

            {/* Task Form Dialog */}
            <TaskForm open={isFormOpen} onOpenChange={setIsFormOpen} onSubmit={handleAddTask} editingTask={editingTask}/> 
        </div>
    </div>
  );
};

export default Index;