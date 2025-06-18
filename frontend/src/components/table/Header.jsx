
export default function Header({tableHeader}) {
    return (
        <>
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    {tableHeader.map((header, index) => (
                        <th key={index} className="px-6 py-3 text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
}