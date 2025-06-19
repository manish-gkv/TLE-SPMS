import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utility/constants.js";
import Table from "./table/Table.jsx";
import AddStudent from "./popup-buttons/addStudent.jsx";

export default function MainTable() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_BASE_URL + "/students", {
                headers: {
                    "Content-Type": "application/json",
                },
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
            <div className="container mt-5">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <Table students={students} setStudents={setStudents}/>
                </div>
                <AddStudent students={students} setStudents={setStudents}/>
            </div>
        </>
    )
}