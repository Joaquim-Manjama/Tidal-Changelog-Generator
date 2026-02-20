const API_URL = "http://localhost:8080/auth";

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
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

        storeInformation({firstName, lastName, email, token: JSON.parse(text).token});
        return JSON.parse(text);
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}

const storeInformation = (data: {firstName: string, lastName: string, email: string, token: string}) => {
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);
}