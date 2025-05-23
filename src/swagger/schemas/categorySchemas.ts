export const Category = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number",
            "example": "12"
        },
        "name": {
            type: "string",
            example: "cosmetics",
            description: "Name of category"
        },
        "description": {
            "type": "string",
            "example": "cosmetics for face",
            "description": "Category's description"
        },
        "img": {
            "type": "string",
            "example": "/path/to/img",
            "description": "img url"
        },
        "createdAt": {
            "type": "string",
            "example": "2025-04-17T14:32:13.000Z",
            "description": "Creation date"
        },
        "updatedAt": {
            "type": "string",
            "example": "2025-04-17T14:32:13.000Z",
            "description": "Date of updating"
        },
        "parentId": {
            "type": "number",
            "example": "12",
            "description": "Referense to parent category"
        },
        "subcategories": {
            "type": "array",
            "description": "Array of subcategories, items type is Category",
            items: {
                $ref: "#/components/schemas/Category"
            }
        }
    }
};

export const InputCategory = {
    type: "object",
    properties: {
        name: {
            type: "string",
            example: "cosmetics",
            description: "Name of category",
            required: true
        },
        description: {
            type: "string",
            example: "cosmetics for face",
            description: "Category's description"
        },
        img: {
            type: "string",
            example: "/path/to/img",
            description: "img url"
        },
        parentId: {
            type: "number",
            example: "12",
            description: "Referense to parent category"
        }
    }
}
