import { useEffect, useState } from 'react';

import Row from './Row.jsx';
import Header from './Header.jsx';
import { MAIN_TABLE_HEADERS, MAIN_TABLE_FIELDS} from '../../utility/constants.js';

export default function Table(props) {
    
    const { students, setStudents } = props;

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <Header tableHeader={MAIN_TABLE_HEADERS}/>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {students.map((student) => {
                        return <Row key={student._id} {...student} tableFields={MAIN_TABLE_FIELDS} studentList={{students, setStudents}}/>
                    })}
                </tbody>
            </table>
        </>
    );
}