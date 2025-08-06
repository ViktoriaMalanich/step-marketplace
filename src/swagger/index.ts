import authPath from "./paths/authPath";
import categoryPath from "./paths/categoryPath";
import userPath from "./paths/userPath";
import { AuthInput, AuthRefreshRequest, AuthResponse } from "./schemas/authSchemas";

import { Category, InputCategory } from "./schemas/categorySchemas";
import { User, InputUser } from "./schemas/userSchemas";

const swaggerUi = {
    openapi: "3.1.0",
    info: {
        title: "Step-marketplace OpenAPI documentation",
        version: "1.0.0",
        description: "This OpenAPI documentation describes the backend of the Step-marketplace project, developed as a diploma project. It provides all necessary endpoints for frontend integration."
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "Development server"
        }
    ],
    paths: {
        ...categoryPath,
        ...userPath,
        ...authPath
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Enter token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        },
        schemas: {
            InputCategory,
            Category,
            InputUser,
            User,
            AuthInput,
            AuthResponse,
            AuthRefreshRequest
        }
    }
};
export default swaggerUi;
