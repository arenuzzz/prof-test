import { UserStatus } from '@constants';

export type SignInValues = {
  userStatus: UserStatus;
  email: string;
  password: string;
};

export type SignUpVisitorValues = {
  userStatus: UserStatus;
  email: string;
  password: string;
};

export type SignUpCompanyValues = SignUpVisitorValues & { secureCode: string };
export type SignUpValues = SignUpCompanyValues | SignUpVisitorValues;

export type TokenData = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type UserData = {
  id: 1;
  email: string;
  userStatus: UserStatus;
  isAdmin: boolean;
};

export type CheckEmailData = boolean;

export type CompanyPermissions = {
  isAdminAssigned: boolean;
  isCompanyBlocked: boolean;
};

export type AccessPermission = 'auth' | 'admin';
