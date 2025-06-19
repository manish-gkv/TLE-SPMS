import{useEffect, useState}from'react';
import{API_BASE_URL}from'../../utility/constants';
import { toast } from 'react-toastify';

function saveChangesHandler(studentData, setIsOpen, students, setStudents, isButtonDisabled, setIsButtonDisabled) {
    return async ()=> {
        setIsButtonDisabled(true);
        try {
            const response = await fetch(API_BASE_URL + '/students/', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify({_id: studentData._id, name: studentData.name, email: studentData.email, phoneNumber: studentData.phoneNumber, codeforcesHandle: studentData.codeforcesHandle}),
            });
            if (!response.ok) {
                console.error("Error updating student data");
                toast.error("Edit Failed");
                return;
            }
            const json = await response.json();
            const data = json.data;
            setIsOpen(false);
            setStudents(students.map(student => student._id === studentData._id ? data : student));
            console.log("Student data updated successfully:", data);
            toast.success("Saved Succesfully");
        } catch (error) {
            console.error("Error updating student data:", error);
            toast.error("Edit Failed");
        }
        finally {
            setIsButtonDisabled(false);
        }
    }
}

export default function EditStudent(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [studentData, setStudentData] = useState({...props});
    const { students, setStudents } = props.studentList;
    return (
        <>
            <button
            className="ml-4 text-gray-600 hover:text-red-900 dark:text-gray-400 dark:hover:text-red-300"
            onClick={() => setIsOpen(true)}
        >
            Edit
        </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit Student</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    value={studentData?.name || ''}
                                    onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={studentData?.email || ''}
                                    onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    type="tel"
                                    value={studentData?.phoneNumber || ''}
                                    onChange={(e) => setStudentData({ ...studentData, phoneNumber: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Codeforces Handle</label>
                                <input
                                    type="text"
                                    value={studentData?.codeforcesHandle || ''}
                                    required
                                    onChange={(e) => setStudentData({ ...studentData, codeforcesHandle: e.target.value })}
                                    className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <button
                                type="button"
                                onClick={saveChangesHandler(studentData, setIsOpen, students, setStudents, isButtonDisabled, setIsButtonDisabled)}
                                disabled={isButtonDisabled}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isButtonDisabled}
                                className="ml-2 mt-4 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded disabled:bg-gray-400 hover:bg-gray-400 dark:hover:bg-gray-500"
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