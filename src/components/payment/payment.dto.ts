export interface PaymentDto {
    userId: number;
    name?: string | null;
    stripeId: string;
    created: Date;
    invoice_prefix?: string | null;
}