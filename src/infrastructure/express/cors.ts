import cors, { CorsOptions } from "cors";

export function buildCorsMiddleware() {
  const allowedOrigins =
    process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? [];

  const options: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.length === 0) {
        return callback(
          new Error("CORS blocked: no allowed origins configured"),
          false,
        );
      }

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked origin: ${origin}`), false);
    },
    credentials: true,
  };

  return cors(options);
}
