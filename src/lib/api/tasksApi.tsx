
// Fetch tasks
// - @param planId
// - @param week (optional)
export const fetchTasksByPlanId = async (planId: string, week?: number) => {
    const URL = 'http://localhost:8080/tasks?' + `planId=${planId}` + `${week ? `&week=${week}` : ''}`

    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks data');
    }
    return response.json();
};