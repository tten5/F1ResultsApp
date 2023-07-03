export default {
    // method of operation
    get: {
        tags: ["grandprix-operations"], 
        description: "Get all grandprix's winners in 1 year and return in grandprix's date order", 
        operationId: "getAllGrandPrixWinnerByYear", 
        parameters: [
            {
                name: "year", 
                in: "path", 
                schema: {
                    $ref: "#/components/schemas/year", 
                },
                required: true, 
                description: "the year that the grandprix is held",
            },
            {
                name: "top3", 
                in: "query", 
                schema: {
                    type: "string"
                },
                description: "by default show only top 1, to show top3 use top3=true",
            },
        ], 
        // expected responses
        responses: {
            200: {
                description: "Received all grandprix's winners successfully", 
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/WinnerList', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "GrandPrix's winners list not found", // response desc.
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