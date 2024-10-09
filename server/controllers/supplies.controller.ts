import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler.utils.js";
import suppliesModel, { AddSupplies, AddSuppliesPriceHistory, UpdateSupplyPrice } from "../models/supplies.model.js";

interface SuppliesController {
    post: (req: Request<any, any, AddSupplies>, rest: Response, next: NextFunction) => void
    get: (req: Request, res: Response, next: NextFunction) => void
    postHistory: (req: Request<any, any, AddSuppliesPriceHistory>, res: Response, next: NextFunction) => void
    put: (req: Request<any, any, UpdateSupplyPrice>, res: Response, next: NextFunction) => void

}

const suppliesController: SuppliesController = {
    get: async (req, res, next) => {
        try {
            const model = new suppliesModel()
            const response = await model.getSupplies()
            res.status(200).json({
                code: 200,
                data: response
            })
        } catch (error) {
            if (error instanceof ErrorHandler) {
                error.handler()
            }
            next()
        }
    },
    postHistory: async (req, res, next) => {
        try {
            const model = new suppliesModel()
            await model.addSuppliesPriceHistory(req.body)
            res.status(201).json({ code: 201, message: "Precio guardado en el historial correctamente." })
        } catch (error) {
            if (error instanceof ErrorHandler) {
                res.status(error.code).json(error.handler())
            } else {
                next()
            }
        }
    },
    put: async (req, res, next) => {
        try {
            const model = new suppliesModel()
            await model.updateSupplyPrice(req.body)
            res.status(201).json({ code: 201, message: "Precio actualizado correctamente." })
        } catch (error) {
            if (error instanceof ErrorHandler) {
                res.status(error.code).json(error.handler())
            } else {
                next()
            }
        }
    },
    post: async (req, res, next) => {
        const model = new suppliesModel()
        try {
            await model.beginTransaction()
            const result = await model.addSupplies(req.body)
            await model.addSuppliesPriceHistory({ fk_supply: result.insertId, price: req.body.price })
            await model.commit()
            res.status(201).json({ code: 201, message: "Insumo creado con exito." })
        } catch (error) {
            await model.rollback()
            if (error instanceof ErrorHandler) {
                res.status(error.code).json(error.handler())
            } else {
                next()
            }
        }
    }
}

export default suppliesController