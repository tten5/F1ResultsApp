export default {
    components: {
        schemas: {
            id: {
                type: "string",
                example: "abc1234",
            },

            // GrandPrix model
            place: {
                type: 'string',
                example: 'Canada'
            },
            year: {
                type: "number",
                example: "2023"
            },
            date: {
                type: "string",
                format: "date-time",
                example: "2023-06-18T00:00:00.000Z"
            },
            GrandPrix: {
                type: "object",
                properties: {
                    _id: {
                        $ref: '#/components/schemas/id'
                    },
                    place: {
                        $ref: '#/components/schemas/place'
                    },
                    year: {
                        $ref: '#/components/schemas/year'
                    },
                    date: {
                        $ref: '#/components/schemas/date'
                    },
                },
            },
            GrandPrixList: {
                type: "array", // data type
                description: "an array of grandprix",
                items: {
                    $ref: '#/components/schemas/GrandPrix'
                },
            },
            // Driver model
            name: {
                type: 'string',
                example: 'Lewis Hamilton'
            },
            nationality: {
                type: 'string',
                example: 'GBR'
            },
            Driver: {
                type: "object",
                properties: {
                    _id: {
                        $ref: '#/components/schemas/id'
                    },
                    name: {
                        $ref: '#/components/schemas/name'
                    },
                    nationality: {
                        $ref: '#/components/schemas/nationality'
                    },
                },
            },
            DriverList: {
                type: "array", // data type
                description: "an array of drivers",
                items: {
                    $ref: '#/components/schemas/Driver'
                },
            },
            // Team model
            t_name: {
                type: 'string',
                example: 'Mercedes'
            },          
            Team: {
                type: "object",
                properties: {
                    _id: {
                        $ref: '#/components/schemas/id'
                    },
                    t_name: {
                        $ref: '#/components/schemas/t_name'
                    }
                },
            },
            TeamList: {
                type: "array", 
                description: "an array of teams",
                items: {
                    $ref: '#/components/schemas/Team'
                },
            },
            // Error model
            Error: {
                type: "object", //data type
                properties: {
                    message: {
                        type: "string",
                        description: "Error message",
                        example: "Not found",
                    }
                },
            },
        },
    },
};