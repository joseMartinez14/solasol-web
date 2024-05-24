import { ReactNode, useEffect, useState } from 'react';
import { AppContext } from '..';
import { GeneralSignInOutput } from '../type';
import {
    signInWithEmailAndPassword,
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    UserCredential,
    createUserWithEmailAndPassword,


} from "firebase/auth";
import firebase_app from '../../../firebase/config';
import { Company, User, createOnlyCompanyDto, createUserCompanyDto, findOrCreateDto } from '../../../core/authentication/dtos/Users';
import api from '../../../core/config';
import axios from 'axios';

export interface AppContextProviderProps {
    children: ReactNode;
}

type UserFindorReplaceReturn = {
    user: User | null;
    error: string | null;
}
type CompanyCreateReturn = {
    company: Company | null;
    error: string | null;
}


//This is for simple login and google login 
const fetchFindOrCreateuser = async (formData: findOrCreateDto): Promise<UserFindorReplaceReturn> => {
    //Mandar request al api y a ver si se recibe el usuario 
    const result = await api.post<User>('/users', formData)
        .then((res) => {
            return { user: res.data, error: null }
        })
        .catch((error) => {
            console.log(error);
            return { user: null, error: error }
        });
    return result
}

//This is for simple login and google login 
const createUserCompany = async (formData: createUserCompanyDto): Promise<UserFindorReplaceReturn> => {
    //Mandar request al api y a ver si se recibe el usuario 
    const result = await api.post<User>('/users/user_company', formData)
        .then((res) => {
            console.log("Response from api")
            console.log(res)
            return { user: res.data, error: null }
        })
        .catch((error) => {
            console.log("Error en api")
            console.log(error);
            return { user: null, error: error }
        });
    return result;
}

//This is for simple login and google login 
const createCompany = async (formData: createOnlyCompanyDto): Promise<CompanyCreateReturn> => {
    //Mandar request al api y a ver si se recibe el usuario 
    const result = await api.post<Company>('/company', formData)
        .then((res) => {
            console.log("Response from api")
            console.log(res)
            return { company: res.data, error: null }
        })
        .catch((error) => {
            console.log("Error en api")
            console.log(error);
            return { company: null, error: error }
        });
    return result;
}


export const AppContextProvider = (props: AppContextProviderProps) => {
    const { children } = props;
    const [user, setUser] = useState<User>({} as User);

    const auth = getAuth(firebase_app);

    const createOnlyCompany = async (company_name: string, company_description: string, company_phone: string): Promise<GeneralSignInOutput> => {
        try {

            const fetch_result = await createCompany({ companyName: company_name, companyDescription: company_description, phoneNumber: company_phone });
            if (fetch_result.company) {
                localStorage.setItem('easyCatalogCompanyName', fetch_result.company?.name || '<Nombre de empresa>')
                return { outcome: true, message: "Success" }

            } else {
                console.log("Error with login")
                console.log(fetch_result?.error)
                return { outcome: false, message: "Login unsuccessful" }
            }
        } catch (e) {
            console.log("create company did'n work: ", e)
            return { outcome: false, message: "Login unsuccessful" }
        }
    }


    const googleSignIn = async (): Promise<GeneralSignInOutput> => {
        try {
            const provider = new GoogleAuthProvider();
            let result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            localStorage.setItem('firebaseAuthToken', token || 'Null token');
            axios.defaults.headers.Authirization = `Bearer ${token}`;
            const fetch_data = { name: result.user.displayName, uuid: result.user.uid, email: result.user.email }
            const fetch_result = await fetchFindOrCreateuser(fetch_data)

            if (fetch_result.user == null) {
                return { outcome: false, message: "Login unsuccessful" }
            } else {
                setUser(fetch_result.user)
                if (fetch_result.user.company) {
                    localStorage.setItem('easyCatalogCompanyName', fetch_result.user.company.name || '<Nombre de empresa>')
                }
                return { outcome: true, message: "Success" }
            }
        } catch (e) {
            console.log("login by email and password did'n work: ", e)
            return { outcome: false, message: "Login unsuccessful" }
        }
    }

    const logOut = () => {
        signOut(auth);
        localStorage.removeItem('easyCatalogCompanyName');
        localStorage.removeItem('firebaseAuthToken');
    }

    useEffect(() => {

    }, [user]);

    return (
        <AppContext.Provider
            value={{ user, logOut, googleSignIn, createOnlyCompany }}>
            {children}
        </AppContext.Provider>
    );
};
