
// Fetch tasks of a given plan and week
export const fetchWeekTasks = async (planId: string, week: number) => {
    const URL = 'http://localhost:8080/tasks?' + `planId=${planId}` + '&' + `week=${week}`;
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks data');
    }
    return response.json();
};