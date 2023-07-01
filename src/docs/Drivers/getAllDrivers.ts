export default {
    // method of operation
    get: {
        tags: ["driver-operations"], 
        description: "Get all drivers and return in place order", 
        operationId: "getAllDriver", 
        parameters: [
            {
                name: "sort", 
                in: "query", 
                schema: {
                    type: "string"
                },
                description: "default sort is by lastname, indicate sort by alphabet by using sort=firstname",
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