import { fetchPlanData, fetchPlansByUserId } from "@/lib/api/plansApi";
import { fetchTasksByPlanId } from "@/lib/api/tasksApi";
import { useQuery } from "@tanstack/react-query";

// Get Plan object by planId
export function usePlanByPlanId(planId: string) {
  return useQuery({
    queryKey: ["plan", planId],
    queryFn: () => fetchPlanData(planId),
    enabled: !!planId,
  });
}

// Get array of Tasks by planId and week
export function useTasksByPlanIdAndWeek(planId: string, week: number) {
  return useQuery({
    queryKey: ["weekTasks", planId],
    queryFn: () => fetchTasksByPlanId(planId, week),
    enabled: !!planId && !!week, // waits until plan data is available
  });
}

// Get array of Plans by userId
export function usePlansByUserId(userId: string) {
    return useQuery({
        queryKey: ['plans', userId],
        queryFn: () => fetchPlansByUserId(userId),
        enabled: !!userId
    });
}