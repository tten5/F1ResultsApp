import { Router } from "express"
import {
    getAllGPHandler,
    getOneGPHandler,
    getGPByYearHandler
} from '../controllers/grandprix'

const router = Router()

// CRUD 
router.get("/", getAllGPHandler)
router.get("/year/:year", getGPByYearHandler)
router.get("/:id", getOneGPHandler)

export default router
