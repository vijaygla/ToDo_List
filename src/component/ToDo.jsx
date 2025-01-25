import { useState, useEffect } from "react";
import "./ToDo.css";
import { IoMdCheckmarkCircleOutline, IoMdCheckmarkCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const toDoKey = "ToDoApp";

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem(toDoKey);
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) return; // Prevent empty tasks

        const newTask = {
            text: inputValue,
            completed: false,
            timestamp: new Date().toLocaleString(), // Store date and time
        };

        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, newTask];
            localStorage.setItem(toDoKey, JSON.stringify(updatedTasks));
            return updatedTasks;
        });
        setInputValue("");
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = tasks.map((task, idx) =>
            idx === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(toDoKey, JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(updatedTasks);
        localStorage.setItem(toDoKey, JSON.stringify(updatedTasks));
    };

    const handleClearAll = () => {
        setTasks([]);
        localStorage.removeItem(toDoKey);
    };

    return (
        <div className="todo-container">
            <header className="header">
                <h1>ToDo List</h1>
                <p>Manage your tasks efficiently</p>
            </header>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Enter a task..."
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <button type="submit" className="todo-btn">
                    Add Task
                </button>
            </form>
            <ul className="todo-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`todo-item ${task.completed ? "completed" : ""}`}>
                        <div>
                            <span className="task-text">{task.text}</span>
                            <span className="task-time">{task.timestamp}</span>
                        </div>
                        <div className="task-actions">
                            <button
                                className="check-btn"
                                onClick={() => handleToggleComplete(index)}
                                title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                            >
                                {task.completed ? <IoMdCheckmarkCircle /> : <IoMdCheckmarkCircleOutline />}
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteTask(index)}
                                title="Delete Task"
                            >
                                <MdDeleteForever />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="clear-btn" onClick={handleClearAll}>
                Clear All
            </button>
        </div>
    );
};
