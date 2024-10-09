import { NextFunction, Request, Response } from "express"
import errorHandlerController from "../utils/ErrorHandlerController.utilts.js"
import CategoriesModule from "../models/categories.model.js"
interface CatergoriesController {
    get: (req: Request, res: Response) => void
    post: (req: Request<any, any, { name: string }>, res: Response, next: NextFunction) => void
}


const catergoriesController: CatergoriesController = {
    get: async (req, res) => {
        const module = new CategoriesModule()
        const result = await module.getCategories()
        res.json({
            code: 200,
            data: result
        })
    },
    post: async (req, res) => {
        const module = new CategoriesModule()
        await module.addCategory(req.body.name)
        res.json({
            code : 200,
            message : "La categoria se agrego correctamente."
        })
    }
}



export default errorHandlerController(catergoriesController)