import { Router } from "express";

import {
    createEvent,
    getAllEvents,
    getDataOfEvent,
    getAllEventsUser,
    updateEvent,
    updateStateEvent,
    rejectEvent
} from "../controllers/event.controllers.js";

const router = Router();
//Rutas post
router.post("/createEvent", createEvent);

//Rutas get
router.get("/getAllEvent", getAllEvents);
router.get("/event/:id", getDataOfEvent);
router.get("/eventUser/:idUser", getAllEventsUser);

//Rutas de put
router.put("/event/:id", updateEvent);
router.put("/eventNewState/:id", updateStateEvent);
router.put("/rejectEvent/:id", rejectEvent);

export default router;

