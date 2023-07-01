import { Router } from "express"
import {
    getDriversHandler,
    getOneDriverHandler,
    getDriversByYearHandler
} from "../controllers/driver"

const router = Router()

// CRUD 
router.get("/", getDriversHandler)
router.get("/year/:year", getDriversByYearHandler)
router.get("/:id", getOneDriverHandler)

export default router
