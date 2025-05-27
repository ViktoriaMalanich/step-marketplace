import { response } from "express";
import { Category } from "../schemas/categorySchemas";

const categoryPath = {
    description: "Resourse to work with one category",
    "/categories": {
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
            tags: ["Categories"],
            summary: "Update a category by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID of the category to update",
                    schema: {
                        type: "integer"
                    }
                },
            ],
            requestBody: {
                description: "Updated data for the category",
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
                "200": {
                    description: "Category successfully updated",
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
                },
                "404": {
                    description: "Category not found"//выдает ошибку 500
                }
            }
        },
        delete: {
            tags: ["Categories"],
            summary: "Delete a category by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID of the category to delete",
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                "204": {
                    description: "Category successfully deleted"
                },
                "404": {
                    description: "Category not found"
                }
            }
        }
    }
}

export default categoryPath;
