import { Participation } from "../models/participation";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetOne } from "../utils/types";


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
        const participationList = await Participation.find({driver_id: req.params.id, year: req.params.year})
        if (participationList.length == 0) {
            const msg: resFormat = {
                message: "there is no participation of such driver in that year",
            }
            return res.status(404).json(msg)
        }
        
        const msg: resGetALL = {
            message: "successfully get all participation of 1 driver in 1 year",
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