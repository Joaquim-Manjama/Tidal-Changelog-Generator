const API_URL = "http://localhost:8080/auth";

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });

        console.log("Status:", response.status);
        const text = await response.text(); // Get raw response
        console.log("Raw response:", text);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        storeInformation({firstName: JSON.parse(text).firstName, lastName: JSON.parse(text).lastName, email: JSON.parse(text).email, token: JSON.parse(text).token});
        return JSON.parse(text);
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}

export const login = async (email: string, password: string) => {

    const token = localStorage.getItem("token") || ""; 

    if (!token) {
        console.error("Token not found!");
        throw new Error("Token not found!");
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authentication": 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        console.log("Status:", response.status);
        const text = await response.text(); // Get raw response
        console.log("Raw response:", text);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        storeInformation({firstName: JSON.parse(text).firstName, lastName: JSON.parse(text).lastName, email: JSON.parse(text).email, token: JSON.parse(text).token});
        return JSON.parse(text);
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

const storeInformation = (data: {firstName: string, lastName: string, email: string, token: string}) => {
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);
}