export default {
    // method of operation
    get: {
        tags: ["participation-operations"], 
        description: "Get one participation", 
        operationId: "getOneParticipation", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                  $ref: "#/components/schemas/id", 
                },
                required: true, 
                description: "A single participation id",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received specified participation successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Participation', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "Participation not found", // response desc.
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