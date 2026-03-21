import { API_URL } from "./API";

export const getProjects = async () => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/all`, {
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

export const createProject = async(name: string, slug: string, githubRepo: string) => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    slug,
                    githubRepo
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

export const deleteProject = async (id: string) => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        );

        console.log("Status:", response.status);
        const text = await response.text(); 
        console.log("Raw response:", text);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(text);

    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

export const updateProject = async (id: string, name: string, slug: string, githubRepo: string) => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/projects/update/${id}`, {
        
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                slug,
                githubRepo
            }),
        });

        console.log("Status:", response.status);
        const text = await response.text(); 
        console.log("Raw response:", text);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(text);

    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}