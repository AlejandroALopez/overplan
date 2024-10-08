import { fetchBadgesByUserId } from "@/lib/api/badgesApi";
import { fetchPlanData, fetchPlansByUserId } from "@/lib/api/plansApi";
import { fetchTasksByPlanId } from "@/lib/api/tasksApi";
import { fetchUserById } from "@/lib/api/usersApi";
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
export function useTasksByPlanIdAndWeek(planId: string, week?: number) {
  return useQuery({
    queryKey: ["weekTasks", planId],
    queryFn: () => fetchTasksByPlanId(planId, week),
    enabled: !!planId && !!week, // waits until plan data is available
  });
}

// Get array of Tasks by planId
// NOTE: Only use this within Metrics page
export function useAllTasks(planId: string) {
  return useQuery({
    queryKey: ["metricsTasks", planId],
    queryFn: () => fetchTasksByPlanId(planId),
    enabled: !!planId, // waits until plan data is available
  });
}

// Get array of Plans by userId
export function usePlansByUserId(userId: string) {
  return useQuery({
    queryKey: ["plans", userId],
    queryFn: () => fetchPlansByUserId(userId),
    enabled: !!userId,
  });
}

// Get array of Badges by userId
export function useBadgesByUserId(userId: string) {
  return useQuery({
    queryKey: ["badges", userId],
    queryFn: () => fetchBadgesByUserId(userId),
    enabled: !!userId,
  });
}

// Get User object by userId
export function useUserById(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
  });
}
