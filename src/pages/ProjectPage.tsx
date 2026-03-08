import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useUserData } from "../contexts/UserDataContext";

const ProjectPage = () => {

    const {currentProject} = useUserData();

    return <div className="relative p-4 pr-0 w-full min-h-screen flex texture">
            <SideBar/> 
            <div className='ml-[220px] p-5 mt-[-16px] text-black overflow-y-auto max-h-screen flex-1'>
                <Header type="dashboard"/>
                <h1 className="text-4xl font-medium mb-10">{currentProject.name}</h1>
                <p className="">{currentProject.slug}</p>
            </div>
        </div>
}

export default ProjectPage;