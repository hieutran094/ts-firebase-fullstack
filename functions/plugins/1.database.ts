import "@abraham/reflection";
import { container } from "tsyringe";
import database from "../database/index";

export default defineNitroPlugin(() => {
  container.register("database", { useValue: database });
});
