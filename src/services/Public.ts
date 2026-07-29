import { API_URL } from "./API";

export const getProject = async (projectSlug: string) => {

    try {

        const response = await fetch(`${API_URL}/public/project/${projectSlug}`)

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

export const getRelease = async (projectSlug: string, version: string) => {

    try {

        const response = await fetch(`${API_URL}/public/project/${projectSlug}/release/${version}`)

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