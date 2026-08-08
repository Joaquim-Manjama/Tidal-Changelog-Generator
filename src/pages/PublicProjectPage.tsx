import { useEffect, useState, version } from "react";
import type { ProjectData, ReleaseInfo } from "../interfaces/Objects";
import NotFound from "./NotFound";
import { getProject } from "../services/Public";
import { useNavigate, useParams } from "react-router";

const Release = ({release}: {release: ReleaseInfo}) => {

    const navigate = useNavigate()

    const getMonthName = (monthNumber: number) => {
        
        if (monthNumber < 0 || monthNumber > 11) {
            return "";
        }
        
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[monthNumber];
    }

    const goToReleaseInfoPage = () => {
        navigate(`release/${release?.version}`);
    }

    return <div onClick={() => goToReleaseInfoPage()} className="bg-white flex flex-col gap-5 border border-[#c8dde9] rounded hover:cursor-pointer hover:border-1 hover:border-[#3a6880] hover:shadow-xl">

                <div className="flex justify-between p-6 md:px-10 border border-b-[#c8dde9]">
                    <div className="flex gap-5">
                        <p className="text-black font-medium text-lg">{release.version.replace(/v/g, "")}</p>
                        <span className="bg-[#0caadc] text-white text-xs rounded-[30px] px-2 py-1 h-[23px] tracking-widest">Latest</span>
                    </div>
                    <p className="text-[#3a6880] text-xs tracking-wides">{`${getMonthName(parseInt(release.releasedAt.substring(5, 7)) - 1)} ${release.releasedAt.substring(8, 10)}, ${release.releasedAt.substring(0, 4)}`}</p>
                </div>
                <div className="px-6 md:px-10 border">
                    <p className="text-[#001021] text-sm mb-5">{release.description}</p>
                    <div className="border border-t-[#c8dde9]"></div>
                </div>
                <div className="flex px-6 md:px-10 mb-5 gap-5 justify-between">
                    <div className="flex flex-col bg-[#1481ba]/10 text-[#1481ba] rounded p-3 w-full">
                        <p className="text-xs tracking-widest"> ✦ FEATURES</p>
                        <p className="font-medium text-2xl">{release.numberOfFeatures}</p>
                    </div>
                    <div className="flex flex-col bg-[#11b5e4]/10 text-[#11b5e4] rounded p-3 w-full">
                        <p className="text-xs tracking-widest"> ◆ FIXES</p>
                        <p className="font-medium text-2xl">{release.numberOfFixes}</p>
                    </div>
                    <div className="flex flex-col bg-[#0caadc]/10 text-[#0caadc] rounded p-3 w-full">
                        <p className="text-xs tracking-widest"> ▲ IMPROVEMENTS</p>
                        <p className="font-medium text-2xl">{release.numberOfImprovements}</p>
                    </div>
                </div>
            </div>
}

const PublicProjectPage = () => {

    const [projectData, setProjectData] = useState<ProjectData| null>(null);


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
        }

        getData();
    }, [slug])

    const {
        totalFeatures,
        totalFixes,
        totalImprovements
    } = projectData ? projectData.publishedReleases.reduce((acc, release) => ({
        totalFeatures: acc.totalFeatures + release.numberOfFeatures,
        totalFixes: acc.totalFixes + release.numberOfFixes,
        totalImprovements: acc.totalImprovements + release.numberOfImprovements
    }), { totalFeatures: 0, totalFixes: 0, totalImprovements: 0 }) : { totalFeatures: 0, totalFixes: 0, totalImprovements: 0 };

    return  <>
                {
                    projectData ? 
                        
                        <div className="flex flex-col w-full h-screen bg-[#f4f8fb] overflow-y-auto">
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

                                <div className="flex flex-col gap-10 mt-5">
                                    {projectData?.publishedReleases.map((release: ReleaseInfo) => (
                                        <Release key={release.version} release={release}/>
                                    ))}
                                </div>

                            </div>

                        </div> 
                    : 
                        <NotFound/>
                }
            </>
}

export default PublicProjectPage;