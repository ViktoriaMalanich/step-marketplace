import { z as validator } from 'zod';

export const ordersStatisticsQueryValidator = validator.object({

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
