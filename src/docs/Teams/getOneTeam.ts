export default {
    // method of operation
    get: {
        tags: ["team-operations"], 
        description: "Get one team", 
        operationId: "getOneTeam", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                  $ref: "#/components/schemas/id", 
                },
                required: true, 
                description: "A single team id",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received specified team successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Team', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "Team not found", // response desc.
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