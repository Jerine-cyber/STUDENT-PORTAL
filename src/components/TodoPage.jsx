import React, { useState, useEffect } from 'react'; // 🔑 Import useEffect for fetching
import { useNavigate } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa'; // Import icon

const TodoPage = () => {
    const navigate = useNavigate();
    
    // 🔑 State to store fetched tasks
    const [tasks, setTasks] = useState([]); 
    const [taskInput, setTaskInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy data for fallback
    const dummyTasks = [
        { id: 1, text: "Backend server maintenance", completed: false },
        { id: 2, text: "Check Vercel logs", completed: true },
    ];

    // 🔑 useEffect to fetch initial tasks from the backend
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                // Fetch data from the Express Backend URL
                const response = await fetch('http://localhost:3001/api/todos'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setTasks(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch todos:", err);
                setError("Failed to load To-Dos. Please ensure the backend is running.");
                setTasks(dummyTasks); // Fallback to dummy data
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []); // Runs only once on mount

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskInput.trim() !== '') {
            const newTask = {
                id: Date.now(),
                text: taskInput.trim(),
                completed: false,
            };
            
            // ⚠️ TODO: In a real app, send a POST request to the API here
            setTasks([...tasks, newTask]);
            setTaskInput('');
        }
    };

    const handleToggleTask = (id) => {
        // ⚠️ TODO: In a real app, send a PUT request to the API here
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDeleteTask = (id) => {
        // ⚠️ TODO: In a real app, send a DELETE request to the API here
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // --- Loading and Error States ---
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
                <FaListUl className="w-8 h-8 mr-3 text-pink-400 animate-pulse" /> 
                Loading Academic To-Dos...
            </div>
        );
    }

    if (error && tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-10 text-red-400 bg-gray-900">
                <h1 className="mb-4 text-2xl">Data Load Failed!</h1>
                <p className="text-center">{error}</p>
                <p className="mt-4 text-sm text-gray-400">Please check your Node.js server status.</p>
            </div>
        );
    }
    // ---------------------------------

    return (
        <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
            
            {/* Abstract Background Elements for 3D feel */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute bg-blue-500 rounded-full top-1/4 left-1/4 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute bg-purple-500 rounded-full top-1/2 right-1/4 w-96 h-96 mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute bg-pink-500 rounded-full bottom-1/4 left-1/3 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg p-8 mx-auto transition-transform duration-300 bg-white border border-white bg-opacity-10 border-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-3d-dark">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 mr-4 text-white transition-colors duration-200 rounded-full hover:text-gray-200 hover:bg-white hover:bg-opacity-20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 className="flex items-center text-3xl font-extrabold text-white sm:text-4xl">
                        <FaListUl className="mr-3 text-pink-400" /> Academic To-Dos
                    </h1>
                </div>

                <form onSubmit={handleAddTask} className="flex mb-6 space-x-2">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 p-3 text-white placeholder-gray-400 bg-white border-2 border-white rounded-lg bg-opacity-10 border-opacity-20 focus:outline-none focus:border-blue-400"
                    />
                    <button
                        type="submit"
                        className="p-3 text-white transition-all duration-300 transform bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105"
                    >
                        Add
                    </button>
                </form>

                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between p-4 transition-colors duration-200 bg-white border border-white rounded-lg shadow-sm bg-opacity-5 border-opacity-10 hover:bg-opacity-10"
                        >
                            <span
                                onClick={() => handleToggleTask(task.id)}
                                className={`flex-1 text-lg cursor-pointer ${
                                    task.completed ? 'line-through text-gray-400' : 'text-gray-200'
                                } transition-colors duration-200`}
                            >
                                {task.text}
                            </span>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="ml-4 text-red-400 transition-colors duration-300 hover:text-red-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoPage;