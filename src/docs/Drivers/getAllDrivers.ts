export default {
    // method of operation
    get: {
        tags: ["driver-operations"], 
        description: "Get all drivers", 
        operationId: "getAllDriver", 
        parameters: [], 
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