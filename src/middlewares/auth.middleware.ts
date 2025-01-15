import { env } from "bun";

export const checkSignIn = async ({ jwt, request, set }: any) => {
  const token = request.headers?.get("authorization")?.split(" ")[1];

  // if (!token) {
  //   set.status = 401;
  //   return "Unauthorized1";
  // }
  // if (!payload) {
  //   set.status = 401;
  //   return "Unauthorized2";
  // }

  const payload = await jwt?.verify(token, env.JWT_SECRET);

  request.user_id = payload?.id;
};
