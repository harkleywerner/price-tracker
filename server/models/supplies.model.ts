import { ResultSetHeader, RowDataPacket } from "mysql2/promise.js"
import ErrorHandler from "../utils/ErrorHandler.utils.js"
import TransactionManagement from "../database/TransactionManagement.database.js"

interface AddSupplies {
    name: string
    price: number
}

interface AddSuppliesPriceHistory {
    fk_supply: number,
    price: number
}

interface UpdateSupplyPrice {
    id: number,
    price: number
}
class SuppliesModel extends TransactionManagement {
    constructor() {
        super()
    }

    async addSupplies(supply: AddSupplies) {
        const { name, price } = supply
        try {
            const connection = await this.connection
            const [result] = await connection.query<ResultSetHeader>(`INSERT INTO supplies (name,price) VALUES(?,?)`, [name, price])
            return result
        } catch (error: any) {
            throw new ErrorHandler({ code: 400, message: "No se pudo agregar ningun insumo." })
        }
    }
    async addSuppliesPriceHistory(supply: AddSuppliesPriceHistory) {
        try {
            const { fk_supply, price } = supply
            const connection = await this.connection
            const [result] = await connection.query<ResultSetHeader>(`INSERT INTO suppliespricehistory (price,fk_supply) VALUES (?,?)`, [price, fk_supply])
            return result
        } catch (error) {
            throw new ErrorHandler({ code: 400, message: "No se pudo agregar al historial el precio del insumo, por favor vuelve a reintentarlo." })
        }
    }
    async getSupplies() {
        try {
            const connection = await this.connection
            const [result] = await connection.query<RowDataPacket[]>("SELECT * FROM supplies")
            return result
        } catch (error) {
            throw new ErrorHandler({ code: 400, message: "No se pudo obtener los insumos." })
        }
    }
    async updateSupplyPrice(supply: UpdateSupplyPrice) {
        try {
            const { id, price } = supply
            const connection = await this.connection
            const [result] = await connection.query<ResultSetHeader>(`
                UPDATE supplies SET price = ? WHERE id = ? AND EXISTS (
                 SELECT 1 FROM suppliespricehistory WHERE  price = ? and fk_supply = ? 
                 )
                `, [price, id, price, id])//Solo se cambia el precio si el mismo se encuentra en el historial de precios.
            return result
        } catch (error) {
            throw new ErrorHandler({ code: 400, message: "No se pudo actualizar el precio del insumo." })
        }
    }

}

export type {
    AddSupplies,
    AddSuppliesPriceHistory,
    UpdateSupplyPrice
}
export default SuppliesModel