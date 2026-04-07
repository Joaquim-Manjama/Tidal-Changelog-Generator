export interface Project {
    id: string;
    name: string;
    slug: string;
    githubRepo: string;
}

export interface Entry {
    id: string;
    description: string;
    displayOrder: number;
    category: "NEW_FEATURE" | "BUG_FIX" | "IMPROVEMENT";
}

export interface ReleaseObj {
    id: string;
    version: string;
    description: string;
    createdAt: string;
    status: string
}