import { Driver } from "../models/driver";
import { Request, Response } from "express";
import { resFormat, resGetALL, resGetOne } from "../utils/types";


/**
 * get all drivers
 */
export const getDriversHandler = async (req: Request, res: Response) => {
    try {
        const driverList = await Driver.find({})
        const msg: resGetALL = {
            message: "successfully get all drivers",
            list: driverList
        }
        
        return res.status(200).json(msg)
    }
    catch(err) {
        console.log("get drivers list error")
        console.log(err)
        const msg : resFormat = {message: "get drivers list fail"}
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
        const msg : resGetOne = { message: "successfully get driver", target: driver}
        return res.status(200).json(msg)    
    } 
    catch (err) {
        console.log("get driver list error")
        console.log(err)
        const msg : resFormat = {message: "get driver fail"}
        return res.status(500).json(msg)
    }
}