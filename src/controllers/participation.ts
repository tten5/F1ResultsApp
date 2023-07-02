import { Participation } from "../models/participation";
import { Driver } from "../models/driver";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetAllOfOne, resGetOne } from "../utils/types";
import { config } from "../config";
import { Types } from "mongoose"

/**
 * get all participation of 1 grandprix
 */
export const getParticipationsByGPHandler = async (req: Request, res: Response) => {
    try {
        const participationList = await Participation.find({gp_id: req.params.id})
        if (participationList.length == 0) {
            const msg: resFormat = {
                message: "there is no participation of such grand prix",
            }
            return res.status(404).json(msg)
        }
            
        const msg: resGetALL = {
            message: "successfully get all participation of 1 grand prix",
            list: participationList
        }
        
        return res.status(200).json(msg)
    }
    catch(err) {
        console.log("get participation list error")
        console.log(err)
        const msg : resFormat = {message: "get participation list fail"}
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
                message: "there is no participation of such driver in that year",
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
                                    toLocaleDateString('en-US', formatOptions).replace(',', '');;
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
    catch(err) {
        console.log("get participation list error")
        console.log(err)
        const msg : resFormat = {message: "get participation list fail"}
        return res.status(500).json(msg)
    }
}

/**
 * get all participation of 1 team in 1 year
 */
export const getParticipationsByTeamHandler = async (req: Request, res: Response) => {
    try {
        const participationList = await Participation.find({team_id: req.params.id, year: req.params.year})
        if (participationList.length == 0) {
            const msg: resFormat = {
                message: "there is no participation of such team in that year",
            }
            return res.status(404).json(msg)
        }
        
        const msg: resGetALL = {
            message: "successfully get all participation of 1 team in 1 year",
            list: participationList
        }
        
        return res.status(200).json(msg)
    }
    catch(err) {
        console.log("get participation list error")
        console.log(err)
        const msg : resFormat = {message: "get participation list fail"}
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
        const msg : resGetOne = { message: "successfully get participation", target: participation}
        return res.status(200).json(msg)    
    } 
    catch (err) {
        console.log("get participation list error")
        console.log(err)
        const msg : resFormat = {message: "get participation fail"}
        return res.status(500).json(msg)
    }
}