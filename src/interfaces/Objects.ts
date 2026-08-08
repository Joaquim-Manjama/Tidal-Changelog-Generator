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
    releaseAt: string;
    numberOfFeatures: number;
    numberOfFixes: number;
    numberOfImprovements: number;
}

export interface GitHubRepo {
    id: string;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    default_branch: string;
}

export interface GitHubStatus {
    connected: boolean;
    username?: string;
}

export interface GitHubChange {
    type: string,
    id: string,
    title: string,
    description: string,
    author: string,
    date: string,
    labels: string[],
    url: string
}

export interface ProjectData {
    name: string;
    slug: string;
    githubRepo: string;
    publishedReleases: ReleaseInfo[];
}

export interface ReleaseInfo {
    version: string;
    description: string;
    releasedAt: string;
    numberOfFeatures: number;
    numberOfFixes: number;
    numberOfImprovements: number;
}

interface EntryInfo {
    description: string;
    category: string;
} 

export interface ReleaseDetails {
    version: string;
    description: string;
    releasedAt: string;
    features: EntryInfo[];
    fixes: EntryInfo[];
    improvements: EntryInfo[];
}