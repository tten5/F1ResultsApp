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
                        type: "string",
                        example: "2023-06-18T00:00:00.000Z"
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
                        type: 'string',
                        example: 'Lewis'
                    },
                    lastname: {
                        type: 'string',
                        example: 'Hamilton'
                    },
                    nationality: {
                        $ref: '#/components/schemas/nationality'
                        
                    }
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
            team_name: {
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
                        $ref: '#/components/schemas/team_name'
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
                    real_pts: {
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
            // Winner model 
            fullname: {
                type: 'string',
                desciption: "driver's fullname",
                example: "Charles Leclerc"
            },
            Winner: {
                type: "object",
                properties: {
                    gp_id: {
                        $ref: '#/components/schemas/id'
                    },
                    grandprix: {
                        type: "string",
                        example: "Bahrain"
                    },
                    date: {
                        type: "string",
                        format: "date-time",
                        example: "Mar 20 2022"
                    },
                    pos: {
                        $ref: '#/components/schemas/pos'
                    },
                    winner: {
                        $ref: '#/components/schemas/fullname'
                    },
                    team: {
                        $ref: '#/components/schemas/team_name'
                    },
                    time: {
                        $ref: '#/components/schemas/time'
                    },
                    laps: {
                        $ref: '#/components/schemas/laps'
                    },
                },
            },
            WinnerList: {
                type: "array", 
                description: "an array of winnes of grandprix",
                items: {
                    $ref: '#/components/schemas/Winner'
                },
            },
            // SumPts model 
            rank: {
                type: 'number',
                description: "the ranking of results",
                example: 2
            },
            percentage: {
                type: 'string',
                description: "percentage of one's result over total results",
                example: "17.25"
            },
            SumPts: {
                type: "object",
                properties: {
                    driver_id: {
                        $ref: '#/components/schemas/id'
                    },
                    pos: {
                        $ref: '#/components/schemas/rank'
                    },
                    driver: {
                        $ref: '#/components/schemas/fullname'
                    },
                    nationality: {
                        $ref: '#/components/schemas/nationality'
                    },
                    team: {
                        $ref: '#/components/schemas/team_name'
                    },
                    sumPts: {
                        $ref: '#/components/schemas/points'
                    },
                    percentage: {
                        $ref: '#/components/schemas/points'
                    }
                },
            },
            SumPtsList: {
                type: "array", 
                description: "an array of sum points of drivers",
                items: {
                    $ref: '#/components/schemas/SumPts'
                },
            },
            // Driver's all participation in 1 year 
            DriverOnePar: {
                type: "object",
                properties: {
                    grandprix: {
                        type: "string",
                        example: "Bahrain"
                    },
                    date: {
                        type: "string",
                        format: "date-time",
                        example: "Mar 20 2022"
                    },
                    pos: {
                        $ref: '#/components/schemas/pos'
                    },
                    
                    team: {
                        $ref: '#/components/schemas/team_name'
                    },
                    points: {
                        $ref: '#/components/schemas/points'
                    },
                    accumPts: {
                        $ref: '#/components/schemas/points'
                    },
                },
            },
            DriverAllPar: {
                type: "array", 
                description: "an array of driver racing result of all grandprix in 1 year",
                items: {
                    $ref: '#/components/schemas/DriverOnePar'
                },
            },
            DriverAllParResponse: {
                type: "object", 
                description: "response format",
                properties: {
                    target: {
                        $ref: '#/components/schemas/Driver'
                    },
                    list: {
                        $ref: '#/components/schemas/DriverOnePar'
                    }
                }
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