type Energetic = "gas" | "electricidad"


/**
 * Medicion : se hace en base a decimales es decir 1KG = 1
 * CookingTime :
 * */

interface Materials {
    name: string,
    lastPurchase: {
        price: number
        quantity: number
    }
}

interface Products {
    name: string
    materials: { name: string, quantity: number }[]
    energetic: Energetic
    cookingTime: number,
    subProducts?: Products[]
}

const ENERGETIC = new Map<Energetic, number>([["electricidad", 269]])
const pechuga: Materials = {
    lastPurchase: {
        price: 7000,
        quantity: 1.000
    },
    name: "pechuga"
}
const pan_rallado: Materials = {
    lastPurchase: {
        price: 2500,
        quantity: 1.000
    },
    name: "pan_rallado",
}

const MATERIALTEST: [string, Materials][] = [["pechuga", pechuga],["pan_rallado",pan_rallado]]
const MATERIALS = new Map<string, Materials>(MATERIALTEST)

const calculateEstimate = ({ materials, subProducts = [], cookingTime, energetic }: Products) => {
    const energeticCost = (ENERGETIC.get(energetic) ?? 1) * cookingTime

    let time: number = cookingTime;
    let cost: number = energeticCost;

    materials.forEach(({ name, quantity }) => {
        const getMaterial = MATERIALS.get(name)
        if (!getMaterial) return
        const { price: P, quantity: Q } = getMaterial.lastPurchase
        const priceForMeasurement = (P / Q) 
        const finalPrice = quantity * priceForMeasurement
        cost += finalPrice
    })

    subProducts.forEach((e) => {
        const { cost: C, time: T } = calculateEstimate(e)
        cost += C
        time += T
    })

    return {
        cost,
        time
    }

}

const res = calculateEstimate({
    cookingTime: 1,
    energetic: "electricidad",
    name: "milanesa",
    materials: [
        { name: "pechuga", quantity: 0.300 },
        { name: "pan_rallado", quantity: 0.100 }
    ],
})
