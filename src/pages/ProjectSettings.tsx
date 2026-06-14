import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useUserData } from "../contexts/UserDataContext";
import { deleteProject, getProject, updateProject } from "../services/Projects";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getGitHubRepos } from "../services/Github";
import type { GitHubRepo } from "../interfaces/Objects";

const ProjectSettings = () => {
   
    const {currentProject, setCurrentUserProject} = useUserData();

    const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
    const [currentRepoIndex, setCurrentRepoIndex] = useState<number>(-1);
    const [isRepoSaved, setIsRepoSaved] = useState(true);
    const [loading, setLoading] = useState(false);

    const githubStatus = JSON.parse(sessionStorage.getItem("githubStatus") || "null");

    const navigate = useNavigate();
    
    const handleDelete = async () => {
            
        const response = await deleteProject(currentProject.id);
        console.log(response);
        navigate("/dashboard");
    }

    useEffect(() => {

        if (!githubStatus?.connected) return;

        const getRepos = async () => {

            setLoading(true);
            try {
                const respose = await getGitHubRepos();
                
                if (respose) {
                    setGithubRepos(respose);
                }

                for (let i = 0; i < respose.length; i++) {
                    if (respose[i].html_url === currentProject.githubRepo) {
                        setCurrentRepoIndex(i);
                        break;
                    }
                }

            } catch (error) {
                setLoading(false);
                console.error(error);
            }
            setLoading(false);
        }

        getRepos();

    }, [])

    const handleChangeRepo = (index: number) => {

        setIsRepoSaved(false);
        setCurrentRepoIndex(index);
    }

    const handleSaveRepo = async () => {
        try {
        
            if (currentRepoIndex == -1) return;

            const response = await updateProject(currentProject.id, currentProject.name, currentProject.slug, githubRepos[currentRepoIndex].html_url);

            if (!response) {
                alert("Failed to update the project. Please try again.");
                return;
            }

            setIsRepoSaved(true);

            const updatedProject = await getProject(currentProject.id);
            
            setCurrentUserProject(updatedProject);

        } catch (error) {
            console.error(error);
        }  
        
    }
   
    return <div className="relative p-4 pr-0 w-full min-h-screen flex texture">
            <SideBar/> 
            <div className='ml-[220px] p-5 mt-[-16px] text-black overflow-y-auto max-h-screen flex-1'>
                <Header type="dashboard"/>
                <NavLink to="/project" className={"absolute top-[19px] left-[220px] bg-black p-4 pt-2 pb-1 rounded-xl bg-transparent scale-[1.5] font-normal hover:text-gray-300 hover:cursor-pointer transition duration-200 ease-in-out"}>
                    <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
                </NavLink>
                <h1 className="text-4xl font-medium mb-10">Project Settings</h1>
                
                <h1 className="text-3xl mb-3">Profile</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200 mb-15">
                    <p>
                        <span className="font-medium text-dark-teal-700">Name: </span>
                        <span>{`${currentProject.name}`}</span>
                    </p>
                    <p>
                        <span className="font-medium text-dark-teal-700">Slug: </span>
                        <span>{`${currentProject.slug}`}</span>
                    </p>
                </div>

                <h1 className="text-3xl mb-3">GitHub Integration</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200 mb-15">

                    {
                        githubStatus?.connected ?
                        <p>
                            <span className="font-medium text-dark-teal-700">Repository: </span>
                            {loading ? <p>Loading...</p> : (<select name="" id="" value={currentRepoIndex ?? -1} onChange={(e)=> handleChangeRepo(e.target.value)} defaultValue={-1} className="bg-gray-800 text-white h-12 pl-2 pr-2 rounded hover:cursor-pointer w-70">
                                    <option value={-1}>None</option>
                                    {githubRepos.map((repo, index) => (
                                        <option value={index}>{repo.name}</option>
                                    ))}
                            </select>)}


                            {!isRepoSaved && <button onClick={() => handleSaveRepo()} className="bg-green-700 text-white h-12 pl-2 pr-2 rounded hover:bg-green-900 hover:cursor-pointer w-70 ml-[50px]">Save</button>}
                        </p>
                        :
                        <NavLink to="/settings"  className="w-full flex justify-center">
                            <button className="pt-4 pb-4 m-auto bg-gray-800 text-white h-12 pl-2 pr-2 rounded hover:bg-gray-600 hover:cursor-pointer w-70">
                                Connect to your GitHub Account
                            </button>
                        </NavLink>
                    }
                </div>

                <h1 className="text-3xl mt-10 mb-3">Danger Zone</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200 flex justify-center">
                    <button onClick={() => handleDelete()} className="bg-red-900 text-white h-12 pl-2 pr-2 rounded hover:bg-red-950 hover:cursor-pointer w-50">
                        Delete Project
                    </button>
                </div>
            </div>
        </div>
}

export default ProjectSettings;