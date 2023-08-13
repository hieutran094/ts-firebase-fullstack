import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import { UserModel } from "../models/index";
import { UserService } from "../services";
import { createOneSchema, updateOneSchema } from "./dto/user.dto";
import Controller from "../decorators/controller.decorator";
import { Get } from "../decorators/handlers.decorator";
import UseGuards from "../decorators/guard.decorator";
import { ServerGuard } from "../guards";

@Controller("/api/v1/user")
@UseGuards(ServerGuard)
export default class UserController extends BaseController<UserModel> {
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
