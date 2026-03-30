import { useEffect, useState } from "react";
import CategoryBox from "../components/CategoryBox";
import SideBar from "../components/SideBar";
import { useUserData } from "../contexts/UserDataContext";
import type { ReleaseObj, Entry } from "../interfaces/Objects";
import { NavLink } from "react-router";

const ReleasePage = () => {

    const [features, setFeatures] = useState<Entry[]>([]);
    const [fixes, setFixes] = useState<Entry[]>([]);
    const [improvements, setImprovements] = useState<Entry[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>("");
    const [isformActive, setIsFormActive] = useState<boolean>(false);

    const {currentRelease, setCurrentProjectRelease} = useUserData();

    const handleChange = (valueChanged: string, newValue: string) => {
        const newRelease: ReleaseObj = valueChanged == "version" ? {...currentRelease, version: newValue}: {...currentRelease, description: newValue} ;
        setCurrentProjectRelease(newRelease);
    }

    const handleAddEntry = (category: string) => {
        setCurrentCategory(category);
        setIsFormActive(true);
    }

    useEffect(() => {
    
    });

    return <div className="relative w-full min-h-screen flex">
        <SideBar/>
        <div className="w-full overflow-y-auto max-h-screen ml-[220px] p-4 flex flex-col">
            
            {/*Header*/}
            <div className="z-4 absolute left-[220px] top-0 w-full h-[78px] bg-white/2 border border-white/2 backdrop-blur-xl">
                <NavLink to="/project" className={"absolute top-[19px] left-[10px] bg-black p-4 pt-2 pb-1 rounded-xl bg-transparent scale-[1.5] font-normal hover:text-gray-300 hover:cursor-pointer transition duration-200 ease-in-out"}>
                    <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
                </NavLink>
                <div className="flex h-[100%] justify-end items-center mr-[220px] p-5">
                    <div className="flex justify-between min-w-50 w-60 min-h-11">
                        <button className="text-yellow-200 font-thin bg-white/2 backdrop-blur-xl border border-white/2 p-2 pl-4 pr-4 rounded hover:cursor-pointer">Save Draft</button>
                        <button className="text-green-300 font-thin bg-white/2 backdrop-blur-xl border border-white/2 p-2 pl-4 pr-4 rounded hover:cursor-pointer">Publish</button>
                    </div>
                </div>
            </div>

            {/*Release Information */}
            <div className="mt-30 p-4 border border-white/2 flex flex-col rounded bg-white/2 backdrop-blur-xl gap-5 mb-10 shadow-xl">
                <div className="flex justify-between">
                    <span>Version: <input onChange={(e) => handleChange("version", e.target.value)} className="border w-20 pl-2 rounded border-gray-500" type="text" value={currentRelease?.version} /></span>
                    <p>Date Created: {currentRelease?.createdAt}</p>
                </div>
                <div className="flex justify-between">
                    <p>Status: {currentRelease?.status == "DRAFT" ? "🟡": "🟢"}{currentRelease?.status}</p>
                    <p>Last Saved: Never</p>
                </div>
                <p className="mt-5">Release Dercription:</p>
                <textarea name="" id="" className="border p-2 rounded border-gray-500" onChange={(e) => handleChange("description", e.target.value)} value={currentRelease?.description}></textarea>
            </div>

            {/*Changelog Entries*/}
            {/* NEW FEATURES */}
            <CategoryBox categoryType="NEW_FEATURE" onAddEntry={handleAddEntry} />
            {/* BUG FIXES */}
            <CategoryBox categoryType="BUG_FIX" onAddEntry={handleAddEntry} />
            {/* IMPROVEMENTS */}
            <CategoryBox categoryType="IMPROVEMENT" onAddEntry={handleAddEntry} />
        </div>

        {isformActive && <div>Form is Active</div>}
    </div>
}

export default ReleasePage;