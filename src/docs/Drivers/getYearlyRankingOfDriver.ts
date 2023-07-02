export default {
    // method of operation
    get: {
        tags: ["driver-operations"], 
        description: "Get yearly ranking of a driver", 
        operationId: "getYearlyRankingOfDriver", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                    type: "string"
                },
                description: "id of driver",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received yearly ranking of driver successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/DriverYearlyRankingList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "driver not found", // response desc.
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