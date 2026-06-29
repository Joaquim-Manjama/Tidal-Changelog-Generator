import { API_URL } from "./API";

export const connectGitHub = async () => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/github/authorize`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("GitHub authorization URL:", data.url);
            window.location.href = data.url; // Redirect to GitHub authorization URL
        }

    } catch (error) {
        console.error("Error connecting to GitHub:", error);

    }    
}

export const getGitHubStatus = async () => {
    const token = localStorage.getItem("token");
    
    try {
        const response = await fetch(`${API_URL}/github/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("GitHub status:", data);
            return data;
        }

    } catch (error) {
        console.error("Error fetching GitHub status:", error);
    }
}

export const disconnectGitHub = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/github/disconnect`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("GitHub disconnected successfully");
        }

    } catch (error) {
        console.error("Error disconnecting from GitHub:", error);
    }
}

export const getGitHubRepos = async () => {
    const token = localStorage.getItem("token");
    
    try {
        const response = await fetch(`${API_URL}/github/get/repos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("GitHub repos:", data);
            return data;
        }

    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
    }
}


export const getGitHubChanges = async (repo: string, since: string, until:string) => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();
    params.append("repo", repo);
    params.append("since", since);
    params.append("until", until);

    console.log("Fetching GitHub changes for repo:", repo, "since:", since, "until:", until + "\n From: " + `${API_URL}/github/get/changes?${params}`);
    
    try {
        const response = await fetch(`${API_URL}/github/get/changes?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("GitHub Changes:", data);
            return data;
        }

    } catch (error) {
        console.error("Error fetching GitHub changes:", error);
    }
}