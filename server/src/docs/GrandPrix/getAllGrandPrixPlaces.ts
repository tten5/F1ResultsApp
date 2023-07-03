export default {
    // method of operation
    get: {
        tags: ["grandprix-operations"], 
        description: "Get all grandprix places", 
        operationId: "getAllGrandPrixPlaces", 
        parameters: [], 
        // expected responses
        responses: {
            200: {
                description: "Received all grandprix places successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/PlacesList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "GrandPrix Place list not found", // response desc.
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