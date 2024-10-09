import express from "express"
import productsController from "../controllers/products.controller.js"

const products = express.Router()

products.get("/", productsController.get)
products.post("/",productsController.post)

export default products