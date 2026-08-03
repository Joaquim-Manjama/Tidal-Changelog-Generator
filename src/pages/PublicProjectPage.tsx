import { useEffect, useState } from "react";
import type { ProjectData, ReleaseInfo } from "../interfaces/Objects";
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

                if (response)
                    setProjectData(response);

            } catch (err) {
                console.error("Error: ", err);
            }

            if (projectData) {
                projectData?.publishedReleases.forEach((release: ReleaseInfo) => {
                        setTotalFeatures(prev => prev + release.numberOfFeatures);
                        setTotalFixes(prev => prev + release.numberOfFixes);
                        setTotalImprovements(prev => prev + release.numberOfImprovements);
                    });
            }
        }

        getData();

    }, [])

    return  <>
                {
                    projectData ? 
                        
                        <div className="flex flex-col w-full h-screen bg-[#f4f8fb]">
                            {/* Header */}
                            <div className="bg-[#001021] w-full">

                                <div className="w-full flex flex-col border-b-1 border-white/20 p-6 md:px-10 gap-5">
                                    <p className="text-white/40 tracking-wide">Project Overview</p>
                                    
                                    <div className="flex gap-5">
                                        <h1 className="text-4xl md:text-5xl font-medium">{projectData?.name}</h1>
                                        <span className="text-xs bg-[#0caadc] p-1 h-[25px] rounded font-medium tracking-widest">{projectData?.publishedReleases?.[projectData?.publishedReleases.length - 1]?.version}</span>
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

                                <div className="w-full flex px-6 py-3 md:px-10 gap-10">
                                        
                                        <div className="flex flex-col">
                                            <p className="text-2xl font-medium">{projectData?.publishedReleases.length}</p>
                                            <p className="text-white/40 text-xs font-thin tracking-wide">RELEASES</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p className="text-2xl font-medium">{totalFeatures}</p>
                                            <p className="text-white/40 text-xs font-thin tracking-wide">FEATURES</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p className="text-2xl font-medium">{totalFixes}</p>
                                            <p className="text-white/40 text-xs font-thin tracking-wide">FIXES</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p className="text-2xl font-medium">{totalImprovements}</p>
                                            <p className="text-white/40 text-xs font-thin tracking-wide">IMPROVEMENTS</p>
                                        </div>

                                </div>

                            </div>

                            {/* Releases*/}
                            <div className="w-full flex flex-col px-6 md:px-10 py-10">

                                <div className="flex justify-between text-[#3a6880] text-xs tracking-wide">
                                    <p>PUBLISHED RELEASES</p>
                                    <p>{projectData?.publishedReleases.length} total</p>
                                </div>

                            </div>

                        </div> 
                    : 
                        <NotFound/>
                }
            </>
}

export default PublicProjectPage;