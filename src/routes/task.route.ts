import { TaskControllerBody } from "../../interfaces/task.interface";
import { taskController } from "../controllers";

export const taskRoute = (app: {
  post: (
    arg0: string,
    arg1: ({
      body,
      request,
    }: {
      body: TaskControllerBody;
      request: any;
    }) => Promise<unknown>
  ) => any;
}) =>
  app
    .post("/create", taskController.create)
    .get("/getTaskByOwnerId", taskController.getTaskByOwnerId);
