const API_URL = "http://localhost:8080/projects";

export const getProjects = async () => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/all`, {
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