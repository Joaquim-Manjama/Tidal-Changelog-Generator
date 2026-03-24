import { createContext, useContext, useEffect, useState, type PropsWithChildren} from "react";
import type { UserDataProviderProps } from "../interfaces/Props";
import type { Project, ReleaseObj } from "../interfaces/Objects";


const UserDataContext =  createContext<UserDataProviderProps | null>(null);;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserData = (): UserDataProviderProps => {
    const context = useContext(UserDataContext);

    if (!context) {
        throw new Error("useUserData must be used within a UserProvider");
    }

    return context;
}

const UserDataProvider = ({ children }: PropsWithChildren<UserDataProviderProps>) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({id: "", name: "", slug: "", githubRepo: ""});
    const [currentRelease, setCurrentRelease] = useState<ReleaseObj>({id: "", version: "", description: "", createdAt: "", status: ""});

    const setUserInfo = (firstName: string, lastName: string, email: string) => {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        
        const userInfo = {firstName, lastName, email} 
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    const setUserProjects = (userProjects: Project[]) => {
        setProjects(userProjects);
    }

    const setCurrentUserProject = (project: Project) => {
        setCurrentProject(project);
        sessionStorage.setItem("currentUserProject", JSON.stringify(project));
    }

    const logout = () => {
        setUserInfo("", "", "");
        localStorage.removeItem("token");
    }

    const setCurrentProjectRelease = (release: ReleaseObj) => {
        setCurrentRelease(release);
        sessionStorage.setItem("currentProjectRelease", JSON.stringify(release));
    }

    const values: UserDataProviderProps = {
        firstName,
        lastName,
        email,
        projects,
        currentProject,
        currentRelease,
        setUserInfo,
        setUserProjects,
        setCurrentUserProject,
        setCurrentProjectRelease,
        logout
    }

    useEffect(() => {
        
        const setInfo = () => {

            const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
            setUserInfo(userInfo?.firstName, userInfo?.lastName, userInfo?.email);
            
            const currentUserProject = JSON.parse(sessionStorage.getItem("currentUserProject") || "");
            setCurrentProject(currentUserProject);

            const currentProjectRelease = JSON.parse(sessionStorage.getItem("currentProjectRelease") || "");
            setCurrentProject(currentProjectRelease);
        }


        try {

            setInfo()
            
        } catch (error) {
            console.log(error)
        }
    }, [currentRelease])

    return (
        <UserDataContext.Provider value={values}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataProvider;