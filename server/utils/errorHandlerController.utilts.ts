import { NextFunction, Request, Response } from "express"
import ErrorHandler from "./ErrorHandler.utils.js"

/**
 * Nos ayuda a centralizar el manejo de los errores personalizados y capturar errores de los controladores que no se puedan manejar.
 */

type MethodController = (req: Request, res: Response, next: NextFunction) => any

const errorHandlerController = <T extends { [K in keyof T]: MethodController }>(controller: T) => {

    let proccesController = {} as { [K in keyof T]: MethodController }

    for (const key in controller) {

        if (!(typeof controller[key] === "function")) {
            throw new Error(`Controller method ${key} is not a function`);
        }

        proccesController[key] = async (req, res, next) => {
            try {
                await controller[key](req, res, next)
            } catch (error) {
                if (error instanceof ErrorHandler) {
                    res.status(error.code).json(error.handler())
                } else {
                    next()
                }
            }
        }
    }

    return proccesController
}

export default errorHandlerController