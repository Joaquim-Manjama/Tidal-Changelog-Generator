import { useEffect, useState } from 'react';
import { useUserData } from '../contexts/UserDataContext.tsx';
import verificate from '../services/Verification.ts';
import { useNavigate } from 'react-router';
import SideBar from '../components/SideBar.tsx'
import Header from '../components/Header.tsx'
import { getProjects } from '../services/Projects.ts';
import NoProjects from '../components/NoProjects.tsx';
import '../index.css'

const Home = () => {
    const { firstName, projects, setUserInfo, setUserProjects} = useUserData();
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

                    try {
                        const projectData = await getProjects();

                        if (projectData) {
                            setUserProjects(projectData);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    

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
    return <div className="p-4 pr-0 w-full h-screen flex-row texture">
        <SideBar/> 
        <div className='ml-[204px] p-5 mt-[-16px] text-black border h-screen'>
            <Header type="dashboard"/>
            <h1 className="text-3xl font-medium mb-30">Hello {firstName}!</h1>
            {projects.length == 0 && <NoProjects/>}
        </div>
    </div>
}

export default Home;