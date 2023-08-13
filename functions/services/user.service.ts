import { firestore } from "firebase-admin";
import { inject, injectable } from "tsyringe";
import BaseService from "./base.service";
import { UserModel } from "../models/index";
import { ETableName } from "../enums/table.enum";

@injectable()
export default class UserService extends BaseService<UserModel> {
  constructor(@inject("database") public db: firestore.Firestore) {
    super(db, ETableName.USER);
  }
}
