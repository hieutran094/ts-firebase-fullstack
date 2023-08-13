const UseGuards = (...guards: Function[]): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(MetadataKeys.GUARD, guards, target);
  };
};
export default UseGuards;
