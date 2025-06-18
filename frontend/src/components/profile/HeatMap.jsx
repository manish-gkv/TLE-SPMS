import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import GetUserHeatMapValues from '../../utility/getUserHeatMapValues';

export default function HeatMap(props) {
    const {userSubmissionData} = props;
    const heatMapValues = GetUserHeatMapValues(userSubmissionData.submissions);
    return (
        <>
            <div className="p-1 sm:p-4 bg-white dark:bg-gray-900 rounded-lg">
                <CalendarHeatmap
                    startDate={new Date()-365 * 24 * 60 * 60 * 1000}
                    endDate={new Date()}
                    values={heatMapValues}
                    classForValue={(value) => {
                        if (!value) {
                            return 'color-empty';
                        }
                        return `color-github-${Math.min(value.count, 4)}`;
                    }}
                />
                </div>
        </>
    );
}