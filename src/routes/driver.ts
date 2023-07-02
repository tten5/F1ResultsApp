import { Router } from "express"
import {
    getDriversHandler,
    getOneDriverHandler,
    getDriversByYearHandler,
    getSumPtsAllDriversHandler
} from "../controllers/driver"

const router = Router()

// CRUD 
router.get("/", getDriversHandler)
router.get("/year/:year", getDriversByYearHandler)
router.get("/year/:year/points", getSumPtsAllDriversHandler)
router.get("/:id", getOneDriverHandler)

/**
 * 
 * 
 * POST to search for driver with user input /search , default is search by lastname
 * 
 * yearly ranknig: /:id/yearly-ranking/ 
 * 
 * all participation with specific pos /:id?pos="3"
 * 
 * 
 
 */

export default router
