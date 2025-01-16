import { env } from "bun";

export const checkSignIn = async ({ jwt, request, set }: any) => {
  const token = request.headers?.get("authorization")?.split(" ")[1];

  const payload = await jwt?.verify(token, env.JWT_SECRET);

  request.user_id = payload?.user_id;
  request.user_status = payload?.user_status;
};
