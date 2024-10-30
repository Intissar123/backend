export interface Coupon {
 

    readonly code: string;
    readonly discount: number;
    readonly isActive: boolean;
    readonly usageLimit: number;
    readonly usedCount: number;



}
