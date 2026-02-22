import storeInformation from "./Util";

const API_URL = "http://localhost:8080/auth";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

const verificate = async (token: string): Promise<UserData> => {
    
    try {
        const response = await fetch(`${API_URL}/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
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
        console.error(`Verification error:`, error);
        throw error;
    }
}

export default verificate;