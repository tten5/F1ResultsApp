export default {
    // method of operation
    get: {
        tags: ["participation-operations"], 
        description: "Get all participation by grandprix", 
        operationId: "getAllParticipationByGP", 
        parameters: [
            {
                name: "id", 
                in: "path", 
                schema: {
                  $ref: "#/components/schemas/id", 
                },
                required: true, 
                description: "grandprix id that want to search",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received all participation of 1 grandprix successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/GPAllPartResponse', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "ParticipationList not found", // response desc.
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