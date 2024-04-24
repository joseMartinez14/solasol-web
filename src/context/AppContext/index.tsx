import React from 'react';
import { AuthContext } from './type';


export const AppContext = React.createContext<AuthContext>({} as AuthContext);
