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
    
    const {slug, version} = useParams();

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

                            <p className="text-[#a0bece] text-sm mb-10">{`Released ${getMonthName(parseInt(releaseDetails?.releasedAt.substring(5, 7)) - 1)} ${parseInt(releaseDetails?.releasedAt.substring(8, 10))}, ${releaseDetails?.releasedAt.substring(0, 4)}`}</p>

                        </div>
                    </div>

                    :
                    <NotFound/>
                }
            </>
}

export default ReleaseInfoPage