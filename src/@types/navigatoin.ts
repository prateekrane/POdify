interface NewUserResponse {
  id: string;
  name: string;
  email: string;
}

export type AuthStackParamsList = {
  SignUp: undefined;
  SignIn: undefined;
  Verificatoin: {userInfo: NewUserResponse};
  Lostpwd: undefined;
};
