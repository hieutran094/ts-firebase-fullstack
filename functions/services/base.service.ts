import { firestore } from 'firebase-admin'
import { Request } from 'express'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import ResponseError from '../utils/responseError'
import { IPaginationResponse } from '../interfaces/pagination'

export default class BaseService<T> {
    constructor(
        protected db: firestore.Firestore,
        protected tableName: string
    ) {}

    async getOne(id: string): Promise<T> {
        const data = await this.db
            .collection(this.tableName)
            .where('id', '==', id)
            .where('deleteFlag', '==', false)
            .get()

        if (data.empty) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found with id: ${id}`
            })
        }
        return data.docs[0].data() as T
    }

    async getMany(): Promise<T[]> {
        const data = await this.db
            .collection(this.tableName)
            .where('deleteFlag', '==', false)
            .get()
        if (data.empty) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found`
            })
        }
        const allEntries: T[] = []
        data.forEach((doc: any) => allEntries.push(doc.data()))
        return allEntries
    }

    async search(req: Request): Promise<IPaginationResponse<T>> {
        let { page, limit } = req.query as unknown as {
            page: number
            limit: number
        }
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        const promises = []
        promises.push(
            this.db
                .collection(this.tableName)
                .where('deleteFlag', '==', false)
                .limit(Number(limit))
                .offset((Number(page) - 1) * Number(limit))
                .get()
        )
        promises.push(this.db.collection(this.tableName).count().get())
        const [data, count] = await Promise.all(promises)
        const allEntries: T[] = []
        if (!data.empty) {
            data.forEach((doc: any) => allEntries.push(doc.data()))
        }
        return this.toPaginateResponse<T>(
            [allEntries, count.data().count],
            page,
            limit
        )
    }

    async createOne(dto: T | any): Promise<T> {
        const now = moment().utc().toISOString()
        const entry: T = {
            ...dto,
            id: await this.generateId(),
            createdAt: now,
            updatedAt: now,
            deleteFlag: false
        }
        await this.db.collection(this.tableName).add(entry)
        return entry
    }

    async updateOne(id: string, dto: T | any): Promise<T> {
        try {
            const now = moment().utc().toISOString()
            const data = await this.db
                .collection(this.tableName)
                .where('id', '==', id)
                .where('deleteFlag', '==', false)
                .get()
            if (data.empty) {
                throw new ResponseError({
                    statusCode: 404,
                    message: `An item could not be found with id: ${id}`
                })
            }
            await this.db
                .collection(this.tableName)
                .doc(data.docs[0].id)
                .set({ ...dto, updatedAt: now }, { merge: true })
            return dto as T
        } catch (err) {
            throw err
        }
    }

    async softDeleteOne(id: string): Promise<void> {
        try {
            const now = moment().utc().toISOString()
            const data = await this.db
                .collection(this.tableName)
                .where('id', '==', id)
                .where('deleteFlag', '==', false)
                .get()
            if (data.empty) {
                throw new ResponseError({
                    statusCode: 404,
                    message: `An item could not be found with id: ${id}`
                })
            }
            await this.db
                .collection(this.tableName)
                .doc(data.docs[0].id)
                .set({ deleteFlag: true, updatedAt: now }, { merge: true })
        } catch (err) {
            throw err
        }
    }

    async deleteOne(id: string): Promise<void> {
        const data = await this.db
            .collection(this.tableName)
            .where('id', '==', id)
            .where('deleteFlag', '==', false)
            .get()
        if (data.empty) {
            throw new ResponseError({
                statusCode: 404,
                message: `An item could not be found with id: ${id}`
            })
        }
        await this.db.collection(this.tableName).doc(data.docs[0].id).delete()
    }

    protected generateId(): string {
        return uuidv4()
    }
    protected toPaginateResponse<D = T>(
        result: [Array<D>, number],
        page: number,
        limit: number
    ): IPaginationResponse<D> {
        const [data, total] = result
        const lastPage = Math.ceil(total / limit)
        const nextPage = page + 1 > lastPage ? null : page + 1
        const prevPage = page - 1 < 1 ? null : page - 1
        return {
            limit,
            page,
            total,
            prevPage,
            nextPage,
            lastPage,
            data
        }
    }
}
