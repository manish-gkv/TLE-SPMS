export default function Filter(props) {
    return (
        <>
            <div className="container flex justify-end mx-auto gap-2">
                <label htmlFor="filter">Filter</label>
                    <select name="filterBy" id={props.filterId} className="p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    {props.options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}