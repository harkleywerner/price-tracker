import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/ErrorHandler.utils.js"
import productsModel from "../models/products.model.js"

type ControllerFunction<Body = any> = (req: Request<any, any, Body>, res: Response, next: NextFunction) => void

interface PostProductBody {
    name: string
    cooking_time: number
    fk_category: number
    fk_energy: number
    supplies: [{
        quantity: number,
        fk_supply: number,
        fk_product: number
    }]
    subProducts: [{
        quantity: number,
        fk_product: number
    }]

}

interface ProductsController {
    post: ControllerFunction<PostProductBody>
    get: ControllerFunction
}

const productsController: ProductsController = {

    post: async (req, res, next) => {
        try {
            await productsModel.addProduct(req)
            res.json({
                code: 200,
                message: "El producto se agrego exitosamente!"
            })
        } catch (error) {
            if (error instanceof ErrorHandler) {
                res.status(error.code).json(error.handler())
            }
            else {
                next()
            }
        }

    },

    get: async (req, res, next) => {
        try {

        } catch (error) {
            if (error instanceof ErrorHandler) {
                res.status(error.code).json(error.handler())
            }
            else {
                next()
            }
        }
    }



}

export type { PostProductBody }
export default productsController