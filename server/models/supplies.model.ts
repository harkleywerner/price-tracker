import { Request } from "express"
import { ResultSetHeader, RowDataPacket } from "mysql2/promise.js"
import sql from "../database/index.js"
import ErrorHandler from "../utils/ErrorHandler.utils.js"

type AddSuppliesBody = { name: string, supply_price?: number }

interface SuppliesModel {
    addSupplies: (req: Request<any, any, AddSuppliesBody>) => Promise<ResultSetHeader>
    getSupplies: () => Promise<RowDataPacket[]>
}

const suppliesModel: SuppliesModel = {

    addSupplies: async (req) => {
        const { name, supply_price } = req.body || {}
        try {
            const [result] = await sql.query<ResultSetHeader>(`INSERT INTO supplies (name,supply_price) VALUES(?,?)`, [name, supply_price])
            return result
        } catch (error: any) {
            throw new ErrorHandler({ code: 400, message: "No se pudo agregar ningun insumo!" })
        }
    },

    getSupplies: async () => {
        const [result] = await sql.query<RowDataPacket[]>("SELECT * FROM supplies")
        return result
    }
}

export default suppliesModel