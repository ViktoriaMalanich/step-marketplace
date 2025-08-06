import { z as validator } from 'zod';

export const ordersStatisticsQueryValidator = validator.object({
    // marketId: validator
    //     .string()
    //     .min(1, 'marketId is required')
    //     .transform(Number)
    //     .refine(val => !isNaN(val), {
    //         message: 'marketId must be a number',
    //     })
    //     .optional(),

    startDate: validator
        .preprocess((val) => {
            if (typeof val === 'string' && !isNaN(Date.parse(val))) {
                return new Date(val);
            }
            return undefined;
        }, validator.date())
        .default(new Date('2025-01-01')),

    endDate: validator
        .preprocess((val) => {
            if (typeof val === 'string' && !isNaN(Date.parse(val))) {
                return new Date(val);
            }
            return undefined;
        }, validator.date())
        .default(new Date())
});
