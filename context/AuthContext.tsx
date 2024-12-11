'use client';
import { createContext, useState, useEffect, useContext } from "react";
import { getAuthCookie, setAuthCookie, removeAuthCookie } from './cookieUtils';
import { User, AuthContextType} from '@/types/context/AuthContext';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC< {children: React.ReactNode}> = ({children}) =>{
    
    const [user, setUser] = useState<User | null>(null);
    const login = (user: User) => {setUser(user), setAuthCookie(user)};
    const logout = () => {setUser(null);  removeAuthCookie()};

    useEffect(() => {
        const userData = getAuthCookie();
        if (userData) {
            setUser(userData); 
        }
        // console.log("auth running 1 time");
        
    }, []);
        
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error ("useAuth must be used within AuthProvider");
    return context
};
