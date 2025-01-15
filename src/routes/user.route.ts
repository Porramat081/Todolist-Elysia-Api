import { userController } from "../controllers";

export const userRoute = (app: {
  get: (arg0: string, arg1: ({ request }: any) => Promise<unknown>) => any;
  post: (arg0: string, arg1: ({ request }: any) => Promise<unknown>) => any;
}) =>
  app.get("/list", userController.list).post("/signUp", userController.create);
