import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/ErrorHandler.utils.js"
import ProductsModel, { AddProduct,AddProductSupplies,AddSubProduct } from "../models/products.model.js"
import errorHandlerController from "../utils/ErrorHandlerController.utilts.js"

type ControllerFunction<Body = any> = (req: Request<any, any, Body>, res: Response, next: NextFunction) => void

interface PostProductBody extends AddProduct {
    productSupplies: AddProductSupplies
    subProducts: AddSubProduct
}

interface ProductsController {
    post: ControllerFunction<PostProductBody>
    get: ControllerFunction
}

const productsController: ProductsController = {

    post: async (req, res, next) => {
        const model = new ProductsModel()
        try {
            await model.beginTransaction()
            const { subProducts, productSupplies, ...product } = req.body
            const { insertId: ProductID } = await model.addProduct(product)
            await model.addSubProduct(subProducts, ProductID)
            await model.addProductSupplies(productSupplies, ProductID)
            res.json({
                code: 200,
                message: "El producto se agrego exitosamente"
            })
            await model.commit()
        } catch (error) {
            await model.rollback()
            if (error instanceof ErrorHandler) {
                res.status(error.code).json(error.handler())
            }
            else {
                next()
            }
        }
    },

    get: async (req, res) => {
        const model = new ProductsModel()
        const result = await model.getProduct()
        return res.json({
            code: 200,
            data: result
        })
    },

}

export default errorHandlerController(productsController)