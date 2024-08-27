import React from "react";

const categories = ["To Do", "In Progress", "Done", "Timeout"];

const CategorySlider = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = React.useState(
        categories[0]
    );

    const handleChange = (category) => {
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    return (
        <div className="flex gap-4 p-4">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleChange(category)}
                    className={`px-4 py-2 rounded ${
                        selectedCategory === category
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategorySlider;
