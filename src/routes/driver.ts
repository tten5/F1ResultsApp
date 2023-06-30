import { Router } from "express"
import { getDriversHandler, getOneDriverHandler } from "../controllers/driver"

const router = Router()

// CRUD 
router.get("/", getDriversHandler)
router.get("/:id", getOneDriverHandler)

export default router
