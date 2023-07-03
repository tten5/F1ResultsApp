export default {
    // method of operation
    get: {
        tags: ["grandprix-operations"], 
        description: "Get all grandprix", 
        operationId: "getAllGrandPrix", 
        parameters: [], 
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