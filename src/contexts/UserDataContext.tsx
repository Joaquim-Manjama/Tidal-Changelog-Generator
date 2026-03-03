import { createContext, useContext, useState, type PropsWithChildren} from "react";
import Project from "../components/Project";

const UserDataContext =  createContext<UserDataProviderProps | null>(null);;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserData = (): UserDataProviderProps => {
    const context = useContext(UserDataContext);

    if (!context) {
        throw new Error("useUserData must be used within a UserProvider");
    }

    return context;
}

interface UserDataProviderProps {
    firstName: string;
    lastName: string;
    email: string;
    projects: Project[];
    currentProject: Project;
    setUserInfo: (firstName: string, lastName: string, email: string)=> void;
    setUserProjects: (userProjects: Project[]) => void;
    setCurrentProject: (project: Project) => void;
    logout: () => void;
}

interface Project {
    id: number;
    name: string;
    slug: string;
    githubRepo: string;
}

const UserDataProvider = ({ children }: PropsWithChildren<UserDataProviderProps>) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({id: -1, name: "", slug: "", githubRepo: ""});

    const setUserInfo = (firstName: string, lastName: string, email: string) => {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
    }

    const setUserProjects = (userProjects: Project[]) => {
        setProjects(userProjects);
    }

    const logout = () => {
        setUserInfo("", "", "");
        localStorage.removeItem("token");
    }

    const values: UserDataProviderProps = {
        firstName,
        lastName,
        email,
        projects,
        currentProject,
        setUserInfo,
        setUserProjects,
        setCurrentProject,
        logout
    }

    return (
        <UserDataContext.Provider value={values}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataProvider;