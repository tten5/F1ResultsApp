export default {
    // method of operation
    get: {
        tags: ["team-operations"], 
        description: "Get all teams", 
        operationId: "getAllTeam", 
        parameters: [], 
        // expected responses
        responses: {
            200: {
                description: "Received all teams successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/TeamList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "TeamList not found", // response desc.
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