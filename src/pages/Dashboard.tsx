import { useEffect, useState } from 'react';
import { useUserData } from '../contexts/UserDataContext.tsx';
import verificate from '../services/Verification.ts';
import { useNavigate } from 'react-router';
import SideBar from '../components/SideBar.tsx'
import Header from '../components/Header.tsx'
import { getProjects } from '../services/Projects.ts';
import NoProjects from '../components/NoProjects.tsx';
import '../index.css'
import Project from '../components/Project.tsx';
import ProjectForm from '../components/ProjectForm.tsx';
import GitHubConnectButton from '../components/GitHubConnectButton.tsx';
import { getGitHubStatus } from '../services/Github.ts';
import type { GitHubStatus } from '../interfaces/Objects.ts';

const Home = () => {
    const { firstName, projects, setUserInfo, setUserProjects} = useUserData();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormActive, setIsFormActive] = useState<boolean>(false);
    const [isUpdating, setIsUpdting] = useState<boolean>(false);
    const [githubStatus, setGithubStatus] = useState<GitHubStatus | null>(null);

    const navigate = useNavigate();

    const {currentProject} = useUserData();

    const handleCreateProject = () => {
        setIsUpdting(false);
        setIsFormActive(true);
    }

    const handleUpdateProject = () => {
        setIsUpdting(true);
        setIsFormActive(true);
    }

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
                        const githubData = await getGitHubStatus();

                        if (projectData) {
                            setUserProjects(projectData);
                        }

                        if (githubData) {
                            setGithubStatus(githubData);
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

        const params = new URLSearchParams(window.location.search);
        if (params.get("github") === "connected") {
            alert("GitHub account connected successfully!");
            window.history.replaceState({}, '', '/dashboard'); // Clear query params
        }

    }, [])

    if (loading) {
        return <div className="p-4">
            <h1 className="text-2xl font-normal">Loading...</h1>
        </div>
    }

    return <div className="relative p-4 pr-0 w-full min-h-screen flex texture">
        <SideBar/> 
        <div className='ml-[220px] p-5 mt-[-16px] text-black overflow-y-auto max-h-screen flex-1'>
            <Header type="dashboard"/>
            <div className='flex justify-between'>

                <div>
                    <h1 className="text-4xl font-medium mb-10">Hello {firstName}!</h1>
                    
                    <h1 className='flex gap-1 items-center text-gray-700 bg-gray-300 w-max pl-2 pr-2 rounded-[10px] text-sm font-medium -mt-7 mb-7'>
                        <div className='relative w-5 h-5 flex justify-center items-center'>
                            <span className="h-4 w-4 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                            <span className="absolute h-2 w-2  rounded-full bg-green-500"></span>
                        </div>
                        {githubStatus?.username}
                        <div className='text-xl'><i className="fa fa-github"></i></div>
                    </h1>
                </div>
                
                {!githubStatus?.connected && <GitHubConnectButton />}
            </div>

            {
                projects.length == 0? 
                <NoProjects/> 
                : 
                <>
                    <div className='flex justify-between mb-10'>
                        <h1 className='text-3xl'>Your Projects</h1>
                        <button onClick={() => handleCreateProject()} className="bg-dark-teal-700 text-white p-4 pt-2 pb-2 rounded rounded-[10px] shadow-xl hover:bg-dark-teal-800 hover:cursor-pointer">
                            +
                        </button>
                    </div> 
                    <div className='flex flex-wrap justify-center gap-10'>
                        {projects.map((project) => (
                            <Project 
                                id={project.id} 
                                name={project.name} 
                                slug={project.slug}
                                githubRepo={project.githubRepo} 
                                onUpdate={() => handleUpdateProject()}  
                            />
                        ))}
                    </div>
                </>
            }
        </div>
        {isFormActive && <ProjectForm project={isUpdating ? currentProject: null} onClose={() => setIsFormActive(false)}/>}
    </div>
}

export default Home;