export default {
    // method of operation
    get: {
        tags: ["driver-operations"], 
        description: "Get all drivers' sum points in 1 year and return in ranking order", 
        operationId: "getAllDriversSumPtsByYear", 
        parameters: [
            {
                name: "year", 
                in: "path", 
                schema: {
                    $ref: "#/components/schemas/year", 
                },
                required: true, 
                description: "the year that the driver participated in",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received all drivers' sum points successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/SumPtsList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "no drivers points to be found", // response desc.
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