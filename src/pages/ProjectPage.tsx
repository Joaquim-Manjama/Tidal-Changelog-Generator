import { useNavigate } from "react-router";
import Header from "../components/Header";
import NoReleases from "../components/NoReleases";
import SideBar from "../components/SideBar";
import { useUserData } from "../contexts/UserDataContext";

const ProjectPage = () => {

    const releases = [];

    const {currentProject} = useUserData();

    const navigate = useNavigate();

    return <div className="relative p-4 pr-0 w-full min-h-screen flex texture">
            <SideBar/> 
            <div className='ml-[220px] p-5 mt-[-16px] text-black overflow-y-auto max-h-screen flex-1'>
                <Header type="dashboard"/>
                <span className="flex justify-between">
                    <h1 className="text-4xl font-medium mb-1">{currentProject.name}</h1>
                    <span onClick={() => navigate("settings")} className="material-symbols-outlined mt-[10px] scale-[1.4] hover:cursor-pointer hover:-translate-y-1 hover:text-gray-800 transition duration-200 ">settings</span>
                </span>
                <p className="text-gray-600 text-sm mb-2">{currentProject.slug}</p>
                <p className={`text-sm  w-fit rounded-3xl pl-3 pr-3 bg-dark-teal-950 mb-20 text-${currentProject.githubRepo ? "green-500": "red-500"}`}>
                    <span className={`mr-2 text-${currentProject.githubRepo ? "green-600": "red-500 font-medium"}`}>{currentProject.githubRepo ? "●": "x"}</span>{currentProject.githubRepo || "project not connected to github"}
                </p>
                {releases.length?
                    <div>Releases</div>
                    :
                    <NoReleases/>
                }
            </div>
        </div>
}

export default ProjectPage;