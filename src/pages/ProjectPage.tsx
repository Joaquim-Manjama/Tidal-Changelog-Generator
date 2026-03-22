import { useNavigate } from "react-router";
import Header from "../components/Header";
import NoReleases from "../components/NoReleases";
import SideBar from "../components/SideBar";
import { useUserData } from "../contexts/UserDataContext";
import { useEffect, useState } from "react";
import { getReleases } from "../services/Releases";
import Release from "../components/Release";
import ReleaseForm from "../components/ReleaseForm";
import type { ReleaseObj } from "../interfaces/Objects";

const ProjectPage = () => {

    const [releases, setReleases] = useState<ReleaseObj[]>([]);
    const [formActive, setFormActive] = useState(false);
    const [currentRelease, setCurrentRelease] = useState<{id: string, version: string, description: string} | null>(null);

    const {currentProject} = useUserData();

    const navigate = useNavigate();

    const handleCloseForm = () => {
        setFormActive(false);
        setCurrentRelease(null);
        window.location.reload();
    }

    const handleEditRelease = (id: string, version: string, description: string) => {
        setCurrentRelease({id, version, description})
        setFormActive(true);
    }

    useEffect(() => {

        if (!currentProject?.id) return;

        const fetchReleases = async () => {
            
            try {
                const response = await getReleases(currentProject.id);

                if (response) {
                    console.log(response);
                    setReleases(response)
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchReleases()

    }, [currentProject])

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
                {releases.length != 0?
                    <div className="flex flex-col gap-10">
                        <div className="flex justify-between">
                            <h1 className="text-3xl">Releases</h1>
                            <button onClick={() => setFormActive(true)} className="bg-dark-teal-700 text-white p-4 pt-2 pb-2 rounded rounded-[10px] shadow-xl hover:bg-dark-teal-800 hover:cursor-pointer">
                                +
                            </button>
                        </div>                      
                        <div className="flex flex-col gap-10">
                            {
                                releases.map((release) => (
                                    <Release 
                                        id={release.id}
                                        version={release.version}
                                        description={release.description}
                                        createdAt={release.createdAt.substring(0, 10)}
                                        status={release.status}
                                        onEdit={handleEditRelease}
                                        />
                                ))
                            }
                        </div>
                    </div>
                    :
                    <NoReleases/>
                }
            </div>
            {
                formActive 
                    && 
                <ReleaseForm projectId={currentRelease?.id || ""} version={currentRelease?.version || ""} description={currentRelease?.description || ""} onClose={() => handleCloseForm()}/>
            }
        </div>
}

export default ProjectPage;