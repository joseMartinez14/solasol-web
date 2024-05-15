export interface SignUpFullForm {
    email:string;
    name: string;
    password:string;
    companyName: string;
    companyDescription: string;
    phoneNumber: string;
}

export interface SignUpCompanyForm {
    companyName: string;
    companyDescription: string;
    phoneNumber: string;
}