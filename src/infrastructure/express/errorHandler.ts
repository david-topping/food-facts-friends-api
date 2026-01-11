import { Request, Response, NextFunction } from "express";
import { mapErrorToResponse } from "./mapErrorToResponse";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { status, body, log } = mapErrorToResponse(err);

  if (log) {
    console.error(log);
  }

  res.status(status).json(body);
}
