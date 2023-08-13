import { container } from "tsyringe";
import { eventHandler } from "h3";
import { controllers } from "../controllers";
import { MetadataKeys } from "../utils/metadata.keys";

export default defineNitroPlugin((nitroApp) => {
  controllers.forEach((controllerClass: any) => {
    const controllerInstance: { [handleName: string]: any } =
      container.resolve(controllerClass);
    const basePath: string = Reflect.getMetadata(
      MetadataKeys.BASE_PATH,
      controllerClass
    );
    const routers: any[] = Reflect.getMetadata(
      MetadataKeys.ROUTERS,
      controllerClass
    );

    routers.forEach(({ method, path, handlerName }) => {
      nitroApp.router.use(
        basePath + path,
        eventHandler(
          controllerInstance[String(handlerName)].bind(controllerInstance)
        ),
        method
      );
    });
  });
});
