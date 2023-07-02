import { Router } from "express"
import {
    getTeamsHandler,
    getOneTeamHandler,
    getTeamsByYearHandler,
    getSumPtsAllTeamsHandler
} from "../controllers/team"

const router = Router()

// CRUD 
router.get("/", getTeamsHandler)
router.get("/year/:year", getTeamsByYearHandler)
router.get("/year/:year/points", getSumPtsAllTeamsHandler)
router.get("/:id", getOneTeamHandler)

/**
 * by year and driver and all -> get /year/:year/points
 * 
 * POST to search for driver with user input /search , 
 * 
 * yearly ranknig: /:id/yearly-ranking/ 
 * team's best driver over year /:id/yearly-best-driver
 * 
 * 
 * 
 * 
 
 */

export default router
