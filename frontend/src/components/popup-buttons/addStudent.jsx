import { useState } from 'react';
import { API_BASE_URL } from '../../utility/constants';
import { toast } from 'react-toastify';

function saveChangesHandler(props) {
    const { studentData, setIsOpen, students, setStudents, isButtonDisabled, setIsButtonDisabled} = props;
    return async () => {
        setIsButtonDisabled(true);
        try {
            const response = await fetch(API_BASE_URL + '/students/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    _id: studentData._id,
                    name: studentData.name,
                    email: studentData.email,
                    phoneNumber: studentData.phoneNumber,
                    codeforcesHandle: studentData.codeforcesHandle
                }),
            });
            if (!response.ok) {
                console.error("Error Adding student data");
                toast.error('Error in Adding Student')
                return;
            }
            const json = await response.json();
            const data = json.data;
            setStudents([...students, data]);
            setIsOpen(false);
            toast.success(`${data.name} Added`);
            console.log("Student data updated successfully:", data);
        } catch (error) {
            console.error("Error updating student data:", error);
            toast.error(error.message)
        } finally {
            setIsButtonDisabled(false);
        }
    };
}

export default function AddStudent(props) {
    const [isOpen, setIsOpen] = useState(false);
    const[isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { students, setStudents } = props;
    const [studentData, setStudentData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        codeforcesHandle: ''
    });
    return (
        <>
            <button
                className="mt-2 p-2 bg-blue-200 dark:bg-gray-800 rounded"
                onClick={() => setIsOpen(true)}
            >
                Add Student
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Add Student</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    value={studentData.name}
                                    onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={studentData.email}
                                    pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                                    title='Please enter a valid email address'
                                    required
                                    onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    type="tel"
                                    pattern='^\d{10}$'
                                    title='Please enter a valid 10-digit phone number'
                                    required
                                    value={studentData.phoneNumber}
                                    onChange={(e) => setStudentData({ ...studentData, phoneNumber: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Codeforces Handle</label>
                                <input
                                    type="text"
                                    value={studentData.codeforcesHandle}
                                    onChange={(e) => setStudentData({ ...studentData, codeforcesHandle: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                                disabled={isButtonDisabled}
                                onClick={saveChangesHandler({ studentData, setIsOpen, students, setStudents, isButtonDisabled, setIsButtonDisabled})}
                            >
                                Add Student
                            </button>
                            <button
                                type="button"
                                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200"
                                onClick={() => setIsOpen(false)}
                                disabled={isButtonDisabled}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}