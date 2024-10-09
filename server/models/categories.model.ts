import { RowDataPacket,ResultSetHeader } from "mysql2"
import sql from "../database/index.js"
import ErrorHandler from "../utils/ErrorHandler.utils.js"

class CategoriesModule{
    constructor(){
    }

    async getCategories(){
        try {
            const [result] = await sql.query<RowDataPacket[]>(`SELECT * FROM categories`)
            return result
        } catch (error) {
            throw new ErrorHandler({code : 400,message : "No se pudieron obtener las categorias."})
        }
    }
    
    async addCategory(name:string){
        try {
            await sql.query<ResultSetHeader>(`INSERT INTO categories (name) VALUES (?)`,[name])
        } catch (error) {
            throw new ErrorHandler({code : 400,message : "No se pude agregar la categoria."})
        }
    }
}

export default CategoriesModule
