import { Driver, IDriver } from "../models/driver";
import { Participation } from "../models/participation";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetAllOfOne, resGetOne } from "../utils/types";
import { config } from "../config";
import { Types } from "mongoose";

/**
 * get all drivers and return in alphabetical order
 */
export const getDriversHandler = async (req: Request, res: Response) => {
    try {
        let driverList: IDriver[]
        if (req.query.sort === 'firstname') {
            driverList = await Driver.find({}).sort({ firstname: 1 })
        } else {
            driverList = await Driver.find({}).sort({ lastname: 1 })
        }
        const msg: resGetALL = {
            message: "successfully get all drivers",
            list: driverList
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get drivers list error")
        console.log(err)
        const msg: resFormat = { message: "get drivers list fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get one specific driver by the id
 */

export const getOneDriverHandler = async (req: Request, res: Response) => {
    try {
        const driver = await Driver.findById(req.params.id)
        if (!driver) {
            return res.status(404).json({ message: "driver not found" })
        }
        const msg: resGetOne = { message: "successfully get driver", target: driver }
        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get driver list error")
        console.log(err)
        const msg: resFormat = { message: "get driver fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get all driver in 1 year and return in order
 */
export const getDriversByYearHandler = async (req: Request, res: Response) => {
    try {
        // unique driverIds of 1 year
        const driverIdList = await Participation.find({ year: Number(req.params.year) }).distinct("driver_id")
        if (driverIdList.length == 0) {
            const msg: resFormat = {
                message: "there is no driver in that year",
            }
            return res.status(404).json(msg)
        }

        let driverList: IDriver[]
        if (req.query.sort === 'firstname') {
            driverList = await Driver.find({ _id: { $in: driverIdList } }).sort({ firstname: 1 })
        } else {
            driverList = await Driver.find({ _id: { $in: driverIdList } }).sort({ lastname: 1 })
        }

        if (driverList.length == 0) {
            const msg: resFormat = {
                message: "there is no driver in that year",
            }
            return res.status(404).json(msg)
        }

        const msg: resGetALL = {
            message: "successfully get all drivers in 1 year",
            list: driverList
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get driver list in 1 year error")
        console.log(err)
        const msg: resFormat = { message: "get drivers in 1 year fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get sum points of all driver in 1 year 
 */
export const getSumPtsAllDriversHandler = async (req: Request, res: Response) => {
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
                    _id: '$driver_id',
                    sumPoints: { $sum: '$real_pts' },
                    team_id: {
                        $addToSet: {
                            team_id: '$team_id'
                        }
                    } // to find team
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
                $lookup: {
                    from: config.db.teamsColl,
                    localField: 'team_id.team_id',
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
                message: "no drivers points to be found",
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
            const driverFirstname = sumPts[i].driver[0].firstname
            const driverLastname = sumPts[i].driver[0].lastname

            sumPtsOutput.push({
                driver_id: sumPts[i].driver[0]._id,
                pos: sumPts[i].rankOrder,
                driver: `${driverFirstname} ${driverLastname}`,
                nationality: sumPts[i].driver[0].nationality,
                team: sumPts[i].team[0].t_name,
                sumPts: sumPts[i].sumPoints,
                percentage: ((sumPts[i].sumPoints / totalSumPts) * 100).toFixed(2) // to 2 decimal places
            })
        }

        const msg: resGetALL = {
            message: "successfully get all drivers' sum points",
            list: sumPtsOutput
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get all drivers' sum points error")
        console.log(err)
        const msg: resFormat = { message: "get all drivers' sum points fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get all drivers by their name
 */
export const searchDriversByNameHandler = async (req: Request, res: Response) => {
    try {
        let driverList: IDriver[]
        if (!req.body.driverName) {
            const msg: resFormat = {
                message: "please provide driver name",
            }
            return res.status(400).json(msg)
        }

        if (req.body.isLastName) {
            driverList = await Driver.find({lastname: req.body.driverName})
        } else {
            driverList = await Driver.find({firstname: req.body.driverName})
        }
        if (driverList.length == 0) {
            const msg: resFormat = {
                message: "cannot find driver with such name",
            }
            return res.status(404).json(msg)
        }

        const msg: resGetALL = {
            message: "successfully get driver(s) by name",
            list: driverList
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get driver(s) by name error")
        console.log(err)
        const msg: resFormat = { message: "get driver(s) by name fail" }
        return res.status(500).json(msg)
    }
}


/**
 * get yearly ranking 1 driver  
 */
export const getYearlyRankingOfDriverHandler = async (req: Request, res: Response) => {
    try {
        const driver = await Driver.findById(req.params.id)
        if (!driver) {
            const msg: resFormat = {
                message: "driver not found",
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
                        _id: '$driver_id',
                        sumPoints: { $sum: '$real_pts' },
                        team_id: {
                            $addToSet: {
                                team_id: '$team_id'
                            }
                        } // to find team
                    }
                },
                {
                    $lookup: {
                        from: config.db.teamsColl,
                        localField: 'team_id.team_id',
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
                {
                    $match: {
                        _id: new Types.ObjectId(req.params.id)
                    }
                },
            ])
            if (sumPts.length == 0) {
                continue
            }

            let rankChanged: number;
            if (yearlyRanking.length==0) {
                rankChanged = 0 // first record of rank
            } else {
                rankChanged = - (sumPts[0].rankOrder - currentRank)
            }
         
            yearlyRanking.push({
                year: year,
                team: sumPts[0].team[0].t_name,
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
            message: "successfully get driver yearly ranking",
            target: driver,
            list: yearlyRanking
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get driver yearly ranking error")
        console.log(err)
        const msg: resFormat = { message: "get driver yearly ranking fail" }
        return res.status(500).json(msg)
    }
}
