import { Router } from "express";
import suppliesController from "../controllers/supplies.controller.js";

const router = Router()

router.get("/",suppliesController.get)
router.post("/",suppliesController.post)

export default router