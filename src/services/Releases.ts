import { API_URL } from "./API";

export const getReleases = async (projectId: number) => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/${projectId}/releases/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        console.log("Status:", response.status);
        const text = await response.text(); 
        console.log("Raw response:", text);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(text);
    
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}

export const createRelease = async(projectId:number, version: string, description: string) => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/releases/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    projectId,
                    version, 
                    description
                })
            }
        )

        console.log("Status:", response.status);
        const text = await response.text(); 
        console.log("Raw response:", text);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(text);
    
    } catch (err) {
        console.error("Error: ", err);
        throw err;
    }
}