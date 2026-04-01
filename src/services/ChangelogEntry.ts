import { API_URL } from "./API";


export const getAllEntries = async (releaseId: string) => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/releases/${releaseId}/entries`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error("Error fetching changelog entries:", error);
        throw error;
    }
}

export const addChangelogEntry = async (releaseId: string, description: string, category: string, displayOrder: number) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/releases/${releaseId}/entries/new`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category, description, displayOrder })
        });

        const data = await response.text();
        return data;

    } catch (error) {
        console.error("Error adding changelog entry:", error);
        throw error;
    }
}