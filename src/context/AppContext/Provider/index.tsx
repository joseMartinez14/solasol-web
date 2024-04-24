import { ReactNode, useEffect, useState } from 'react';
import { AppContext } from '..';
import { GeneralSignInOutput, UserType } from '../type';
import {
    signInWithEmailAndPassword,
    getAuth,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    UserCredential,
    createUserWithEmailAndPassword
} from "firebase/auth";
import firebase_app from '../../../firebase/config';
import { Company, User, createOnlyCompanyDto, createUserCompanyDto, findOrCreateDto } from '../../../core/authentication/dtos/Users';
import api from '../../../core/config';

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

    const createOnlyCompany = async (company_name: string, company_description: string): Promise<GeneralSignInOutput> => {
        try {

            const fetch_result = await createCompany({ companyName: company_name, companyDescription: company_description });
            if (fetch_result.company == null) {
                console.log("Error with login")
                console.log(fetch_result?.error)
                return { outcome: false, message: "Login unsuccessful" }
            } else {
                await localStorage.setItem('instaCatalogCompanyName', fetch_result.company?.name || '<Nombre de empresa>')
                return { outcome: true, message: "Success" }
            }
        } catch (e) {
            console.log("login by email and password did'n work: ", e)
            return { outcome: false, message: "Login unsuccessful" }
        }
    }


    const googleSignIn = async (): Promise<GeneralSignInOutput> => {
        //Este es solo login sin empresa.
        //Se manda al api el nomnbre, el uuid, email
        //Tengo que tener 2 entry points en el api 1 para google y otro para email-password
        try {
            const provider = new GoogleAuthProvider();
            let result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            await localStorage.setItem('firebaseAuthToken', token || 'Null token');
            console.log("Firebase result:")
            console.log(result)
            const fetch_data = { name: result.user.displayName, uuid: result.user.uid, email: result.user.email }
            const fetch_result = await fetchFindOrCreateuser(fetch_data)

            if (fetch_result.user == null) {
                console.log("Error with login")
                console.log(fetch_result?.error)
                return { outcome: false, message: "Login unsuccessful" }
            } else {
                console.log("The user is **** ");
                console.log(fetch_result.user)
                setUser(fetch_result.user)
                await localStorage.setItem('instaCatalogCompanyName', fetch_result.user.company?.name || '<Nombre de empresa>')
                return { outcome: true, message: "Success" }
            }
            //Hacer el llamado a otra function que vaya y agarre los datos del usuario
            return { outcome: true, message: "Success" }
        } catch (e) {
            console.log("login by email and password did'n work: ", e)
            return { outcome: false, message: "Login unsuccessful" }
        }
    }

    const logOut = () => {
        signOut(auth);
        localStorage.removeItem('instaCatalogCompanyName');
        localStorage.removeItem('firebaseAuthToken');
    }

    const emailPasswordSignIn = async (email: string, password: string): Promise<GeneralSignInOutput> => {
        let result: UserCredential | null = null
        try {
            result = await signInWithEmailAndPassword(auth, email, password);
            const token = await result.user.getIdToken();
            await localStorage.setItem('firebaseAuthToken', token || 'Null token');
            const fetch_data = { name: result.user.displayName, uuid: result.user.uid, email: result.user.email }
            const fetch_result = await fetchFindOrCreateuser(fetch_data)
            if (fetch_result.user) {
                await localStorage.setItem('instaCatalogCompanyName', fetch_result.user.company?.name || '<Nombre de empresa>')
            }
            console.log(result);
            return { outcome: true, message: "Success" }
        } catch (e) {
            console.log("login by email and password did'n work: ", e)
            return { outcome: false, message: "Login unsuccessful" }
        }
    }

    const emailPasswordCreateUser = async (email: string, password: string, name: string, company_name: string, company_description: string): Promise<GeneralSignInOutput> => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const token = await result.user.getIdToken();
            await await localStorage.setItem('firebaseAuthToken', token || 'Null token');
            const fetch_data = { name, uuid: result.user.uid, email: email, company_name: company_name, company_description: company_description }
            const fetch_result = await createUserCompany(fetch_data);
            if (fetch_result.user == null) {
                console.log("Error with login")
                console.log(fetch_result)
                return { outcome: false, message: "Login unsuccessful" }
            } else {
                console.log("login correcto");
                console.log(fetch_result);
                setUser(fetch_result.user)
                await localStorage.setItem('instaCatalogCompanyName', fetch_result.user.company?.name || '<Nombre de empresa>')
                return { outcome: true, message: "Success" }
            }
            //I should create the company and user
        } catch (e) {
            console.log("login by email and password did'n work: ", e)
            return { outcome: false, message: "Login unsuccessful" }
        }
    }



    useEffect(() => {

    }, [user]);

    return (
        <AppContext.Provider
            value={{ user, logOut, emailPasswordSignIn, googleSignIn, emailPasswordCreateUser, createOnlyCompany }}>
            {children}
        </AppContext.Provider>
    );
};
