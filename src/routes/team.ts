import { Router } from "express"
import {
    getTeamsHandler,
    getOneTeamHandler,
    getTeamsByYearHandler,
    getSumPtsAllTeamsHandler,
    getYearlyRankingOfTeamHandler,
    getYearlyBestDriverHandler
} from "../controllers/team"

const router = Router()

// CRUD 
router.get("/", getTeamsHandler)
router.get("/year/:year", getTeamsByYearHandler)
router.get("/year/:year/points", getSumPtsAllTeamsHandler)
router.get("/:id", getOneTeamHandler)
router.get("/:id/yearly-ranking", getYearlyRankingOfTeamHandler)
router.get("/:id/yearly-best-driver", getYearlyBestDriverHandler)

/**
 * by year and driver and all -> get /year/:year/points
 * 
 * 
 * 
 * 
 * 
 
 */

export default router
