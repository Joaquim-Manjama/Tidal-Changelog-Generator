import { useState } from "react";
import { useUserData } from "../contexts/UserDataContext";
import { addChangelogEntry } from "../services/ChangelogEntry";

const CategoryForm = (onClose: {onClose: () => void}) => {

    const [description, setDescription] = useState<string>("");

    const {currentRelease, currentCategory, currentDisplayOrder} = useUserData();

    const inputStyle = `focus:border-dark-teal-700 focus:outline-none p-3 shadow rounded border border-white/10 mb-5 w-full -mt-4`;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await addChangelogEntry(currentRelease.id, description, currentCategory, currentDisplayOrder);
        console.log(response);

        onClose.onClose();
    }

    return <div className="absolute top-0 left-0 w-full h-screen flex transition duration-200 text-black">
            <form action=""  onSubmit={(e) => handleSubmit(e)} className="m-auto bg-white/30 backdrop-blur-xl m-auto w-[500px] rounded-2xl border border-white/10 shadow-xl p-8 flex flex-col gap-5">
                <span onClick={() => onClose.onClose()} className="material-symbols-outlined right-10 scale-[1.2] absolute hover:cursor-pointer hover:text-red-500">close</span>
                <h1 className="text-2xl w-full text-center mt-10">{`New Changelog Entry: ${currentCategory}`}</h1>
                <label htmlFor="">Entry Description*</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className={inputStyle} required/>
                <button type="submit" className="bg-dark-teal-700 p-4 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-dark-teal-800">Add Entry</button>
            </form>
        </div>  
}

export default CategoryForm;