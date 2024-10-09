import { Router } from "express";
import suppliesController from "../controllers/supplies.controller.js";

const supplies = Router()

supplies.get("/", suppliesController.get)
supplies.post("/", suppliesController.post)
supplies.post("/history", suppliesController.postHistory)

export default supplies