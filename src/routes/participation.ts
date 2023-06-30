import { Router } from "express"
import {
    getParticipationsByGPHandler,
    getParticipationsByDriverHandler,
    getParticipationsByTeamHandler,
    getOneParticipationHandler
} from "../controllers/participation"

const router = Router()

// CRUD 
router.get("/grandprix/:id", getParticipationsByGPHandler)
router.get("/driver/:id/:year", getParticipationsByDriverHandler)
router.get("/team/:id/:year", getParticipationsByTeamHandler)
router.get("/:id", getOneParticipationHandler)

export default router
