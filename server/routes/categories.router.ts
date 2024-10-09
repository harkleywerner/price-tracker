import { Router } from "express"
import controller from "../controllers/categories.controller.js"
const categories = Router()

categories.get("/",controller.get)
categories.post("/",controller.post)


export default categories