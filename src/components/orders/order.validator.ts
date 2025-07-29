import { ErrorHendler } from "../../classes/ErrorHandler";
import { DELIVERY_STATUS } from "../../types";

// Опциональная валидация переходов статусов
export const validateStatusTransition = (currentStatus: DELIVERY_STATUS, newStatus: DELIVERY_STATUS) => {
    const validTransitions: Record<DELIVERY_STATUS, DELIVERY_STATUS[]> = {
        "NONE": ["PROCESSING"],
        "PROCESSING": ["IN_TRANSIT"],
        "IN_TRANSIT": ["DELIVERED"],
        "DELIVERED": ["COMPLETED"],
        "COMPLETED": []
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
         throw new ErrorHendler(400,`Invalid status transition from ${currentStatus} to ${newStatus}`);
    }
};