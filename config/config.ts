import { env } from "bun";

export const corsConfig = {
  origin: env.FRONT_END_URL,
  method: ["GET , POST , PUT , DELETE"],
};

export const jwtConfig = {
  name: env.JWT_NAME,
  secret: env.JWT_SECRET || "secret",
};
