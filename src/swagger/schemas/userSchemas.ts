export const User = {
    type: "object",
    properties: {
        id: {
            type: "number",
            example: "1"
        },
        firstName: {
            type: "string",
            example: "Vasyl",
            description: "Name of user",
            required: true
        },
        lastName: {
            type: "string",
            example: "Lomachenko",
            description: "Last name of user",
            required: true
        },
        email: {
            type: "string",
            example: "vasylLomachenko@ukr.net",
            description: "Email of user",
            required: true
        },
        phone: {
            type: "string",
            example: "123400000",
            description: "Phone of user",
            required: true
        },
        role: {
            type: "string",
            example: "CUSTOMER | ADMIN | ROOT",
            description: "Password of user",
            required: true
        },
        createdAt: {
            type: "string",
            example: "2025-04-17T14:32:13.000Z",
            description: "Creation date"
        },
        updatedAt: {
            type: "string",
            example: "2025-04-17T14:32:13.000Z",
            description: "Date of updating"
        },
    }
};

export const InputUser = {
    type: "object",
    properties: {
        firstName: {
            type: "string",
            example: "Vasyl",
            description: "Name of user",
            required: true
        },
        lastName: {
            type: "string",
            example: "Lomachenko",
            description: "Last name of user",
            required: true
        },
        email: {
            type: "string",
            example: "vasylLomachenko@ukr.net",
            description: "Email of user",
            required: true
        },
        phone: {
            type: "string",
            example: "123400000",
            description: "Phone of user",
            required: true
        },
        password: {
            type: "string",
            example: "password",
            description: "Password of user",
            required: true
        },
        role: {
            type: "string",
            enum: ["CUSTOMER", "ADMIN", "ROOT"],
            example: "CUSTOMER",
            description: "Password of user",
            required: true
        }
    }
};