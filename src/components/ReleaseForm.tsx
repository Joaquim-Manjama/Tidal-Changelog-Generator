import { useState } from "react";
import { createRelease, updateRelease } from "../services/Releases";
import { type ReleaseFormProps } from "../interfaces/props";


const ReleaseForm = ({projectId, version, description, onClose}: ReleaseFormProps) => {
    
    const inputStyle = `focus:border-dark-teal-700 focus:outline-none p-3 shadow rounded border border-white/10 mb-5 w-full -mt-4`;

    const [versionInput, setVersion] = useState<string>(version);
    const [descriptionInput, setDescription] = useState<string>(description);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = (version == "" && description == "") ? await createRelease(projectId, versionInput, descriptionInput): await updateRelease(projectId, versionInput, descriptionInput);
        console.log(response);
        onClose();
        window.location.reload();
    }

    return<div className="absolute top-0 left-0 w-full h-screen flex transition duration-200 text-black">
            <form action=""  onSubmit={(e) => handleSubmit(e)} className="m-auto bg-white/30 backdrop-blur-xl m-auto w-[500px] rounded-2xl border border-white/10 shadow-xl p-8 flex flex-col gap-5">
                <span onClick={() => onClose()} className="material-symbols-outlined right-10 scale-[1.2] absolute hover:cursor-pointer hover:text-red-500">close</span>
                <h1 className="text-2xl w-full text-center">New Release</h1>
                <label htmlFor="">Version Name*</label>
                <input type="text" value={versionInput} onChange={(e) => setVersion(e.target.value)} className={inputStyle} placeholder="v1.0.0" required/>
                <label htmlFor="">Description*</label>
                <textarea value={descriptionInput} onChange={(e) => setDescription(e.target.value)} className={inputStyle} placeholder="Big Performance Update!" required></textarea>
                <button type="submit" className="bg-dark-teal-700 p-4 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-dark-teal-800">{`${(version == "" && description == "") ? "+ Create": "Update"} Draft`}</button>
            </form>
        </div>  
}

export default ReleaseForm;