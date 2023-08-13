import Controller from "../decorators/controller.decorator";
import { Get } from "../decorators/handlers.decorator";

@Controller("/api/v1/health")
export default class HealthcheckController {
  constructor() {}
  @Get("/")
  async getHealth() {
    return { message: "Server is running." };
  }
}
