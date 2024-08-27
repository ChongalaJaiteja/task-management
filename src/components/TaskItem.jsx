import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const TaskItem = ({ task, onEdit, onDelete, onChangeStatus }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsStatusMenuOpen(false);
    };

    const toggleStatusMenu = () => {
        setIsStatusMenuOpen(!isStatusMenuOpen);
    };

    const handleStatusChange = (newStatus) => {
        onChangeStatus(task.id, newStatus);
        setIsStatusMenuOpen(false);
        setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
            setIsStatusMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen || isStatusMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, isStatusMenuOpen]);

    return (
        <div className="relative bg-white p-4 mb-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {task.title}
                    </h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <span
                        className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded ${
                            task.status === "To Do"
                                ? "bg-blue-100 text-blue-800"
                                : task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : task.status === "Done"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {task.status}
                    </span>
                </div>
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={toggleMenu}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        <BsThreeDotsVertical size={20} />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
                            <button
                                onClick={() => {
                                    onEdit();
                                    toggleMenu();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    onDelete();
                                    toggleMenu();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                            >
                                Delete
                            </button>
                            <button
                                onClick={toggleStatusMenu}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            >
                                Change Status
                            </button>
                            {isStatusMenuOpen && (
                                <div className="absolute left-full top-0 mt-0 ml-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
                                    <button
                                        onClick={() =>
                                            handleStatusChange("To Do")
                                        }
                                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                                    >
                                        To Do
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleStatusChange("In Progress")
                                        }
                                        className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-100"
                                    >
                                        In Progress
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleStatusChange("Done")
                                        }
                                        className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-100"
                                    >
                                        Done
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleStatusChange("Timeout")
                                        }
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                    >
                                        Timeout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
