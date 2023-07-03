import { Router } from "express"
import {
    getAllGPHandler,
    getOneGPHandler,
    getGPByYearHandler,
    getWinnersAllGPHandler,
    getAllGPPlacesHandler,
    getYearlyWinnersOfGPHandler
} from '../controllers/grandprix'

const router = Router()

// CRUD 
router.get("/", getAllGPHandler)
router.get("/year/:year", getGPByYearHandler)
router.get("/year/:year/winners", getWinnersAllGPHandler)
router.get("/places", getAllGPPlacesHandler)
router.get("/place/:place/yearly-winners", getYearlyWinnersOfGPHandler)
router.get("/:id", getOneGPHandler)



/*
search by place: get /places/ -> return all places 

yearly winner of gp from 1 place: /:id/yearly-winners&top3=true

*/
export default router
