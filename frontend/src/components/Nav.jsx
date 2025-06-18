import { Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Nav() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true' ? true : false;
    });
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);
    return (
        <>
            <div className="container flex justify-end sticky top-0 mx-auto gap-4">
                <Link to={"/"}>
                    <button className="mt-2 p-2 bg-blue-200 dark:bg-gray-800 rounded">Home</button>
                </Link>

                <button
                    onClick={toggleDarkMode}
                    className="mt-2 p-2 bg-blue-200 dark:bg-gray-800 rounded"
                >
                    <span>{darkMode ? '🌞 ' : '🌙 '}</span>
                    <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
                </button>
            </div>
        </>
    );
}