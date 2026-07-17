import { useState } from "react";
import { deleteEntry } from "../services/ChangelogEntry";

const Changelog = ({ id, description, type, onUpdate }: { id: string; description: string; type: string; onUpdate: (newDesc: string, newType: string) => void }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(description);
    const [newCategory, setNewCategory] = useState(type);

    const handleSave = () => {
        if (newValue.trim() && newValue !== description) {
            onUpdate(newValue, newCategory);
        } else {
            setNewValue(description);
        }
        setIsEditing(false);
    };

    const handleOnDelete = () => {
        deleteEntry(id);
        window.location.reload();
    };

    if (isEditing) {
        return <div className="flex justify-between gap-10">
                <input
                    className="bg-gray-700 border border-white/2 rounded px-2 py-1 text-white w-full"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") {setNewValue(description); setIsEditing(false);} }}
                    autoFocus
                />
                <select name="" id="" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="NEW_FEATURE">New Feature</option>
                    <option value="BUG_FIX">Bug Fix</option>
                    <option value="IMPROVEMENT">Improvement</option>
                </select>
                <div className="flex gap-5">
                    <span onClick={handleSave} className="material-symbols-outlined hover:text-green-500 hover:cursor-pointer transition duration-200">check</span>
                    <span onClick={() => setIsEditing(false)} className="material-symbols-outlined hover:text-red-500 hover:cursor-pointer transition duration-200">close</span>
                </div>
            </div>;
    }

    return <div className="flex justify-between gap-10">
            <p>{description}</p>
            <div className="flex gap-5">
                <span onClick={() => setIsEditing(true)} className="material-symbols-outlined hover:text-yellow-500 hover:cursor-pointer transition duration-200">edit</span>
                <span onClick={() => handleOnDelete()} className="material-symbols-outlined hover:text-red-500 hover:cursor-pointer transition duration-200">delete</span>
            </div>
        </div>;
}

export default Changelog;