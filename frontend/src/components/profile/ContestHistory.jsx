import { useState, useEffect } from 'react';
import Header from '../table/Header';
import { CONTEST_HISTORY_FIELDS, CONTEST_HISTORY_HEADERS } from '../../utility/constants';
import Filter from '../utility/Filter';

function Row(props) {
    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
            {props.tableFields.map((field, index) => (
                <td 
                    key={index} 
                    className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                >
                    <span className="inline-block min-w-[50px]">
                        {props[field] || "N/A"}
                    </span>
                </td>
            ))}
        </tr>
    );
}

function Table(props) {
    const { contestHistory } = props;
    
    return (
        <div className="shadow-sm rounded-lg overflow-x-auto  border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <Header tableHeader={CONTEST_HISTORY_HEADERS}/>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {contestHistory?.length > 0 ? (
                        contestHistory.map((contest) => (
                            <Row 
                                key={contest._id} 
                                {...contest} 
                                tableFields={CONTEST_HISTORY_FIELDS}
                            />
                        ))
                    ) : (
                        <tr>
                            <td 
                                colSpan={CONTEST_HISTORY_HEADERS.length} 
                                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                            >
                                No contest history available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default function ContestHistory(props) {
    const { contestHistory } = props; 
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filteredContestHistory, setFilteredContestHistory] = useState(contestHistory);
    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: '30', label: 'Last 30 Days' },
        { value: '90', label: 'Last 90 Days' },
        { value: '365', label: 'Last 365 Days' }
    ];

    useEffect(() => {
       const days = {
            'all': null,
            '30': 30,
            '90': 90,
            '365': 365
        };
        const filterDays = days[selectedFilter];

        const data = contestHistory.filter((contest) => {
            if (!filterDays) return true;
            const contestDate = new Date(contest.ratingUpdateTimeSeconds * 1000);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - contestDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= filterDays;
        });
        // Sort by ratingUpdateTimeSeconds in descending order 
        data.sort((a, b) => b.ratingUpdateTimeSeconds - a.ratingUpdateTimeSeconds);
        setFilteredContestHistory(data);
        
    }, [selectedFilter]);

    return (
        <div className="col-span-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
            <div className=" justify-between items-center mb-6 gap-4">
                <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-200">
                    Contest History
                </h2>
                <Filter 
                    options={filterOptions} 
                    filterId={"ContestHistory"}
                    onFilterChange={(value) => setSelectedFilter(value)}
                />
            </div>
            
            <div className="max-h-[70vh] overflow-x-auto overflow-y-auto rounded-lg">
                <Table contestHistory={filteredContestHistory} />
            </div>
        </div>
    );
}