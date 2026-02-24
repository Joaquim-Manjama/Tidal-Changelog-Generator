import { createContext, useContext, useState, type PropsWithChildren} from "react";

const UserDataContext = createContext<UserDataProviderProps | null>(null);

interface UserDataProviderProps {
    firstName: string;
    lastName: string;
    email: string;
    setUserInfo(firstName: string, lastName: string, email: string): void;
}

const UserDataProvider = ({ children }: PropsWithChildren<UserDataProviderProps>) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const setUserInfo = (firstName: string, lastName: string, email: string) => {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
    }

    const value: UserDataProviderProps | null = {
        firstName,
        lastName,
        email,
        setUserInfo
    }
    
    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataProvider;

export const useUserData = () => useContext(UserDataContext)!;