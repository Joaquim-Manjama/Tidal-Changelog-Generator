import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useUserData } from "../contexts/UserDataContext";

const ProjectSettings = () => {
   
    const {currentProject} = useUserData();
   
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
                        <span className="font-medium text-dark-teal-700">Email: </span>
                        <span>{`${currentProject.slug}`}</span>
                    </p>
                </div>

                <h1 className="text-3xl mb-3">Branding</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200 mb-15">
                    <p>
                        <span className="font-medium text-dark-teal-700">Logo: </span>
                    </p>
                    <p>
                        <span className="font-medium text-dark-teal-700">Branding Colour: </span>
                    </p>
                </div>

                <h1 className="text-3xl mb-3">GitHub Integration</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200 mb-15">
                    <p>
                        <span className="font-medium text-dark-teal-700">Repository: </span>
                    </p>
                    <p>
                        <span className="font-medium text-dark-teal-700">Branch: </span>
                    </p>
                    <div className="flex justify-center gap-20">
                        <button>Save</button>
                        <button>Disconect GitHub</button>
                    </div>
                </div>

                <h1 className="text-3xl mb-3">GitHub Integration</h1>
                <button>Delete Project</button>
            </div>
        </div>
}

export default ProjectSettings;