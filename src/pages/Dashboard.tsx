import { useEffect, useState } from 'react';
import { useUserData } from '../contexts/UserDataContext.tsx';
import verificate from '../services/Verification.ts';
import { useNavigate } from 'react-router';

const Home = () => {
    const { firstName, lastName, setUserInfo} = useUserData();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            setLoading(true);
            
            try {
                const result = await verificate();
                if (result) {
                    setUserInfo(result.firstName, result.lastName, result.email);
                    setLoading(false);
                } else {
                    setUserInfo("", "", "");
                    navigate("/auth");
                    return;
                }
                
            } catch (error) {
                console.error("Verification failed:", error);
                setUserInfo("", "", "");
                navigate("/auth");
            }
        };
        
        verify();
    }, [])

    if (loading) {
        return <div className="p-4">
            <h1 className="text-2xl font-normal">Loading...</h1>
        </div>
    }

    return <div className="p-4">
        <h1 className="text-2xl font-normal">Welcome, {firstName} {lastName}!</h1>
    </div>
}

export default Home;