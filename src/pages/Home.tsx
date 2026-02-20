import { useAuthContext } from "../contexts/AuthContext";

const Home = () => {
    const {firstName, lastName} = useAuthContext() || {firstName: "", lastName: ""};

    return <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome, {firstName} {lastName}!</h1>
    </div>
}

export default Home;