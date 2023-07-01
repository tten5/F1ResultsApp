import { GrandPrix } from "../models/grandprix";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetOne } from "../utils/types";

/**
 * get all grandprix
 */
export const getAllGPHandler = async (req: Request, res: Response) => {
    try {
        const grandprixList = await GrandPrix.find({})
        const msg: resGetALL = {
            message: "successfully get all grandprix",
            list: grandprixList
        }
        
        return res.status(200).json(msg)
    }
    catch(err) {
        console.log("get grandprix list error")
        console.log(err)
        const msg : resFormat = {message: "get grandprix list fail"}
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
        const msg : resGetOne = { message: "successfully get grandprix", target: grandprix}
        return res.status(200).json(msg)    
    } 
    catch (err) {
        console.log("get grandprix list error")
        console.log(err)
        const msg : resFormat = {message: "get grandprix fail"}
        return res.status(500).json(msg)
    }
}

/**
 * get all grandprix in 1 year
 */
export const getGPByYearHandler = async (req: Request, res: Response) => {
    try {
        const grandprixList = await GrandPrix.find({year: req.params.year})
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
    catch(err) {
        console.log("get grandprix list in 1 year error")
        console.log(err)
        const msg : resFormat = {message: "get grandprix in 1 year fail"}
        return res.status(500).json(msg)
    }
}