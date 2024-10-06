import { Request } from "express"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { PostProductBody } from "../controllers/products.controller.js"
import sql from "../database/index.js"



interface ProductsModel {
    addProduct: (req: Request<any, any, PostProductBody>) => Promise<ResultSetHeader>,
    // getProduct: () => Promise<RowDataPacket>

}

const productsModel: ProductsModel = {
    addProduct: async (req) => {
        const { cooking_time, fk_category, fk_energy, name, subProducts, supplies } = req.body || {}
        let sucess: ("product" | "subProducts" | "supples")[] = []
        try {
            await sql.query<ResultSetHeader>(`INSERT INTO products (name,cooking_time,fk_category,fk_energy) VALUES ()`, [name, cooking_time, fk_category, fk_energy])
            await sql.query<ResultSetHeader>(``)
        } catch (error) {

        }


        return result

    }
}

export default productsModel