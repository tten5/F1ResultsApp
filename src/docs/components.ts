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
            firstname: {
                type: 'string',
                example: 'lewis'
            },
            lastname: {
                type: 'string',
                example: 'hamilton'
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
                    firstname: {
                        $ref: '#/components/schemas/firstname'
                    },
                    lastname: {
                        $ref: '#/components/schemas/lastname'
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
            // Participation model
            time: {
                type: "string",
                example: "1:32:58.710"
            },
            laps: {
                type: "number",
                example: 57
            },
            pos: {
                type: "string",
                example: "2"
            },
            points: {
                type: "number",
                example: 25
            },
            Participation: {
                type: "object",
                properties: {
                    _id: {
                        $ref: '#/components/schemas/id'
                    },
                    gp_id: {
                        $ref: '#/components/schemas/id'
                    },
                    driver_id: {
                        $ref: '#/components/schemas/id'
                    },
                    team_id: {
                        $ref: '#/components/schemas/id'
                    },
                    year: {
                        $ref: '#/components/schemas/year'
                    },
                    time: {
                        $ref: '#/components/schemas/time'
                    },

                    laps: {
                        $ref: '#/components/schemas/laps'
                    },
                    pos: {
                        $ref: '#/components/schemas/pos'
                    },
                    points: {
                        $ref: '#/components/schemas/points'
                    },
                },
            },
            ParticipationList: {
                type: "array", 
                description: "an array of participation",
                items: {
                    $ref: '#/components/schemas/Participation'
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