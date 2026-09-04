import { API_URL } from "./API";

export const subscribe = async (email: string, slug: string) => {

    try {
        const response = await fetch(`${API_URL}/subscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, slug }),
        });
        return response

    } catch (err) {
        console.error("Error: ", err);
    }
}

export const unsubscribe = async (email: string, slug: string) => {

    try {
        const response = await fetch(`${API_URL}/subscription`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, slug }),
        });
        return response;

    } catch (err) {
        console.error("Error: ", err);
    }
}