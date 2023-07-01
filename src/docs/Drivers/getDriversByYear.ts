export default {
    // method of operation
    get: {
        tags: ["driver-operations"], 
        description: "Get all driver in 1 year", 
        operationId: "getAllDriverByYear", 
        parameters: [
            {
                name: "year", 
                in: "path", 
                schema: {
                    $ref: "#/components/schemas/year", 
                },
                required: true, 
                description: "the year that the drivers participated in",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received all drivers successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/DriverList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "DriverList not found", // response desc.
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