import { Team } from "../models/team";
import { Participation } from "../models/participation";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetOne, resGetAllOfOne } from "../utils/types";
import { config } from "../config";
import { Types } from "mongoose";

/**
 * get all teams
 */
export const getTeamsHandler = async (req: Request, res: Response) => {
    try {
        const teamList = await Team.find({})
        const msg: resGetALL = {
            message: "successfully get all teams",
            list: teamList
        }
        
        return res.status(200).json(msg)
    }
    catch(err) {
        console.log("get teams list error")
        console.log(err)
        const msg : resFormat = {message: "get teams list fail"}
        return res.status(500).json(msg)
    }
}

/**
 * get one specific team by the id
 */

export const getOneTeamHandler = async (req: Request, res: Response) => {
    try {
        const team = await Team.findById(req.params.id)
        if (!team) {
            return res.status(404).json({ message: "team not found" })
        }
        const msg : resGetOne = { message: "successfully get team", target: team}
        return res.status(200).json(msg)    
    } 
    catch (err) {
        console.log("get team list error")
        console.log(err)
        const msg : resFormat = {message: "get team fail"}
        return res.status(500).json(msg)
    }
}


/**
 * get all team in 1 year and return in alphabet order
 */
export const getTeamsByYearHandler = async (req: Request, res: Response) => {
    try {
        // unique teamIds of 1 year
        const teamIdList = await Participation.find({ year: Number(req.params.year) }).distinct("team_id")
        if (teamIdList.length == 0) {
            const msg: resFormat = {
                message: "there is no team in that year",
            }
            return res.status(404).json(msg)
        }

        const teamList = await Team.find({ _id: { $in: teamIdList }}).sort({t_name: 1})        
        if (teamList.length == 0) {
            const msg: resFormat = {
                message: "there is no team in that year",
            }
            return res.status(404).json(msg)
        }
        
        const msg: resGetALL = {
            message: "successfully get all teams in 1 year",
            list: teamList
        }
        
        return res.status(200).json(msg)
    }
    catch(err) {
        console.log("get team list in 1 year error")
        console.log(err)
        const msg : resFormat = {message: "get teams in 1 year fail"}
        return res.status(500).json(msg)
    }
}

/**
 * get sum points of all team in 1 year 
 */
