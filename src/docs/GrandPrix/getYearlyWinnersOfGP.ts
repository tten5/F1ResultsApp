export default {
    // method of operation
    get: {
        tags: ["grandprix-operations"], 
        description: "Get yearly top 3 winners of 1 grandprix place", 
        operationId: "getYearlyWinnersOfGP", 
        parameters: [
            {
                name: "place", 
                in: "path", 
                schema: {
                    $ref: "#/components/schemas/place", 
                },
                required: true, 
                description: "the place that the grandprix is held",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received all winners of 1 grandprix place successfully", 
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
                description: "Winners list of 1 grand prix palce not found", // response desc.
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