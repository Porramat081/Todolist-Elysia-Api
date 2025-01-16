import { Elysia } from "elysia";
import { env } from "bun";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { userRoute } from "./routes";
import { checkSignIn } from "./middlewares";
import { taskRoute } from "./routes/task.route";
import { corsConfig, jwtConfig } from "../config/config";

const app = new Elysia()
  .use(cors(corsConfig))
  .use(jwt(jwtConfig))
  .use(
    swagger({
      path: "/document",
    })
  )
  .guard({ beforeHandle: checkSignIn })
  .group("/user", userRoute)
  .group("/task", taskRoute)
  .listen(Number(env.PORT));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
