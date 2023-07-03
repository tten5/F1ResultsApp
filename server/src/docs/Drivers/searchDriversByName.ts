export default {
    post: {
        tags: ["driver-operations"],
        description: "search driver(s) by name",
        operationId: "getDriversByName",
        parameters: [],
        requestBody: {
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/DriverInput",
                    },
                },
            },
        },
        // expected responses
        responses: {
            200: {
                description: "Received driver(s) by name successfully",
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
                description: "Driver(s) not found", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", 
                        },
                    },
                },
            },
            400: {
                description: "not valid input", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", 
                        },
                    },
                },
            },
            500: {
                description: "Internal error", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", 
                        },
                    },
                },
            },
        }
    }
};