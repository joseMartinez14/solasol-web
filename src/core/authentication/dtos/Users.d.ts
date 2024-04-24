export type User = {
  uuid: string;
  full_name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  company?: Company;
};

export type Company = {
  id: number;
  name: string;
  description: string;
  is_active?: boolean;
  created_at?: Date;
}


export type findOrCreateDto = {
  name: string | null;
  uuid: string;
  email: string | null;
}

export type createUserCompanyDto = {
  name: string;
  uuid: string;
  email: string;
  company_name: string;
  company_description: string | null;
}

export type createOnlyCompanyDto = {
  companyName: string;
  companyDescription: string | null;
}
