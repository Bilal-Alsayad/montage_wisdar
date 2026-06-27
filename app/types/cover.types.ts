// --- Cover render request body ---
export interface CoverRequest {
    template: string;
    data: Record<string, unknown>;
}