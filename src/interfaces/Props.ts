import { type Project, type ReleaseObj } from "./Objects";

export interface AuthBoxProps {
    type: "login" | "register";
}

export interface HeaderProps {
    type: "main" | "dashboard";
}

export interface ProjectFormProps {
    project: Project
    onClose: () => void;
}

export interface ProjectProps {
    id: string;
    name: string;
    slug: string;
    githubRepo: string,
    onUpdate: () => void;
}

export interface ReleaseFormProps{
    projectId: string;
    version: string,
    description: string
    onClose: () => void;
}

export interface ReleaseProps {
    id: string,
    version: string,
    description: string,
    createdAt: string,
    status: string,
    onEdit: (id: string, version: string, description: string) => void;
}

export interface UserDataProviderProps {
    firstName: string;
    lastName: string;
    email: string;
    projects: Project[];
    currentProject: Project;
    currentRelease: ReleaseObj;
    setUserInfo: (firstName: string, lastName: string, email: string)=> void;
    setUserProjects: (userProjects: Project[]) => void;
    setCurrentUserProject: (project: Project) => void;
    setCurrentProjectRelease: (release: ReleaseObj) => void;
    logout: () => void;
}