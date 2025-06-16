import { MAIN_TABLE_FIELDS } from "../../utility/constants";
export default function Row(props) {
    return (
        <tr>
            {MAIN_TABLE_FIELDS.map((field, index) => (
                <td key={index} className="px-6 py-4 text-center whitespace-nowrap">
                    {props[field] || "N/A"}
                </td>
            ))}
            <td className="px-6 py-4 text-center whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">View Profile</button>
                <button className="ml-4 text-gray-600 hover:text-red-900 dark:text-gray-400 dark:hover:text-red-300">Edit</button>
                <button className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
            </td>
        </tr>
    );
}