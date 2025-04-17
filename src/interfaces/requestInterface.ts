import { Request } from "express";
import { UserInterface } from ".";

export interface CustomRequestInterface extends Request {
  user: UserInterface
}