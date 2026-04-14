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
            window.location.href = data.url; // Redirect to GitHub authorization URL
        }

    } catch (error) {
        console.error("Error connecting to GitHub:", error);

    }    
}