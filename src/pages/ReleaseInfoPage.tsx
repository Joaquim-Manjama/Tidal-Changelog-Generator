import { useEffect, useState } from "react"
import type { ReleaseDetails, EntryInfo } from "../interfaces/Objects"
import { getRelease } from "../services/Public"
import { useParams } from "react-router"
import NotFound from "./NotFound"

const EntryList = ({entries, colour}: {entries: EntryInfo[], colour: string}) => {

    return <div className={`w-full bg-[${colour}]/10 rounded px-6 py-2 mb-10`}>
                <ul>
                    {
                        entries.map(entry => (
                            <li className="text-lg"><span className={`text-[${colour}]`}>●</span> {entry?.description}</li>
                        ))
                    }
                </ul>
            </div>
}

const ReleaseInfoPage = () => {

    const [releaseDetails, setReleaseDetails] = useState<null | ReleaseDetails>(null)
    const [copied, setCopied] = useState<boolean>(false);

    const {slug, version} = useParams();

    const URL = `http://localhost:5173/project/${slug}/release/${version}`

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

    useEffect(() => {

        const setUp = async () => {
            try {
                const response = await getRelease(slug as string, version as string);

                if (response)
                    setReleaseDetails(response)
            } catch (error) {
                console.log("Error: ", error);
            }
        }

        setUp();

    }, [])

    useEffect(() => {

        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 5000);

        return () => clearTimeout(timer);

    }, [copied])

    return  <>
                {
                    releaseDetails? 
                    <div className="flex flex-col text-[#001021]">
                        <div className="flex justify-between px-6 md:px-10 py-4 w-full h-[60px] bg-white shadow-xl border-b-1 border-[#a0bece]/50">
                            <p className="font-medium">#Release Notes</p>
                            <p className="text-[#a0bece] text-sm">{`${getMonthName(parseInt(releaseDetails?.releasedAt.substring(5, 7)) - 1)} ${parseInt(releaseDetails?.releasedAt.substring(8, 10))}, ${releaseDetails?.releasedAt.substring(0, 4)}`}</p>
                        </div>
                        <div className="w-full h-screen bg-[#f4f7fa] px-6 md:px-10 py-10 flex flex-col gap-5 overflow-y-auto">

                            <div className="flex gap-5">
                                <p className="text-[#1481ba] bg-[#1481ba]/10 text-sm tracking-widest border-2 border-[#1481ba]/50 p-1 rounded">{releaseDetails?.version}</p>
                                <p className="text-[#11b5e4] bg-[#11b5e4]/10 text-xs tracking-widest border-2 border-[#11b5e4]/50 p-1 mt-[2px] rounded">● LATEST RELEASE</p>
                            </div>

                            <div className="text-5xl md:text-6xl font-medium">
                                <p>What's new</p>
                                <p className="text-[#1481ba]">in {releaseDetails.version.replace("v", "")}</p>
                            </div>

                            <p className="text-[#001021]/60 w-[70%] text-md md:text-lg border-b border-[#a0bece]/50">{releaseDetails.description}</p>

                            <div className="border-b border-[#a0bece]/50 mt-5">
                                <p className="text-[#1481ba] text-3xl font-medium">#New Features ({releaseDetails?.features.length})</p>
                                <EntryList entries={releaseDetails?.features} colour="#1481ba"/>
                            </div>

                            <div className="border-b border-[#a0bece]/50 mt-5">
                                <p className="text-[#11b5e4] text-3xl font-medium">#Bug Fixes ({releaseDetails?.fixes.length})</p>
                                <EntryList entries={releaseDetails?.fixes} colour="#11b5e4"/>
                            </div>

                            <div className="border-b border-[#a0bece]/50 mt-5">
                                <p className="text-[#0caadc] text-3xl font-medium">#Improvements ({releaseDetails?.improvements.length})</p>
                                <EntryList entries={releaseDetails?.improvements} colour="#0caadc"/>
                            </div>

                            <div className="p-6 bg-white rounded-[10px] shadow border border-[#a0bece]/50 mt-5">
                                <p className="font-medium">Share this release</p>
                                <p className="text-sm text-[#a0bece] mb-3">Let your network know what's new</p>
                                <div className="flex gap-5 text-sm">
                                    
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/`} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-[#0072b1] bg-[#0072b1]/15 p-2 border-2 border-[#0072b1]/20 rounded">
                                        <span className="fa fa-linkedin scale-[1.2] mt-1"></span>
                                        LinkdeIn
                                    </a>
                                    
                                    <button className="flex gap-2 text-[#25D366] bg-[#25D366]/15 p-2 border-2 border-[#25D366]/20 rounded">
                                        <span className="fa fa-whatsapp scale-[1.2] mt-1"></span>
                                        Whatsapp
                                    </button>

                                    <button className="flex gap-2 text-[#FF5700] bg-[#FF5700]/15 p-2 border-2 border-[#FF5700]/20 rounded">
                                        <span className="fa fa-reddit-alien scale-[1.2] mt-1"></span>
                                        Reddit
                                    </button>
                                    
                                    {   
                                        copied ?

                                            <button className="flex text-[#708b9b] bg-[#a0bece]/15 p-2 border-2 border-[#a0bece]/20 rounded">
                                                <span className="material-symbols-outlined scale-[0.8]">check</span>
                                                Copied
                                            </button>
                                        
                                        :
                                            <button onClick={() => {navigator.clipboard.writeText(URL); setCopied(true)}} className="flex text-[#708b9b] bg-[#a0bece]/15 p-2 border-2 border-[#a0bece]/20 rounded hover:cursor-pointer hover:bg-[#a0bece]/30">
                                                <span className="material-symbols-outlined scale-[0.8]">content_copy</span>
                                                Copy link
                                            </button>
                                    }
                                </div>
                            </div>

                            <div className="tides w-full rounded-[10px] shadow-xl p-6">
                                    <div className="flex gap-5">
                                        <span className="material-symbols-outlined text-[#0caadc] bg-[#0caadc]/20 rounded-[5px] p-1 h-[35px] border border-[#0caadc]/50">mail</span>
                                        <div className="flex flex-col">
                                            <p className="text-white font-medium">Stay in the loop</p>
                                            <p className="text-sm text-[#a0bece]">Get notified by email whenever a new release is published.</p>
                                        </div>
                                    </div>
                                    <div className="flex mt-5 gap-3 justify-center">
                                        <input type="text" className="bg-white rounded text-black text-sm p-2 w-[60%]" placeholder="you@example.com"/>
                                        <button className="bg-[#0caadc] rounded text-sm tracking-wide p-2">Notify me</button>
                                    </div>
                            </div>

                            <p className="text-[#a0bece] text-sm mb-20 ">{`Released ${getMonthName(parseInt(releaseDetails?.releasedAt.substring(5, 7)) - 1)} ${parseInt(releaseDetails?.releasedAt.substring(8, 10))}, ${releaseDetails?.releasedAt.substring(0, 4)}`}</p>

                        </div>
                    </div>

                    :
                    <NotFound/>
                }
            </>
}

export default ReleaseInfoPage