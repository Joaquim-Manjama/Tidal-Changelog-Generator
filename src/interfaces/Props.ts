import type { Entry, Project, ReleaseObj } from "./Objects";

export interface AuthBoxProps {
    type: "login" | "register";
}

export interface CategoryBoxProps {
    categoryType: "NEW_FEATURE" | "BUG_FIX" | "IMPROVEMENT";
    entries?: Entry[];
    onAddEntry: (category: string, displayOrder: number) => void;
}

export interface HeaderProps {
    type: "main" | "dashboard";
}

export interface ProjectFormProps {
    project: Project | null;
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
    releases: ReleaseObj[];
    currentRelease: ReleaseObj;
    currentCategory: string;
    currentDisplayOrder: number;
    setUserInfo: (firstName: string, lastName: string, email: string)=> void;
    setUserProjects: (userProjects: Project[]) => void;
    setCurrentUserProject: (project: Project) => void;
    setCurrentProjectRelease: (release: ReleaseObj) => void;
    setUserProjectReleases: (releases: ReleaseObj[]) => void;
    setCurrentEntryCategory: (category: string) => void;
    setCurrentEntryDisplayOrder: (displayOrder: number) => void;
    logout: () => void;
}