export default {
    // method of operation
    get: {
        tags: ["grandprix-operations"], 
        description: "Get all grandprix in 1 year", 
        operationId: "getAllGrandPrixByYear", 
        parameters: [
            {
                name: "year", 
                in: "path", 
                schema: {
                    $ref: "#/components/schemas/year", 
                },
                required: true, 
                description: "the year that the grandprix is held",
            },
            {
                name: "sort", 
                in: "query", 
                schema: {
                    type: "string"
                },
                description: "default sort is by date, indicate sort by place by using sort=place",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received all grandprix successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/GrandPrixList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "GrandPrixList not found", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", // error data model
                        },
                    },
                },
            },
            500: {
                description: "Internal error", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", // error data model
                        },
                    },
                },
            },
        },
    }
};