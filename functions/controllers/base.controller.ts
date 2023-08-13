import { H3Event } from "h3";
import { AnyZodObject } from "zod";
import { BaseService } from "../services";
import { IPaginationResponse } from "../interfaces/pagination";
import { validator } from "../utils/validator";
import { Get } from "../decorators/handlers.decorator";

export default class BaseController<T> {
  constructor(
    protected service: BaseService<T>,
    protected schemas?: {
      createSchema?: AnyZodObject;
      updateSchema?: AnyZodObject;
    }
  ) {}

  @Get("/:id")
  async getOne(event: H3Event) {
    const id = event.context.params.id;
    const data = await this.service.getOne(id);
    return this.toJsonResponse(200, data);
  }
  @Get("/")
  async getMany(event: H3Event) {
    const data = await this.service.getMany();
    return this.toJsonResponse(200, data);
  }
  /*
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.search(req);
      this.toJsonResponse(res, 200, data);
    } catch (err) {
      next(err);
    }
  }

  async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      let { body } = req;
      if (this.schemas && this.schemas.createSchema) {
        const validData = await validator(this.schemas.createSchema, req);
        body = validData.body;
      }
      const data = await this.service.createOne(body);
      this.toJsonResponse(res, 201, data, "Create successfully");
    } catch (err) {
      next(err);
    }
  }
  async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      let { body } = req;
      if (this.schemas && this.schemas.createSchema) {
        const validData = await validator(this.schemas.updateSchema, req);
        body = validData.body;
      }
      if (body.deleteFlag !== undefined) {
        body.deleteFlag = JSON.parse(body.deleteFlag);
      }

      const data = await this.service.updateOne(id, body);
      this.toJsonResponse(res, 200, data, "Update successfully");
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.service.deleteOne(id);
      this.toJsonResponse(res, 200, null, "Permanently delete successfully");
    } catch (err) {
      next(err);
    }
  }

  async softDeleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.service.softDeleteOne(id);
      this.toJsonResponse(res, 200, null, "Delete successfully");
    } catch (err) {
      next(err);
    }
  }
*/
  protected toJsonResponse(
    code: number,
    data: T | T[] | null | IPaginationResponse<T>,
    message: string = ""
  ) {
    return { code, success: true, data, message };
  }
}
