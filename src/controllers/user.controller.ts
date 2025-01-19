import { PrismaClient } from "@prisma/client";
import {
  CreateParams,
  ListParams,
  LoginParams,
  VerifyParams,
} from "../../interfaces/user.interface";
import { error, env } from "elysia";
import sendingEmail from "../utils/sendingEmail";

const prisma = new PrismaClient();

export default {
  create: async ({ jwt, body }: CreateParams) => {
    try {
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const user = await prisma.users.create({
        data: { ...body, verifyCode: verifyCode },
      });
      if (user?.email) {
        const token = await jwt.sign(
          { user_id: user.id, user_status: user.status },
          env.JWT_SECRET
        );
        if (user.verifyCode) {
          const emailResult = await sendingEmail(user.email, user.verifyCode);
          if (emailResult.accepted[0] === user.email) {
            return {
              message: "Register Success",
              des: 'Please Wait about 1-2 min and Check your email for the verification code"',
              token: token,
            };
          }
          return error(409, "can not send verify code to destination email");
        }
        return error(
          401,
          "this email don't have verify code may be verified already"
        );
      }
      return error(401, "this email has used already");
    } catch (error) {
      return error;
    }
  },
  verify: async ({ body, request }: VerifyParams) => {
    try {
      const userId = request.user_id;
      if (userId) {
        const res = await prisma.users.update({
          where: {
            id: userId,
            verifyCode: body.verifyCode,
            status: "waiting",
          },
          data: {
            status: "active",
            verifyCode: null,
          },
        });
        if (res) {
          return { message: "verify success" };
        } else {
          return error(401, "Verify Unsuccessful");
        }
      } else {
        return error(401, "Unauthorized Please Login By Register Email");
      }
    } catch (error) {
      return error;
    }
  },
  login: async ({ jwt, body }: LoginParams) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
        select: {
          email: true,
          status: true,
          id: true,
          username: true,
        },
      });
      if (user) {
        const token = await jwt.sign(
          { user_id: user.id, user_status: user.status },
          env.JWT_SECRET
        );
        return {
          token,
          user: {
            username: user.username,
            email: user.email,
            status: user.status,
          },
        };
      } else {
        return error(401, "Not found this email");
      }
    } catch (error) {
      return error;
    }
  },
  getProfile: async ({ request }: any) => {
    try {
      const userId = request.user_id;
      if (!userId) {
        return { message: "have no user", statusGetUser: false };
      }
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
        select: {
          username: true,
          email: true,
          status: true,
          tags: true,
        },
      });

      return user;
    } catch (error) {
      return error;
    }
  },
};
