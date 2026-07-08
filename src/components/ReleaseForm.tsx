import { useEffect, useState } from "react";
import { createRelease, updateRelease } from "../services/Releases";
import type { ReleaseFormProps } from "../interfaces/Props";
import type { GitHubChange, ReleaseObj } from "../interfaces/Objects";
import { useUserData } from "../contexts/UserDataContext";
import { getGitHubChanges } from "../services/Github";


const ReleaseForm = ({projectId, version, description, onClose}: ReleaseFormProps) => {
    
    const inputStyle = `focus:border-dark-teal-700 focus:outline-none p-3 shadow rounded border border-white/10 mb-5 w-full -mt-4`;

    const [versionInput, setVersion] = useState<string>(version);
    const [descriptionInput, setDescription] = useState<string>(description);
    const [importFromGitHub, setImportFromGitHub] = useState<number>(0)
    const [selectingChanges, setSelectingChanges] = useState<boolean>(false);
    const [unfilteredChanges, setUnfilteredChanges] = useState<GitHubChange[]>([]);
    const [filteredChanges, setFilteredChanges] = useState<GitHubChange[]>([]);

    const date = new Date()
    const formatDate = (value: number): string | number => {
        return value < 10 ? `0${value}` : value;
    }

    const [sinceDate, setSinceDate] = useState<string>(new Date(0).toISOString().slice(0, 10));
    const [untilDate, setUntilDate] = useState<string>(`${date.getFullYear()}-${formatDate(date.getMonth() + 1)}-${formatDate(date.getDate())}`)

    const {currentProject} = useUserData();

    const handleImportFromGitHub = async (sinceDate: string, untilDate: string) => {
            
        const githubURL = currentProject.githubRepo.split("/");
        const projectName = githubURL[githubURL.length - 1];

        try {
            const response = await getGitHubChanges(projectName || "", sinceDate, untilDate);
            return response;

        } catch (error) {
            console.error("Error importing changes from GitHub:", error);
        }
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const since = (sinceDate != "NaN-NaN-NaN" && sinceDate != "") ? `${sinceDate}T00:00:00Z` : new Date(0).toISOString().slice(0, 19) + "Z";
        const until = `${untilDate}T23:59:59Z`;


        if (importFromGitHub == 1) {
            const changes = await handleImportFromGitHub(since, until);

            if (changes?.length > 0) {
                setUnfilteredChanges(changes);
                setSelectingChanges(true);

                return;
            }

            alert("No changes found in the specified date range. Please adjust the dates and try again.");
        }
        const response = (version == "" && description == "") ? await createRelease(projectId, versionInput, descriptionInput): await updateRelease(projectId, versionInput, descriptionInput);
        console.log(response);
        onClose();
        window.location.reload();
    }

    const formatChangeDate = (date: string): string => {
        const values = new Date(date).toDateString().split(" ");

        return `${values[1]} ${values[2]}`;
    }

    const handleSelectAll = () => {
        setFilteredChanges([...unfilteredChanges]);
    };

    const handleSelectNone = () => {
        setFilteredChanges([]);
    };


    useEffect(() => {
 
        const setUp = async() => {

            const rls = sessionStorage.getItem("UserProjectReleases");

            if (rls) {
                const releases = JSON.parse(rls);
                console.log(releases)
                const newestCreatedDate = new Date(
                    Math.max(...releases.map((r: ReleaseObj) => new Date(r.createdAt).getTime()))
                );

                const newestDate = newestCreatedDate;

                setSinceDate(`${newestDate.getFullYear()}-${formatDate(newestDate.getMonth() + 1)}-${formatDate(newestDate.getDate())}`);
            }
        }

        setUp();
    }, [])

    return  <div className="absolute top-0 left-0 w-full h-screen flex transition duration-200 text-black">                
                <form action=""  onSubmit={async (e) => await handleSubmit(e)} className="m-auto bg-white/30 backdrop-blur-xl m-auto w-[500px] rounded-2xl border border-white/10 shadow-xl p-8 flex flex-col gap-5">
                    
                    { 
                        selectingChanges?
                        <>
                            <span onClick={() => onClose()} className="material-symbols-outlined right-10 scale-[1.2] absolute hover:cursor-pointer hover:text-red-500">close</span>
                            <h1 className="text-2xl w-full text-center">Changes from GitHub ({unfilteredChanges.length} found)</h1>
                            <div className="w-[500px] h-[500px] flex flex-col items-center gap-5">
                                <div className="w-full h-[400px] flex flex-col gap-5 overflow-y-scroll pt-5">
                                    {
                                        unfilteredChanges.map((change) => (
                                        
                                        <div className="flex gap-5 w-[440px] h-min-[50px] items-center border-b-2 border-dark-teal-700" key={change.id}>
                                            <input
                                            className="w-4 h-4"
                                            type="checkbox"
                                            checked={filteredChanges.includes(change)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFilteredChanges(prev => [...prev, change]);
                                                } else {
                                                    setFilteredChanges(prev => prev.filter((c) => c !== change));
                                                }
                                            }}
                                        />
                                            <div className="flex flex-col gap-[-5px] text-lg">
                                                <p className="w-[350px]">{change.description || change.title}</p>
                                                <p className="text-gray-500 text-sm">by {change.author} on {formatChangeDate(change.date)} • {change.type}</p>
                                            </div>
                                            

                                        </div>))
                                    }    
                                </div>
                                <div className="flex gap-5 w-full justify-center ml-[-60px]">
                                    <button type="button" onClick={handleSelectAll} className="bg-gray-700 p-4 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-gray-800 w-[150px] scale-[0.8]">Select All</button>
                                    <button type="button" onClick={handleSelectNone} className="bg-gray-700 p-4 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-gray-800 w-[150px] scale-[0.8]">Select None</button>
                                </div>
                                <button type="button" className="bg-dark-teal-700 p-4 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-dark-teal-800 w-[250px] ml-[-60px]">Load Changes</button>
                            </div>
                        </>    
                        :

                        <>
                            <span onClick={() => onClose()} className="material-symbols-outlined right-10 scale-[1.2] absolute hover:cursor-pointer hover:text-red-500">close</span>
                            <h1 className="text-2xl w-full text-center">New Release</h1>
                            <label htmlFor="">Version Name*</label>
                            <input type="text" value={versionInput} onChange={(e) => setVersion(e.target.value)} className={inputStyle} placeholder="v1.0.0" required/>
                            <label htmlFor="">Description*</label>
                            <textarea value={descriptionInput} onChange={(e) => setDescription(e.target.value)} className={inputStyle} placeholder="Big Performance Update!" required></textarea>
                            { currentProject?.githubRepo 
                                && 
                                <div className="flex col gap-2">
                                    <input type="checkbox" value={importFromGitHub} onChange={() => setImportFromGitHub(prev => prev * -1 + 1)}/>
                                    <p>Import from Github</p>
                                </div> 
                            }
                            {
                                importFromGitHub != 0
                                && 
                                <div className="flex gap-5 wrap">
                                    <div className="flex col gap-2">
                                        <p>From: </p>
                                        <input type="date" value={sinceDate} onChange={(e) => {console.log(sinceDate);setSinceDate(e.target.value);}} className="bg-dark-teal-700 p-2 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-dark-teal-800"/>
                                    </div>
                                    <div className="flex col gap-2">
                                        <p>To: </p>
                                        <input type="date" value={untilDate} onChange={(e) => {console.log(untilDate);setUntilDate(e.target.value);}} className="bg-dark-teal-700 p-2 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-dark-teal-800"/>
                                    </div>
                                </div>
                            }
                            <button type="submit" className="bg-dark-teal-700 p-4 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-dark-teal-800">{`${importFromGitHub == 1 ? "Import from GitHub" : (version == "" && description == "") ? "+ Create Draft": "Update Draft"}`}</button>
                        </>
                    }
                </form>
            </div>  
}

export default ReleaseForm;