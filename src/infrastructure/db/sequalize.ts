import { Sequelize } from "sequelize";
import { requireEnv } from "../config/env";

export function createSequelize() {
  const dbHost = requireEnv("DB_HOST");
  const dbName = requireEnv("DB_NAME");
  const dbUser = requireEnv("DB_USER");
  const dbPassword = requireEnv("DB_PASSWORD");
  const dbPort = Number(requireEnv("DB_PORT"));

  return new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: "mysql",
    logging: false,
  });
}
