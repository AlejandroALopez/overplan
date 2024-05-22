import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Task } from '@/lib/types/planTypes';

ChartJS.register(ArcElement, Tooltip);

interface ChartProps {
    tasks: Task[];
}

interface StatusCountProps {
    [k: string]: number,
}

export const WeekSummaryChart: React.FC<ChartProps> = ({ tasks }) => {

    // Initialize counters for each status
    const statusCounts: StatusCountProps = {
        'Completed': 0,
        'Active': 0,
        'In Progress': 0,
        'Backlog': 0,
    };

    // Loop through the tasks array and count the statuses
    tasks?.forEach((task: Task) => {
        if (statusCounts.hasOwnProperty(task.status)) {
            statusCounts[task.status]++;
        }
    });

    // Populate the datasets.data array with the counts
    const datasetsData = [
        statusCounts['Completed'],
        statusCounts['In Progress'],
        statusCounts['Active'],
        statusCounts['Backlog']
    ];

    const data = {
        labels: ['Completed', 'In Progress', 'Active', 'Backlog'],
        datasets: [
            {
                label: '# of tasks',
                data: datasetsData,
                backgroundColor: [
                    'rgba(20, 184, 20, 0.2)', // completed
                    'rgba(122, 20, 184, 0.2)', // in progress
                    'rgba(48, 20, 184, 0.2)', // active
                    'rgba(184, 20, 20, 0.2)', // backlog
                ],
                borderColor: [
                    'rgba(20, 184, 20, 1)',
                    'rgba(122, 20, 184, 1)',
                    'rgba(48, 20, 184, 1)',
                    'rgba(184, 20, 20, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex flex-row items-center justify-center gap-12">
            <div className='w-64 h-64'>
                <Pie
                    data={data}
                // {...props}
                />
            </div>
            <div className='flex flex-col p-4 gap-4'>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskCompleted bg-opacity-75' />
                        <p className='w-28'>Completed</p>
                    </div>
                    <p>{statusCounts['Completed']}</p>
                </div>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskInProgress bg-opacity-75' />
                        <p className='w-28'>In Progress</p>
                    </div>
                    <p>{statusCounts['In Progress']}</p>
                </div>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskActive bg-opacity-75' />
                        <p className='w-28'>Active</p>
                    </div>
                    <p>{statusCounts['Active']}</p>
                </div>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskBacklog bg-opacity-75' />
                        <p className='w-28'>Backlog</p>
                    </div>
                    <p>{statusCounts['Backlog']}</p>
                </div>
            </div>
        </div>

    )
}

export const OverallSummaryChart: React.FC<ChartProps> = ({ tasks }) => {
    const data = {
        labels: ['Done (past weeks)', 'Done (this week)', 'Remaining (this week)', 'Remaining (next weeks)'],
        datasets: [
            {
                label: '# of Votes',
                data: [8, 4, 2, 12],
                backgroundColor: [
                    'rgba(20, 184, 20, 0.2)', // Done (past weeks)
                    'rgba(122, 20, 184, 0.2)', // Done (this week)
                    'rgba(48, 20, 184, 0.2)', // Remaining (this week)
                    'rgba(184, 20, 20, 0.2)', // Remaining (next weeks)
                ],
                borderColor: [
                    'rgba(20, 184, 20, 1)',
                    'rgba(122, 20, 184, 1)',
                    'rgba(48, 20, 184, 1)',
                    'rgba(184, 20, 20, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex flex-row items-center justify-center gap-12">
            <div className='w-64 h-64'>
                <Pie
                    data={data}
                // {...props}
                />
            </div>
            <div className='flex flex-col p-4 gap-4'>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskCompleted bg-opacity-75' />
                        <p className='w-28'>Done</p>
                    </div>
                    <p>8</p>
                </div>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskInProgress bg-opacity-75' />
                        <p className='w-28'>Done</p>
                    </div>
                    <p>4</p>
                </div>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskActive bg-opacity-75' />
                        <p className='w-28'>Remaining</p>
                    </div>
                    <p>2</p>
                </div>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-8 h-8 bg-taskBacklog bg-opacity-75' />
                        <p className='w-28'>Remaining</p>
                    </div>
                    <p>12</p>
                </div>
            </div>
        </div>

    )
}