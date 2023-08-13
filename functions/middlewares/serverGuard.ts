import { Request, Response, NextFunction } from 'express'
import ResponseError from '../utils/responseError'
export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['x-header-key']
        if (token !== process.env.APP_HEADER_KEY)
            throw new ResponseError({
                statusCode: 401,
                message: `Invalid token`
            })
        return next()
    } catch (e) {
        return next(e)
    }
}
