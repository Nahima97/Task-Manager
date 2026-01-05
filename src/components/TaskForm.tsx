import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface TaskFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    editingTask?: Task | null;
}

const TaskForm = ({open, onOpenChange, onSubmit, editingTask}: TaskFormProps) => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect (() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description || '')
        } else {
            setTitle('')
            setDescription('')
        }
    }, [editingTask, open])

    const handleSubmit = (/*e: React.FormEvent*/) => {
        onSubmit({
            title: title.trim(),
            description: description.trim() || undefined,
            completed: editingTask?.completed || false
        })
        setTitle('')
        setDescription('')
        onOpenChange(false)
    }

    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]" >
            <DialogHeader>
                <DialogTitle>
                    {editingTask ? 'Edit Task' : 'Add New Task'}
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-foreground">Title *</label>
                        <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title" 
                        required 
                        className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
                        <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add task description (optional)" 
                        className="w-full min-h-[100px] resize-none"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" disabled={!title.trim()}>{editingTask ? "Update Task" : "Add Task"}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  );
};

export default TaskForm;