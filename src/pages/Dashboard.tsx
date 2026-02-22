import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const Home = () => {
    const {firstName, lastName, getNewInfo} = useAuthContext() || {firstName: "", lastName: "", getNewInfo: () => {}};

    useEffect(() => {
        getNewInfo();
    }, []);

    return <div className="p-4">
        <h1 className="text-2xl font-normal">Welcome, {firstName} {lastName}!</h1>
    </div>
}

export default Home;