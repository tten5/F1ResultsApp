import { Team } from "../models/team";
import { Participation } from "../models/participation";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetOne } from "../utils/types";


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
 * get all team in 1 year
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

        const teamList = await Team.find({ _id: { $in: teamIdList }})        
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