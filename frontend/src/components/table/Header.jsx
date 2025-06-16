import { MAIN_TABLE_HEADERS } from "../../utility/constants";
export default function Header() {
    return (
        <>
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    {MAIN_TABLE_HEADERS.map((header, index) => (
                        <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
}