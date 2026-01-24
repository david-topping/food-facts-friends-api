import Stripe from "stripe";
import { ValidationError } from "yup";

type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

type ErrorMapping = {
  status: number;
  body: {
    error: ApiError;
  };
  log?: unknown;
};

export function mapErrorToResponse(err: unknown): ErrorMapping {
  if (err instanceof Stripe.errors.StripeError) {
    return {
      status: 502,
      body: {
        error: {
          code: "PAYMENT_PROVIDER_ERROR",
          message: "Payment processing failed. Please try again later.",
        },
      },
      log: err,
    };
  }

  if (err instanceof ValidationError) {
    return {
      status: 400,
      body: {
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request payload",
          details: err.errors,
        },
      },
    };
  }

  if (err instanceof Error) {
    return {
      status: 500,
      body: {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        },
      },
      log: err,
    };
  }

  return {
    status: 500,
    body: {
      error: {
        code: "UNKNOWN_ERROR",
        message: "Unexpected error.",
      },
    },
    log: err,
  };
}
