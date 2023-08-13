import type { Request } from 'express'
import { AnyZodObject, Schema, z, ZodError } from 'zod'
import ResponseError from '../utils/responseError'

export async function validator<T extends AnyZodObject>(
    schema: Schema,
    req: Request
): Promise<z.infer<T>> {
    try {
        return await schema.parseAsync(req)
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ResponseError({
                statusCode: 400,
                message: 'Validation error',
                errors: error.errors
            })
        } else {
            throw new ResponseError({
                statusCode: 500,
                message: error.message
            })
        }
    }
}
