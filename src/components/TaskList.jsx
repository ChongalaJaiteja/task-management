import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import useTaskTimeout from "./useTaskTimeout";
import Modal from "./Model";

const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const TaskList = () => {
    const [tasks, setTasks] = useState(getTasksFromLocalStorage());
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useTaskTimeout(tasks, setTasks);

    useEffect(() => {
        saveTasksToLocalStorage(tasks);
    }, [tasks]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (keyword) => {
        setSearchKeyword(keyword);
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
        setSuccessMessage("Task added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000); 
    };

    const renderTasksByCategory = (category) => {
        const tasksInCategory = tasks.filter(
            (task) => task.status === category
        );
        if (tasksInCategory.length === 0) return null;

        return (
            <div className="border rounded-lg p-4 mb-6 shadow-md">
                <h2
                    className={`text-xl font-semibold mb-4 text-${
                        category === "To Do"
                            ? "blue"
                            : category === "In Progress"
                            ? "yellow"
                            : category === "Done"
                            ? "green"
                            : "red"
                    }-600`}
                >
                    {category} ({tasksInCategory.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasksInCategory.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onEdit={() => setEditingTask(task)}
                            onDelete={() => {
                                const updatedTasks = tasks.filter(
                                    (t) => t.id !== task.id
                                );
                                setTasks(updatedTasks);
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <SearchBar
                searchKeyword={searchKeyword}
                onSearchChange={handleSearchChange}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            {successMessage && (
                <div className="text-green-600 mb-4">{successMessage}</div>
            )}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
            >
                Add Task
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TaskForm
                    onSave={(newTask) => {
                        handleAddTask(newTask);
                        setIsModalOpen(false);
                    }}
                />
            </Modal>
            <div className="mt-6">
                {renderTasksByCategory("To Do")}
                {renderTasksByCategory("In Progress")}
                {renderTasksByCategory("Done")}
                {renderTasksByCategory("Timeout")}
            </div>
        </div>
    );
};

export default TaskList;
