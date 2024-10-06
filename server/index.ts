import express from "express"
import products from "./routes/products.router.js"
import supplies from "./routes/supplies.router.js"
import errorGlobal from "./middlewares/errorGlobal.midleware.js"

const app = express()
app.use(express.json())
const port = 3000

app.get("/", (req, res) => {
    res.send("hola")
})

app.use("/supplies",supplies)
app.use("/products",products)

app.use(errorGlobal)

app.listen(port,()=> {
console.log(`${port} ON`)
})