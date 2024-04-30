
// GET plan by id
export const fetchPlanData = async (id: string) => {
    const URL = 'http://localhost:8080/plans/' + `${id}`
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Failed to fetch plan data');
    }
    return response.json();
};