import { Router } from "express";

import {
    createEvent,
    getAllEvents,
    getDataOfEvent,
    updateEvent,
    updateStateEvent,
    rejectEvent,
    getAllEventsUser
} from "../controllers/event.controllers.js";

const router = Router();

router.post("/createEvent", createEvent);
router.get("/getAllEvent", getAllEvents);
router.get("/getAllEventsUser/:correo", getAllEventsUser);
router.get("/event/:id", getDataOfEvent);
router.put("/event/:id", updateEvent);
router.put("/eventNewState/:id", updateStateEvent);
router.put("/rejectEvent/:id", rejectEvent);

export default router;

