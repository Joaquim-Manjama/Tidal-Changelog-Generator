export interface Project {
    id: string;
    name: string;
    slug: string;
    githubRepo: string;
}

export interface ReleaseObj {
    id: string;
    version: string;
    description: string;
    createdAt: string;
    status: string
}