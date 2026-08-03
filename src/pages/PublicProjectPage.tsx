import { useEffect, useState } from "react";
import type { ProjectData } from "../interfaces/Objects";
import NotFound from "./NotFound";
import { getProject } from "../services/Public";
import { useParams } from "react-router";

const PublicProjectPage = () => {

    const [projectData, setProjectData] = useState<ProjectData| null>(null);
    const [totalFeatures, setTotalFeatures] = useState<number>(0);
    const [totalFixes, setTotalFixes] = useState<number>(0);
    const [totalImprovements, setTotalImprovements] = useState<number>(0);


    const slug = useParams().slug;

    useEffect(() => {

        const getData = async () => {

            try {
                const response = await getProject(slug as string);

                if (response) {
                    setProjectData(response);

                    projectData?.publishedReleases.forEach(release => {
                        setTotalFeatures(prev => prev + release.numberOfFeatures);
                        setTotalFixes(prev => prev + release.numberOfFixes);
                        setTotalImprovements(prev => prev + release.numberOfImprovements);
                    });
                }

            } catch (err) {
                console.error("Error: ", err);
            }
        }

        getData();

    }, [])

    return  <>
                {
                    projectData ? 
                        
                        <div className="flex flex-col w-full h-screen bg-[#f4f8fb]">
                            <div className="bg-[#001021] w-full h-[280px]">

                                <div className="w-full flex flex-col border-b-1 border-white/20 p-6 gap-5">
                                    <p className="text-white/40">Project Overview</p>
                                    
                                    <div className="flex gap-5">
                                        <h1 className="text-4xl md:text-5xl font-medium">{projectData?.name}</h1>
                                        <span className="text-sm bg-[#0caadc] p-1 h-[27px] rounded font-medium">{projectData?.publishedReleases?.[projectData?.publishedReleases.length - 1]?.version}</span>
                                    </div>

                                    <div className="flex gap-10">
                                        <div className="flex gap-3">
                                            <p className="text-white/40 text-xs font-thin">SLUG</p>
                                            <p className="text-white/75 text-sm">{projectData?.slug}</p>
                                            <button className="px-2 py-0.5 text-xs bg-[#e4eff6] text-[#3a6880] rounded hover:bg-[#1481ba] hover:text-white hover:cursor-pointer">Copy</button>
                                        </div>

                                        {projectData?.githubRepo && (
                                            <div className="flex gap-3">
                                                <p className="text-white/40 text-xs font-thin">URL</p>
                                                <p className="underline text-white/75 text-sm">{projectData?.githubRepo}</p>
                                                <button className="px-2 py-0.5 text-xs bg-[#e4eff6] text-[#3a6880] rounded hover:bg-[#1481ba] hover:text-white hover:cursor-pointer">Copy</button>
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className="w-full flex p-6 gap-10">
                                        
                                        <div className="flex flex-col">
                                            <p>{projectData?.publishedReleases.length}</p>
                                            <p>Releases</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p>{totalFeatures}</p>
                                            <p>Features</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p>{totalFixes}</p>
                                            <p>Fixes</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p>{totalImprovements}</p>
                                            <p>Improvements</p>
                                        </div>

                                </div>

                            </div>
                        </div> 
                    : 
                        <NotFound/>
                }
            </>
}

export default PublicProjectPage;