import { response } from "express";

const userPath = {
    "/users": {
        description: "Resourse to work with users",
        get: {
            tags: ["Users"],
            responses: {
                "200": {
                    description: "List of users has been received",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    allOf: [
                                        { $ref: "#/components/schemas/User" }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ["Users"],
            requestBody: {
                description: "Add user",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InputUser"
                        }
                    },
                },

            },
            responses: {
                "201": {
                    description: "User has benn created",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
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
    "/users/{id}": {
        description: "Resourse to work with one user",
        get: {
            tags: ["Users"],
            summary: "Get one user by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "Numeric ID of the user to get",
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
                                    $ref: "#/components/schemas/User"
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
             tags: ["Users"],
            summary: "Update user by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID of the user to update",
                    schema: {
                        type: "integer"
                    }
                },
            ],
            requestBody: {
                description: "Updating user data",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InputUser"
                        }
                    },
                },

            },
            responses: {
                "200": {
                    description: "User successfully updated",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },
                "400": {
                    description: "Invalid input"
                },
                "404": {
                    description: "User not found"
                }
            }
        },
        delete: {
             tags: ["Users"],
            summary: "Delete user by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "User id to be delete",
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                "204": {
                    description: "User successfully deleted"
                },
                "404": {
                    description: "User not found"
                }
            }
        }

    },

}

export default userPath;