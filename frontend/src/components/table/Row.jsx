import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../utility/constants";
import EditStudent from "../popup-buttons/editStudent";

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
                <button 
                    className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    
                >Delete</button>
            </td>
        </tr>
    );
}