export const getSumPtsAllTeamsHandler = async (req: Request, res: Response) => {
    try {

        const year = Number(req.params.year)
        const sumPts = await Participation.aggregate([
            {
                $match: {
                    year: year
                }
            },
            {
                $group: {
                    _id: '$team_id',
                    sumPoints: { $sum: '$real_pts' },
                }
            },
            {
                $lookup: {
                    from: config.db.teamsColl,
                    localField: '_id',
                    foreignField: '_id',
                    as: 'team'
                }
            },
            {
                $setWindowFields: {
                    partitionBy: "$state",
                    sortBy: { sumPoints: -1 },
                    output: {
                        rankOrder: {
                            $rank: {}
                        }
                    }
                }
            },
        ])
        if (sumPts.length == 0) {
            const msg: resFormat = {
                message: "no teams points to be found",
            }
            return res.status(404).json(msg)
        }

        // Add percentage field to output
        let totalSumPts = 0.0
        for (let i = 0; i < sumPts.length; i++) {
            totalSumPts += sumPts[i].sumPoints
        }
        let sumPtsOutput = []
        for (let i = 0; i < sumPts.length; i++) {

            sumPtsOutput.push({
                team_id: sumPts[i].team[0]._id,
                pos: sumPts[i].rankOrder,
                team:  sumPts[i].team[0].t_name,
                sumPts: sumPts[i].sumPoints,
                percentage: ((sumPts[i].sumPoints / totalSumPts) * 100).toFixed(2) // to 2 decimal places
            })
            
        }

        const msg: resGetALL = {
            message: "successfully get all teams' sum points",
            list: sumPtsOutput
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get all teams' sum points error")
        console.log(err)
        const msg: resFormat = { message: "get all teams' sum points fail" }
        return res.status(500).json(msg)
    }
}


/**
 * get yearly ranking 1 team  
 */
export const getYearlyRankingOfTeamHandler = async (req: Request, res: Response) => {
    try {
        const team = await Team.findById(req.params.id)
        if (!team) {
            const msg: resFormat = {
                message: "team not found",
            }
            return res.status(404).json(msg)
        }
        // take all year 
        const yearStart = config.db.yearStart
        const yearEnd = config.db.yearEnd

        let yearlyRanking = []
        let currentRank = 0

        for (let year = yearStart; year <= yearEnd; year++) {
            const sumPts = await Participation.aggregate([
                {
                    $match: {
                        year: year
                    }
                },
                {
                    $group: {
                        _id: '$team_id',
                        sumPoints: { $sum: '$real_pts' },
                    }
                },
                {
                    $setWindowFields: {
                        partitionBy: "$state",
                        sortBy: { sumPoints: -1 },
                        output: {
                            rankOrder: {
                                $rank: {}
                            }
                        }
                    }
                },
                {
                    $match: {
                        _id: new Types.ObjectId(req.params.id)
                    }
                },
            ])
            if (sumPts.length == 0) {
                continue // the team did not participate in that year
            }

            let rankChanged: number;
            if (yearlyRanking.length==0) {
                rankChanged = 0 // first record of rank
            } else {
                rankChanged = - (sumPts[0].rankOrder - currentRank)
            }
         
            yearlyRanking.push({
                year: year,
                sumPts: sumPts[0].sumPoints,
                rank: sumPts[0].rankOrder,
                rankChanged: rankChanged,
            })
            currentRank = sumPts[0].rankOrder
        }

        if (yearlyRanking.length === 0) {
            const msg: resFormat = {
                message: "no drivers points to be found",
            }
            return res.status(404).json(msg)
        }
        
        const msg: resGetAllOfOne = {
            message: "successfully get team yearly ranking",
            target: team,
            list: yearlyRanking
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get team yearly ranking error")
        console.log(err)
        const msg: resFormat = { message: "get team yearly ranking fail" }
        return res.status(500).json(msg)
    }
}


/**
 * get yearly best driver of 1 team  
 */
export const getYearlyBestDriverHandler = async (req: Request, res: Response) => {
    try {
        const team = await Team.findById(req.params.id)
        if (!team) {
            const msg: resFormat = {
                message: "team not found",
            }
            return res.status(404).json(msg)
        }
        // take all year 
        const yearStart = config.db.yearStart
        const yearEnd = config.db.yearEnd

        let yearlyBestDriver = []

        for (let year = yearStart; year <= yearEnd; year++) {
            const sumPts = await Participation.aggregate([
                {
                    $match: {
                        year: year,
                        team_id: new Types.ObjectId(req.params.id)
                    }
                },
                {
                    $group: {
                        _id: '$driver_id',
                        sumPoints: { $sum: '$real_pts' },
                    }
                },
                {
                    $lookup: {
                        from: config.db.driversColl,
                        localField: '_id',
                        foreignField: '_id',
                        as: 'driver'
                    }
                },
                {
                    $sort: 
                        { sumPoints: -1 }
                },
            ])
            if (sumPts.length == 0) {
                const msg: resFormat = {
                    message: "no teams participation to be found",
                }
                return res.status(404).json(msg)
            }

            let totalSumPts = 0.0
            for (let i = 0; i < sumPts.length; i++) {
                totalSumPts += sumPts[i].sumPoints
            }

         
            yearlyBestDriver.push({
                year: year,
                driver: `${sumPts[0].driver[0].firstname} ${sumPts[0].driver[0].lastname}`,
                nationality: sumPts[0].driver[0].nationality,
                sumPts: sumPts[0].sumPoints,
                teamTotalPts: totalSumPts,
                percentage: ((sumPts[0].sumPoints / totalSumPts) * 100).toFixed(2)
            })
        }
        
        const msg: resGetAllOfOne = {
            message: "successfully get team yearly best driver",
            target: team,
            list: yearlyBestDriver
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get team yearly ranking error")
        console.log(err)
        const msg: resFormat = { message: "get team yearly best driver fail" }
        return res.status(500).json(msg)
    }
}