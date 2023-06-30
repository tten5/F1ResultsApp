import { Router } from "express"
import { getTeamsHandler, getOneTeamHandler } from "../controllers/team"

const router = Router()

// CRUD 
router.get("/", getTeamsHandler)
router.get("/:id", getOneTeamHandler)

export default router
