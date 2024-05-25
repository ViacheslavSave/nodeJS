import { NextFunction, Request, Response } from "express";
import { IControllerRoute } from "./route.interface";

export interface IMiddleware {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
