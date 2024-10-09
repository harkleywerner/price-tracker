import { PoolConnection } from "mysql2/promise"
import sql from "./index.js"
/**
 * Clase para la gestión de transacciones en bases de datos.
 *  clase centraliza la conexión para cada solicitud, permitiendo 
 * Esta
 * aplicar `rollback` y `commit` de manera sencilla y eficiente.
 * 
 * Es importante crear una nueva instancia de esta clase en cada 
 * operación para evitar colisiones entre transacciones.
 */



class TransactionManagement {
    connection: Promise<PoolConnection>
    constructor() {
        this.connection = sql.getConnection()
    }

    async rollback() {
        (await this.connection).rollback()
    }

    async commit() {
        (await this.connection).commit()
    }

    async beginTransaction() {
        (await this.connection).beginTransaction()
    }


}


export default TransactionManagement