import { PrismaClient } from "@prisma/client";
import { TaskControllerBody } from "../../interfaces/task.interface";

const prisma = new PrismaClient();

export default {
  create: async ({
    body,
    request,
  }: {
    body: TaskControllerBody;
    request: any;
  }) => {
    try {
      if (!request.user_id || request.user_status !== "active") {
        return "Unauthorized";
      }
      await prisma.tasks.create({
        data: { ...body, ownerId: request.user_id },
      });
      return { message: "create task success" };
    } catch (error) {
      return error;
    }
  },
  getTaskByOwnerId: async ({ request }: any) => {
    try {
      if (!request.user_id || request.user_status !== "active") {
        return "Unauthorized";
      }
      const userId = request.user_id;
      console.log(userId);
      const res = await prisma.tasks.findMany({
        where: {
          ownerId: userId,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};
