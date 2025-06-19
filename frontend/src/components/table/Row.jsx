import { Link } from "react-router-dom";
import EditStudent from "../popup-buttons/editStudent";
import DeleteStudent from "../popup-buttons/deleteStudent";

export default function Row(props) {
    console.log(props);
    return (
        <tr>
            {props.tableFields.map((field, index) => (
                <td key={index} className="ppx-6 py-4 text-center  whitespace-nowrap">
                    {props[field] || "N/A"}
                </td>
            ))}
            <td className="px-6 py-4 text-center whitespace-nowrap">
                <Link to={`/students/${props._id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <button 
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >View Profile</button>
                </Link>
                <EditStudent {...props} />
                <DeleteStudent {...props} />
            </td>
        </tr>
    );
}