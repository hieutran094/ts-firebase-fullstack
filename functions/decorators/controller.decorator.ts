import { injectable } from "tsyringe";
import { MetadataKeys } from "../utils/metadata.keys";

const Controller = (basePath: string): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    injectable()(target);
  };
};
export default Controller;
