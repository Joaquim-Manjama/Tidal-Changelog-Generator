import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useUserData } from "../contexts/UserDataContext";
import { deleteProject } from "../services/Projects";
import { useNavigate } from "react-router";

const ProjectSettings = () => {
   
    const {currentProject} = useUserData();

    const githubStatus = JSON.parse(sessionStorage.getItem("githubStatus") || "null");

    const navigate = useNavigate();
    
    const handleDelete = async () => {
            
            const response = await deleteProject(currentProject.id);
            console.log(response);
            navigate("/dashboard");
        }
   
    return <div className="relative p-4 pr-0 w-full min-h-screen flex texture">
            <SideBar/> 
            <div className='ml-[220px] p-5 mt-[-16px] text-black overflow-y-auto max-h-screen flex-1'>
                <Header type="dashboard"/>
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
                        </p>
                        :
                        <button className="bg-gray-800 text-white h-12 pl-2 pr-2 rounded hover:bg-gray-600 hover:cursor-pointer w-70">
                            Connect to your GitHub Account
                        </button>
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