import { Router } from "express"
import {getAllGPHandler, getOneGPHandler} from '../controllers/grandprix'

const router = Router()

// CRUD 
router.get("/", getAllGPHandler) 
router.get("/:id", getOneGPHandler) 
    
export default router
