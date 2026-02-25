import { useEffect, useState } from 'react';
import { useUserData } from '../contexts/UserDataContext.tsx';
import verificate from '../services/Verification.ts';
import { useNavigate } from 'react-router';
import SideBar from '../components/SideBar.tsx'

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
    return <div className="p-4 w-full h-screen relative bg-gray-200">
        <SideBar/> 
        <div className='ml-[204px] p-5 mt-[-16px] w-[100vw] text-gray-900'>
            <h1 className="text-3xl font-medium">Hello, {firstName}!</h1>
        </div>
    </div>
}

export default Home;