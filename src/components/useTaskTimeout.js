// src/components/useTaskTimeout.js
import { useEffect } from "react";

const useTaskTimeout = (tasks, setTasks) => {
    useEffect(() => {
        const checkTimeouts = () => {
            const now = new Date();
            const updatedTasks = tasks.map((task) => {
                if (task.dueDate && new Date(task.dueDate) < now) {
                    return { ...task, status: "Timeout" };
                }
                return task;
            });
            setTasks(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        };

        checkTimeouts();
        const intervalId = setInterval(checkTimeouts, 60000); // Check every minute

        return () => clearInterval(intervalId);
    }, [tasks, setTasks]);
};

export default useTaskTimeout;
