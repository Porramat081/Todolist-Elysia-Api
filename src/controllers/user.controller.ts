import { PrismaClient } from "@prisma/client";
import { UserControllerBody } from "../../interfaces/user.interface";
const prisma = new PrismaClient();

export default {
  create: async ({ body }: { body: UserControllerBody }) => {
    try {
      await prisma.users.create({ data: body });
      return { message: "create user success" };
    } catch (error) {
      return error;
    }
  },
  list: async ({ request }: any) => {
    try {
      if (!request.user_id) {
        return "Unauthorized";
      }
      const user = await prisma.users.findMany();
      return user;
    } catch (error) {
      return error;
    }
  },
};
