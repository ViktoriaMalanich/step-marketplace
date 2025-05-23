import categoryPath from "./paths/categoryPath";
import { Category, InputCategory } from "./schemas/categorySchemas";

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
        ...categoryPath
    },
    components: {
        schemas: {
            InputCategory,
            Category
        }
    }
};

//  swaggerUi.paths["/categories"]



export default swaggerUi;
