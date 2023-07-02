export default {
    // method of operation
    get: {
        tags: ["participation-operations"], 
        description: "Get all participation by 1 team in 1 year", 
        operationId: "getAllParticipationByTeam", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                  $ref: "#/components/schemas/id", 
                },
                required: true, 
                description: "team id that want to search",
            },
            {
                name: "year", 
                in: "path", 
                schema: {
                  $ref: "#/components/schemas/year", 
                },
                required: true, 
                description: "the year that the team participated in",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received all participation successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/TeamAllPartResponse', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "ParticipationList not found", // response desc.
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