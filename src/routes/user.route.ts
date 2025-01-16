import { userController } from "../controllers";

export const userRoute = (app: {
  get: (arg0: string, arg1: ({ request }: any) => Promise<unknown>) => any;
  post: (
    arg0: string,
    arg1: ({ request, jwt, body }: any) => Promise<unknown>
  ) => any;
}) =>
  app
    .post("/verify", userController.verify)
    .post("/signUp", userController.create)
    .post("/login", userController.login);
