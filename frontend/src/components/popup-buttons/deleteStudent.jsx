import {useState} from 'react';
import {API_BASE_URL} from '../../utility/constants';

function deleteStudentHandler(studentId, setIsOpen, students, setStudents) {
    return async () => {
        setIsOpen(false);
        try {
            const response = await fetch(API_BASE_URL + '/students', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: studentId }),
            });
            if (!response.ok) {
                console.error("Error deleting student data");
                return;
            }
            const data = await response.json();
            setStudents(students.filter(student => student._id !== studentId));
            console.log("Student deleted successfully:", data);
        } catch (error) {
            console.error("Error deleting student data:", error);
        }
    };
}

export default function DeleteStudent(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const { students, setStudents } = props.studentList;
    return (
        <>
            <button
                className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                onClick={() => {
                    setIsOpen(true);
                    setStudentId(props._id);
                }}
            >
                Delete
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Delete Student</h2>
                        <p>Are you sure you want to delete this student?</p>
                        <div className="mt-4">
                            <button
                                className="mr-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={deleteStudentHandler(studentId,setIsOpen, students, setStudents)}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}