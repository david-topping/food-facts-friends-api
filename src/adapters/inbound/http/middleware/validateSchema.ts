import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: AnySchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err: any) {
      return res.status(400).json({
        message: "Invalid request payload",
        errors: err.errors,
      });
    }
  };
}
