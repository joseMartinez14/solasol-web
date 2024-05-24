import { User } from "../../core/authentication/dtos/Users";

export type AuthContext = {
  user: User;
  logOut: () => void;
  googleSignIn: () => Promise<GeneralSignInOutput>;
  createOnlyCompany: (
    company_name: string,
    company_description: string,
    company_phone: string
  ) => Promise<GeneralSignInOutput>;
};

export type GeneralSignInOutput = {
  outcome: boolean;
  message?: string;
};

export type UserType = {
  uuid: string;
  full_name: string;
  id_passport: string;
  email: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
};
