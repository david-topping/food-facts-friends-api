import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: AnySchema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
}
