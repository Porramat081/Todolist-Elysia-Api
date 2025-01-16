interface UserControllerBody {
  email: string;
  password: string;
  username: string;
}

interface UserLoginBody {
  email: string;
  password: string;
}

interface CreateParams {
  body: UserControllerBody;
  jwt: any;
}

interface ListParams {
  request: {
    user_id?: string;
  };
}

interface LoginParams {
  jwt: any;
  body: UserLoginBody;
}

interface VerifyParams {
  request: {
    user_id?: string;
  };
  body: {
    verifyCode: string;
  };
}

export {
  UserControllerBody,
  UserLoginBody,
  CreateParams,
  ListParams,
  LoginParams,
  VerifyParams,
};
