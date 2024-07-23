export interface User {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    provider?: string,
    tier: string,
    tokens: number,
    activePlanId: string,
    subscriptionId?: string,
    renewalDate?: number,
    subActive?: boolean,
}