
interface ErrorHandlerProp {
    code: number
    message?: string
    name?: string
}

class ErrorHandler extends Error {
    message: string;
    name: string
    code: number
    constructor({ code, message, name }: ErrorHandlerProp) {
        super()
        this.code = code || 500
        this.message = message || super.message
        this.name = name || super.name
    }

    handler() {
        console.log(this.message)
        return {
            code: this.code,
            message: this.message,
            name: this.name
        }
    }
}

export default ErrorHandler