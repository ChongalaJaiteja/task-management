import React, { useState, useEffect } from "react";

const TaskForm = ({ task = {}, onSave }) => {
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(task.priority || "Medium");
    const [status, setStatus] = useState(task.status || "To Do");
    const [deadline, setDeadline] = useState(task.deadline || "");

    useEffect(() => {
        setTitle(task.title || "");
        setDescription(task.description || "");
        setPriority(task.priority || "Medium");
        setStatus(task.status || "To Do");
        setDeadline(task.deadline || "");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || !deadline) {
            alert("Please fill out all fields!");
            return;
        }

        const newTask = {
            id: task.id || new Date().getTime(),
            title,
            description,
            priority,
            status,
            deadline,
        };

        onSave(newTask);
        resetForm();
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority("Medium");
        setStatus("To Do");
        setDeadline("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Deadline</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
                Save Task
            </button>
        </form>
    );
};

export default TaskForm;
