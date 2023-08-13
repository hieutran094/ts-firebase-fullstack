import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import { UserModel } from "../models/index";
import { UserService } from "../services";
import { createOneSchema, updateOneSchema } from "./dto/user.dto";
import Controller from "../decorators/controller.decorator";
import { Get } from "../decorators/handlers.decorator";

@Controller("/api/v1/user")
export default class QuestionController extends BaseController<UserModel> {
  constructor(
    @inject(UserService)
    public service: UserService
  ) {
    super(service, {
      createSchema: createOneSchema,
      updateSchema: updateOneSchema,
    });
  }
  @Get("/")
  getManys() {
    return { message: "Hello" };
  }
}
