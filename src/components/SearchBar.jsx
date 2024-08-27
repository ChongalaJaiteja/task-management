import React, { useState } from "react";
import { AiOutlineFilter } from "react-icons/ai"; // Importing the filter icon

const categories = ["All", "To Do", "In Progress", "Done", "Timeout"];

const SearchBar = ({
    searchKeyword,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCategoryChange = (category) => {
        onCategoryChange(category);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex items-center mb-4">
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tasks..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative ml-4">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 focus:outline-none"
                >
                    <AiOutlineFilter size={24} />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${
                                    selectedCategory === category
                                        ? "bg-gray-100"
                                        : ""
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
