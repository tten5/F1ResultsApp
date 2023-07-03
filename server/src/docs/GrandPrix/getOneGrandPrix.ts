export default {
    // method of operation
    get: {
        tags: ["grandprix-operations"], 
        description: "Get one grandprix", 
        operationId: "getOneGrandPrix", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                  $ref: "#/components/schemas/id", 
                },
                required: true, 
                description: "A single grandprix id",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received specified grandprix successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/GrandPrix', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "GrandPrix not found", // response desc.
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
                description: "Internal errors", // response desc.
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