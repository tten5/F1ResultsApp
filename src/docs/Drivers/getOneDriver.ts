export default {
    // method of operation
    get: {
        tags: ["driver-operations"], 
        description: "Get one driver", 
        operationId: "getOneDriver", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                  $ref: "#/components/schemas/id", 
                },
                required: true, 
                description: "A single driver id",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received specified driver successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Driver', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "Driver not found", // response desc.
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