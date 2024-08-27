import React from "react";

const categories = ["To Do", "In Progress", "Done", "Timeout"];

const CategoryInfo = ({ tasks, onAddTask }) => {
    const getTaskCount = (category) =>
        tasks.filter((task) => task.status === category).length;

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            {categories.map((category) => (
                <div
                    key={category}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col items-center w-full md:w-1/2 lg:w-1/4"
                >
                    <h3 className="text-xl font-semibold mb-2">{category}</h3>
                    <p className="text-gray-700 mb-4">
                        Count: {getTaskCount(category)}
                    </p>
                    <button
                        onClick={() => onAddTask(category)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Task
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoryInfo;
