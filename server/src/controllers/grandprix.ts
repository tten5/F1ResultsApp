import { GrandPrix, IGrandPrix } from "../models/grandprix";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetOne, resGetALLOfOneGPPlace } from "../utils/types";
import { Participation } from "../models/participation";
import { config } from "../config";
import { Types } from "mongoose";
import { capitalizeWords } from "../utils";

/**
 * get all grandprix and return grandprix list in place order
 */
export const getAllGPHandler = async (req: Request, res: Response) => {
    try {
        const grandprixList = await GrandPrix.find({}).sort({ place: 1 })
        const msg: resGetALL = {
            message: "successfully get all grandprix",
            list: grandprixList
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get grandprix list error")
        console.log(err)
        const msg: resFormat = { message: "get grandprix list fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get one specific grandprix by its id
 */

export const getOneGPHandler = async (req: Request, res: Response) => {
    try {
        const grandprix = await GrandPrix.findById(req.params.id)
        if (!grandprix) {
            return res.status(404).json({ message: "grandprix not found" })
        }
        const msg: resGetOne = { message: "successfully get grandprix", target: grandprix }
        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get grandprix list error")
        console.log(err)
        const msg: resFormat = { message: "get grandprix fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get all grandprix in 1 year and return by sort query
 */
export const getGPByYearHandler = async (req: Request, res: Response) => {
    try {
        const year = Number(req.params.year)
        let grandprixList: IGrandPrix[]
        if (req.query.sort === 'place') {
            grandprixList = await GrandPrix.find({ year: year }).sort({ place: 1 })
        } else {
            // default is sort by date
            grandprixList = await GrandPrix.find({ year: year })
        }
        if (grandprixList.length == 0) {
            const msg: resFormat = {
                message: "there is no grandprix in that year",
            }
            return res.status(404).json(msg)
        }

        const msg: resGetALL = {
            message: "successfully get all grandprix in 1 year",
            list: grandprixList
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get grandprix list in 1 year error")
        console.log(err)
        const msg: resFormat = { message: "get grandprix in 1 year fail" }
        return res.status(500).json(msg)
    }
}


/**
 * get all winners (and top 3) of all grandprix in 1 year 
 */
export const getWinnersAllGPHandler = async (req: Request, res: Response) => {
    try {
        const targetPos = (req.query.top3 == 'true') ? { $in: ["1", "2", "3"] } : "1"

        const year = Number(req.params.year)
        const winners = await Participation.aggregate([
            {
                $match: {
                    pos: targetPos,
                    year: year
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
            {
                $sort: {
                    'grandprix.date': 1,
                },
            }
        ])
        // for format date
        const options = { day: '2-digit', month: 'short', year: 'numeric' };

        let winnersOutput = []
        for (let i = 0; i < winners.length; i++) {
            const winnerFirstname = winners[i].driver[0].firstname
            const winnerLastname = winners[i].driver[0].lastname
            const formattedDate = winners[i].grandprix[0].date.
                toLocaleDateString('en-US', options).replace(',', '');

            winnersOutput.push({
                gp_id: winners[i].grandprix[0]._id,
                grandprix: winners[i].grandprix[0].place,
                date: formattedDate,
                pos: winners[i].pos,
                winner: `${winnerFirstname} ${winnerLastname}`,
                team: winners[i].team[0].t_name,
                laps: winners[i].laps,
                time: winners[i].time
            })

        }

        const msg: resGetALL = {
            message: "successfully get all grandprix's winners",
            list: winnersOutput
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get grandprix's winners list error")
        console.log(err)
        const msg: resFormat = { message: "get grandprix's winners list fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get all grandprix's place
 */
export const getAllGPPlacesHandler = async (req: Request, res: Response) => {
    try {
        const grandprixList = await GrandPrix.find({}).sort({ place: 1 }).distinct("place")
        const msg: resGetALL = {
            message: "successfully get all grandprix place",
            list: grandprixList
        }

        return res.status(200).json(msg)
    }
    catch (err) {
        console.log("get grandprix place list error")
        console.log(err)
        const msg: resFormat = { message: "get grandprix place list fail" }
        return res.status(500).json(msg)
    }
}

/**
 * get yearly ranking 1 driver  
 */
export const getYearlyWinnersOfGPHandler = async (req: Request, res: Response) => {
    try {
        const targetPlace = capitalizeWords(req.params.place)
        // take all year 
        const yearStart = config.db.yearStart
        const yearEnd = config.db.yearEnd
        const grandprixList = await GrandPrix.aggregate([
            {
                $match: {
                    place: targetPlace,
                    year: { $gte: yearStart, $lte: yearEnd }
                }
            }
        ])
        if (grandprixList.length === 0) {
            const msg: resFormat = {
                message: "grandprix place not found",
            }
            return res.status(404).json(msg)
        }
     

        let yearlyWinners = []

        for (let i = 0; i < grandprixList.length; i++) {
            const winners = await Participation.aggregate([
                {
                    $match: {
                        gp_id: new Types.ObjectId(grandprixList[i]._id),
                        pos: { $in: ["1", "2", "3"] },
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
            if (winners.length == 0) {
                const msg: resFormat = {
                    message: "no participation found",
                }
                return res.status(404).json(msg)
            }
            for (let j = 0; j < winners.length; j++) {
                yearlyWinners.push({
                    year: winners[0].year,
                    pos: winners[j].pos,
                    driver: `${winners[j].driver[0].firstname} ${winners[j].driver[0].lastname}`,
                    nationality: winners[j].driver[0].nationality,
                    team: winners[j].team[0].t_name,
                    time: winners[j].time                   
                })
            }
        }

        const msg: resGetALLOfOneGPPlace = {
            message: "successfully get grandprix yearly winners",
            target: targetPlace,
            list: yearlyWinners
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