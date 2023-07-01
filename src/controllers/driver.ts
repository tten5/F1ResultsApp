import { Driver } from "../models/driver";
import { Participation } from "../models/participation";
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

/**
 * get all driver in 1 year
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

        const driverList = await Driver.find({ _id: { $in: driverIdList }})        
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
    catch(err) {
        console.log("get driver list in 1 year error")
        console.log(err)
        const msg : resFormat = {message: "get drivers in 1 year fail"}
        return res.status(500).json(msg)
    }
}