import { useEffect, useState } from "react"
import type { ReleaseDetails } from "../interfaces/Objects"
import { getRelease } from "../services/Public"
import { useParams } from "react-router"
import NotFound from "./NotFound"

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
                    <div className="flex flex-col text-#001021">
                        <div className="flex justify-between px-6 md:px-10 py-4 w-full h-[60px] bg-white shadow-xl border-b-1 border-[#a0bece]">
                            <p className="text-black font-medium">Release Notes</p>
                            <p className="text-[#a0bece] text-sm">{`${getMonthName(parseInt(releaseDetails?.releasedAt.substring(5, 7)) - 1)} ${parseInt(releaseDetails?.releasedAt.substring(8, 10))}, ${releaseDetails?.releasedAt.substring(0, 4)}`}</p>
                        </div>
                    </div>

                    :
                    <NotFound/>
                }
            </>
}

export default ReleaseInfoPage