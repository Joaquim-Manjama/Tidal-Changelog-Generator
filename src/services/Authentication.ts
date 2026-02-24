const API_URL = "http://localhost:8080/auth";

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    return await authenticate(firstName, lastName, email, password, "register");
}

export const login = async (email: string, password: string) => {
    return await authenticate("", "", email, password, "login");
}

const authenticate = async (firstName: string, lastName: string, email: string, password: string, type: string) => {

    try {
        let response;
        if (type == "register") {
            response = await fetch(`${API_URL}/${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });
        } else {
            response = await fetch(`${API_URL}/${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
        }

        console.log("Status:", response.status);
        const text = await response.text(); // Get raw response
        console.log("Raw response:", text);
        const token = JSON.parse(text)?.token || "";
        localStorage.setItem("token", token)

        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return JSON.parse(text);
    } catch (error) {
        console.error(`${type} error:`, error);
        throw error;
    }
}