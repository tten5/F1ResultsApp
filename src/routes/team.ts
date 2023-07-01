import { Router } from "express"
import {
    getTeamsHandler,
    getOneTeamHandler,
    getTeamsByYearHandler
} from "../controllers/team"

const router = Router()

// CRUD 
router.get("/", getTeamsHandler)
router.get("/year/:year", getTeamsByYearHandler)
router.get("/:id", getOneTeamHandler)

export default router
