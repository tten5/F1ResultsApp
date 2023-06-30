import { Team } from "../models/team";
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
 * get one specific team by the name
 */

export const getTeamByNameHandler = async (req: Request, res: Response) => {
    try {
        const t_name = req.body.teamName
        const team = await Team.findOne({ t_name : t_name})
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