export interface ResponseErrorArgs {
    statusCode?: number
    message?: string
    errors?: unknown
}

export const defaultResponseErrorArgs: ResponseErrorArgs = {
    statusCode: 500,
    message: 'Internal server error'
}

export default class ResponseError extends Error {
    statusCode: number
    message: string
    errors: unknown

    constructor(args: ResponseErrorArgs = defaultResponseErrorArgs) {
        super(args.message ?? defaultResponseErrorArgs.message)
        this.statusCode =
            args.statusCode ?? (defaultResponseErrorArgs.statusCode as number)
        this.message =
            args.message ?? (defaultResponseErrorArgs.message as string)
        if (args.errors) {
            this.errors = args.errors
        }
    }
}
