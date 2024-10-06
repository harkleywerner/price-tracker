import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler.utils.js";
import suppliesModel from "../models/supplies.model.js";

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => void

interface SuppliesController {
    post: ControllerFunction
    get: ControllerFunction
}

const suppliesController: SuppliesController = {
    get: async (req, res, next) => {
        try {

            const response = await suppliesModel.getSupplies()
            res.status(200).json({
                code: 200,
                supplies: response
            })
        } catch (error) {
            if (error instanceof ErrorHandler) {
                error.handler()
            }
            next()
        }
    },
    post: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await suppliesModel.addSupplies(req)
            res.status(201).json({ code: 201, message: "Insumo creado con exito!" })
        } catch (error) {
            if (error instanceof ErrorHandler) {
                res.status(error.code).json(error.handler())
            } else {
                next()
            }
        }
    }
}

export default suppliesController