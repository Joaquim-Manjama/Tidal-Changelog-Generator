import {createContext, useContext, useState, type PropsWithChildren} from "react";

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext) 

interface AuthContextType {
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    email: string;
    setEmail: (email: string) => void;
    token: string;
    setToken: (token: string) => void;
    getNewToken: () => void;
}

const AuthProvider = ({children}: PropsWithChildren) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    const getNewToken = () => {
        setToken(localStorage.getItem("token") || "");
    }

    const values: AuthContextType | null = {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        token,
        setToken,
        getNewToken
    }

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;