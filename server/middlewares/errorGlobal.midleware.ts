import { Request, Response } from "express";

 const errorGlobal = (_:Request,res:Response) => {
   
    res.status(500).json({
        code : 500,
        message : "Error desconocido"
    })
};


export default errorGlobal