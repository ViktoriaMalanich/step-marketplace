import { response } from "express";
import { Category } from "../schemas/categorySchemas";

const categoryPath = {
    "/categories": {
        description: "Resourse to work with categories",
        get: {
            tags: ["Categories"],
            responses: {
                "200": {
                    description: "Category list have been received",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    allOf: [
                                        { $ref: "#/components/schemas/Category" }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ["Categories"],
            requestBody: {
                description: "Add category",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InputCategory"
                        }
                    },
                },

            },
            responses: {
                "201": {
                    description: "Category has benn created",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Category"
                            }
                        }
                    }
                },
                "400": {
                     description: "Invalid input"
                }
            }

        },
    },

    "/categories/{id}": {
        get: {
            tags: ["Categories"],
            summary: "Get a category by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "Numeric ID of the category to get",
                    schema: {
                        type: "integer"
                    }
                },
            ],

            responses: {
                200: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                items: {
                                    type: "object",
                                    $ref: "#/components/schemas/Category"
                                }
                            }
                        }
                    }
                },
                404: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        },
        put: {
            
        },
        delete: {}
    }
}

export default categoryPath;
