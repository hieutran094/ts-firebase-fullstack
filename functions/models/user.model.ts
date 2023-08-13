import BaseModel from "./base.model";

export default interface UserModel extends BaseModel {
  name: string;
  email: string;
}
