import { Request } from "express";
export default interface IUserRequest extends Request {
  user: any;
}
