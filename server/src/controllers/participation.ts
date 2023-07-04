import { Participation } from "../models/participation";
import { Driver } from "../models/driver";
import { GrandPrix } from "../models/grandprix";
import { Team } from "../models/team";
import { Request, Response } from "express";
import {
    resFormat,
    resGetALL,
    resGetAllOfOne,
    resGetOne,
    resGetAllOfOneTeam,
    driverContri
} from "../utils/types";
import { config } from "../config";
import { Types } from "mongoose"

/**
 * get all participation of 1 grandprix
 */
export const getParticipationsByGPHandler = async (req: Request, res: Response) => {
    try {
        const grandprix = await GrandPrix.findById(req.params.id)
        if (!grandprix) {
            const msg: resFormat = {
                message: "no grandprix found",
            }
            return res.status(404).json(msg)
        }
        const participationList = await Participation.aggregate([
            {
                $match: {
                    gp_id: new Types.ObjectId(req.params.id),
                }
            },
            {
                $lookup: {
                    from: config.db.driversColl,
                    localField: 'driver_id',
                    foreignField: '_id',
                    as: 'driver'
                }
            },
            {
                $lookup: {
                    from: config.db.teamsColl,
                    localField: 'team_id',
                    foreignField: '_id',
                    as: 'team'
                }
            },
        ])


        if (participationList.length == 0) {
            const msg: resFormat = {
                message: "there is no participation of such grandprix",
            }
            return res.status(404).json(msg)
        }

        let participationOutput = []
        
        for (let i = 0; i < participationList.length; i++) {
            const driverFirstname = participationList[i].driver[0].firstname
            const driverLastname = participationList[i].driver[0].lastname

            participationOutput.push({
                pos: participationList[i].pos,
                driver: `${driverFirstname} ${driverLastname}`,
                team: participationList[i].team[0].t_name,
                laps: participationList[i].laps,
                time: participationList[i].time,
                points: participationList[i].points,
            })
        }


        const msg: resGetAllOfOne = {
            message: "successfully get all participation of 1 driver in 1 year",
            target: grandprix,
            list: participationOutput
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get participation list error")
        console.log(err)
        const msg: resFormat = { message: "get participation list fail" }
        return res.status(500).json(msg)
    }
}



/**
 * get all participation of 1 driver in 1 year  
 */
export const getParticipationsByDriverHandler = async (req: Request, res: Response) => {
    try {
        const driver = await Driver.findById(req.params.id)
        if (!driver) {
            const msg: resFormat = {
                message: "no driver found",
            }
            return res.status(404).json(msg)
        }
        const participationList = await Participation.aggregate([
            {
                $match: {
                    driver_id: new Types.ObjectId(req.params.id),
                    year: Number(req.params.year)
                }
            },
            {
                $lookup: {
                    from: config.db.grandprixColl,
                    localField: 'gp_id',
                    foreignField: '_id',
                    as: 'grandprix'
                }
            },
            {
                $lookup: {
                    from: config.db.teamsColl,
                    localField: 'team_id',
                    foreignField: '_id',
                    as: 'team'
                }
            },
            {
                $sort: {
                    'grandprix.date': 1,
                },
            }
        ])


        if (participationList.length == 0) {
            const msg: resFormat = {
                message: "there is no participation of such driver in that year",
            }
            return res.status(404).json(msg)
        }

        let participationOutput = []
        let accumPts = 0.0
        const formatOptions = { day: '2-digit', month: 'short', year: 'numeric' };

        for (let i = 0; i < participationList.length; i++) {

            const formattedDate = participationList[i].grandprix[0].date.
                toLocaleDateString('en-US', formatOptions).replace(',', '');
            accumPts += participationList[i].real_pts
            participationOutput.push({
                grandprix: participationList[i].grandprix[0].place,
                date: formattedDate,
                team: participationList[i].team[0].t_name,
                pos: participationList[i].pos,
                points: participationList[i].real_pts,
                accumPts: accumPts
            })
        }


        const msg: resGetAllOfOne = {
            message: "successfully get all participation of 1 driver in 1 year",
            target: driver,
            list: participationOutput
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get participation list error")
        console.log(err)
        const msg: resFormat = { message: "get participation list fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get all participation of 1 team in 1 year
 */
export const getParticipationsByTeamHandler = async (req: Request, res: Response) => {
    try {
        const team = await Team.findById(req.params.id)
        if (!team) {
            const msg: resFormat = {
                message: "there is no participation of such team in that year",
            }
            return res.status(404).json(msg)
        }
        const participationList = await Participation.aggregate([
            {
                $match: {
                    team_id: new Types.ObjectId(req.params.id),
                    year: Number(req.params.year)
                }
            },
            {
                $group: {
                    _id: '$gp_id',
                    sumPoints: { $sum: '$real_pts' },
                    driver_id: {
                        $push: '$driver_id'
                    },
                    participation: { $push: '$$ROOT' }
                }
            },
            {
                $lookup: {
                    from: config.db.grandprixColl,
                    localField: '_id',
                    foreignField: '_id',
                    as: 'grandprix'
                }
            },
            {
                $lookup: {
                    from: config.db.driversColl,
                    localField: 'driver_id',
                    foreignField: '_id',
                    as: 'driver'
                }
            },
            {
                $sort: {
                    'grandprix.date': 1,
                },
            }
        ])
        const driverPts = await Participation.aggregate([
            {
                $match: {
                    team_id: new Types.ObjectId(req.params.id),
                    year: Number(req.params.year)
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
                $sort: {
                    'sumPoints': 1,
                },
            }
        ])


        if (participationList.length == 0) {
            const msg: resFormat = {
                message: "there is no participation of such team in that year",
            }
            return res.status(404).json(msg)
        }

        let participationOutput = []
        let accumPts = 0.0
        const formatOptions = { day: '2-digit', month: 'short', year: 'numeric' };

        for (let i = 0; i < participationList.length; i++) {

            const formattedDate = participationList[i].grandprix[0].date.
                toLocaleDateString('en-US', formatOptions).replace(',', '');
            accumPts += participationList[i].sumPoints
            let driverInfos: driverContri[] = []
            for (let j = 0; j < participationList[i].participation.length; j++) {
                driverInfos.push({
                    fullname: `${participationList[i].driver[j].firstname} ${participationList[i].driver[j].lastname}`,
                    pos: participationList[i].participation[j].pos,
                    points: participationList[i].participation[j].points
                })
            }

            participationOutput.push({
                grandprix: participationList[i].grandprix[0].place,
                date: formattedDate,
                sumPts: participationList[i].sumPoints,
                accumPts: accumPts,
                driverInfos: driverInfos
            })
        }
        
        let driverPtsOutput = []
        for (let i = 0; i < driverPts.length; i++) {
            driverPtsOutput.push({
                ...driverPts[i],
                percentage: ((driverPts[i].sumPoints / accumPts) * 100).toFixed(2)
            })
        } 

        const msg: resGetAllOfOneTeam = {
            message: "successfully get all participation of 1 team in 1 year",
            target: team,
            list: participationOutput,
            driverPts: driverPtsOutput
        }

        return res.status(200).json(msg)

    }
    catch (err) {
        console.log("get participation list error")
        console.log(err)
        const msg: resFormat = { message: "get participation list fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get one specific participation by the id
 */

export const getOneParticipationHandler = async (req: Request, res: Response) => {
    try {
        const participation = await Participation.findById(req.params.id)
        if (!participation) {
            return res.status(404).json({ message: "participation not found" })
        }
        const msg: resGetOne = { message: "successfully get participation", target: participation }
        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get participation list error")
        console.log(err)
        const msg: resFormat = { message: "get participation fail" }
        return res.status(500).json(msg)
    }
}