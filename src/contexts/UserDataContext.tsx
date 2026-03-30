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
    
    const [projects, setProjects] = useState<Project[]>(() => {
        const storedProjects = sessionStorage.getItem("userProjects");
        return storedProjects ? JSON.parse(storedProjects) : [];
    });
    
    const [currentProject, setCurrentProject] = useState<Project>(() => {
        const storedCurrentProject = sessionStorage.getItem("currentUserProject");
        return storedCurrentProject ? JSON.parse(storedCurrentProject) : {id: "", name: "", slug: "", githubRepo: ""};
    });
    
    const [releases, setReleases] = useState<ReleaseObj[]>(() => {
        const storedReleases = sessionStorage.getItem("UserProjectReleases");
        return storedReleases ? JSON.parse(storedReleases) : [];
    })
    
    const [currentRelease, setCurrentRelease] = useState<ReleaseObj>(() => {
        const storedCurrentRelease = sessionStorage.getItem("currentProjectRelease");
        return storedCurrentRelease ? JSON.parse(storedCurrentRelease) : {id: "", version: "", description: "", createdAt: "", status: ""};
    });

    const setUserInfo = (firstName: string, lastName: string, email: string) => {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        
        const userInfo = {firstName, lastName, email} 
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    const setUserProjects = (userProjects: Project[]) => {
        sessionStorage.setItem("userProjects", JSON.stringify(userProjects));
        setProjects(userProjects);
    }

    const setCurrentUserProject = (project: Project) => {
        sessionStorage.setItem("currentUserProject", JSON.stringify(project));
        setCurrentProject(project);
    }

    const logout = () => {
        setUserInfo("", "", "");
        localStorage.removeItem("token");
    }

    const setCurrentProjectRelease = (release: ReleaseObj) => {
        sessionStorage.setItem("currentProjectRelease", JSON.stringify(release));
        setCurrentRelease(release);
    }

    const setUserProjectReleases = (releases: ReleaseObj[]) => {
        sessionStorage.setItem("UserProjectReleases", JSON.stringify(releases));
        setReleases(releases);
    }

    const values: UserDataProviderProps = {
        firstName,
        lastName,
        email,
        projects,
        currentProject,
        releases,
        currentRelease,
        setUserInfo,
        setUserProjects,
        setCurrentUserProject,
        setCurrentProjectRelease,
        setUserProjectReleases,
        logout
    }

    useEffect(() => {
        
        const setInfo = () => {

            const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
            setUserInfo(userInfo?.firstName, userInfo?.lastName, userInfo?.email);
        }

        try {

            setInfo()
            
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <UserDataContext.Provider value={values}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataProvider;