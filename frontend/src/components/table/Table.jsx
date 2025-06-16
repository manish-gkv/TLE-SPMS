import { useEffect, useState } from 'react';

import Row from './Row.jsx';
import Header from './Header.jsx';
import { API_BASE_URL } from '../../utility/constants.js';

export default function Table() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_BASE_URL + "/students", {
                method: 'GET',
            });
            if (!response.ok) {
                console.error("Failed to fetch data");
                return;
            }

            const json = await response.json();
            setStudents(json.data);
        }
        fetchData();
    }, []);

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <Header />
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {students.map((student) => {
                        return <Row key={student._id} {...student} />
                    })}
                </tbody>
            </table>
        </>
    );
}