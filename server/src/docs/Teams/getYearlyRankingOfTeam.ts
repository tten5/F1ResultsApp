export default {
    // method of operation
    get: {
        tags: ["team-operations"], 
        description: "Get yearly ranking of a team", 
        operationId: "getYearlyRankingOfTeam", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                    type: "string"
                },
                description: "id of team",
                required: true
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received yearly ranking of team successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/TeamYearlyRankingList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "team not found", // response desc.
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