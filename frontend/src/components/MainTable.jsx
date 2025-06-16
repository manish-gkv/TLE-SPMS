import Table from "./table/Table.jsx";

export default function MainTable() {
    return (
        <>
            <div className="container mt-5">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <Table />
                </div>
            </div>
        </>
    )
}