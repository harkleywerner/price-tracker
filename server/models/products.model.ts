import { ResultSetHeader, RowDataPacket } from "mysql2"
import ErrorHandler from "../utils/ErrorHandler.utils.js"
import TransactionManagement from "../database/TransactionManagement.database.js"

interface AddProduct {
    name: string
    cooking_time: number
    fk_category: number
    fk_energy: number
}
type AddSubProduct = Array<{
    quantity: number,
    fk_subproduct: number
}>

type AddProductSupplies = Array<{
    quantity: number,
    fk_supply: number,
}>

class ProductsModel extends TransactionManagement {
    constructor() {
        super()
    }
    async addSubProduct(subProducts: AddSubProduct, productID: number) {
        try {
            for (const e of subProducts) {
                const { fk_subproduct, quantity } = e
                const parameters = [productID, fk_subproduct, quantity]
                const connection = await this.connection
                await connection.query<ResultSetHeader>(
                    `INSERT INTO subproducts (fk_product,fk_subproduct,quantity) VALUES (?,?,?)`
                    , parameters)
            }
        } catch (error) {
            throw new ErrorHandler({ code: 400, message: "Error al agregar algun sub-producto." })
        }
    }

    async addProductSupplies(productSupplies: AddProductSupplies, productID: number) {

        try {
            for (const e of productSupplies) {
                const { fk_supply, quantity } = e
                const parameters = [productID, fk_supply, quantity]
                const connection = await this.connection
                await connection.query<ResultSetHeader>(
                    `INSERT INTO productsupplies (fk_product, fk_supply, quantity) VALUES (?, ?, ?)`,
                    parameters)
            }
        } catch (error) {
            throw new ErrorHandler({ code: 400, message: "Error al agregar algun suplemento." })
        }
    }

    async addProduct(product: AddProduct) {
        const { cooking_time, fk_category, fk_energy, name } = product
        try {
            const parameters = [name, cooking_time, fk_category, fk_energy]
            const connection = await this.connection
            const [result] = await connection.query<ResultSetHeader>(`INSERT INTO products (name,cooking_time,fk_category,fk_energy) VALUES (?,?,?,?)`, parameters)
            return result
        } catch (error) {
            throw new ErrorHandler({ code: 400, message: "No se pudo agregar el producto." })
        }
    }

    async getProduct() {
        try {
            const connection = await this.connection
            const [result] = await connection.query<RowDataPacket[]>(`SELECT * FROM products`)
            return result
        } catch (error) {
            throw new ErrorHandler({ code: 400, message: "No se pudieron obtener los productos." })
        }
    }
}
export type {
   AddProduct,
   AddProductSupplies,
   AddSubProduct

}
export default ProductsModel
