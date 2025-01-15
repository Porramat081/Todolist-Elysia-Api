import { Elysia } from "elysia";
import { env } from "bun";
import cors from "@elysiajs/cors";
import { corsConfig, jwtConfig } from "../config/config";
import swagger from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { userRoute } from "./routes";
import { checkSignIn } from "./middlewares";

const app = new Elysia()
  .use(cors(corsConfig))
  .use(jwt(jwtConfig))
  .use(
    swagger({
      path: "/document",
    })
  )
  .get("/", () => "Hello Elysia")
  .guard({ beforeHandle: checkSignIn })
  .group("/user", userRoute)
  .listen(Number(env.PORT));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
