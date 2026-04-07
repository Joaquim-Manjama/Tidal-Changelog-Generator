import { useEffect, useState } from "react";
import CategoryBox from "../components/CategoryBox";
import SideBar from "../components/SideBar";
import { useUserData } from "../contexts/UserDataContext";
import type { ReleaseObj, Entry } from "../interfaces/Objects";
import { NavLink } from "react-router";
import { getAllEntries, updateEntry } from "../services/ChangelogEntry";
import CategoryForm from "../components/CategoryForm";
import { toggleReleaseStatus, updateRelease } from "../services/Releases";

const InlineEdit = ({ value, onSave }: { value: string; onSave: (v: string) => void }) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    useEffect(() => { setDraft(value); }, [value]);

    if (editing) {
        return <input
            className="bg-gray-700 border border-white/2 rounded px-2 py-1 text-white w-20 pl-2"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => editing && onSave(draft)}
            onKeyDown={(e) => { if (e.key === "Enter") onSave(draft); if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
            autoFocus
        />;
    }

    return <span onClick={() => setEditing(true)} className="border-b border-dashed border-white/2 cursor-pointer">{value}</span>;
};

const InlineTextareaEdit = ({ value, onSave }: { value: string; onSave: (v: string) => void }) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    useEffect(() => { setDraft(value); }, [value]);

    return <div className="flex flex-col gap-5">
        <p className="mt-5">Release Description:</p>
        {editing
            ? <textarea
                className="border p-2 rounded border-gray-500"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={() => onSave(draft)}
                onKeyDown={(e) => { if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
                autoFocus
            />
            : <textarea
                onClick={() => setEditing(true)}
                className="border p-2 rounded border-gray-500 cursor-pointer hover:bg-gray-400 transition"
                readOnly
                value={value}
            />}
    </div>;
};

const ReleasePage = () => {

    const [entriesLoading, setEntriesLoading] = useState(false);
    const [features, setFeatures] = useState<Entry[]>([]);
    const [fixes, setFixes] = useState<Entry[]>([]);
    const [improvements, setImprovements] = useState<Entry[]>([]);
    const [isformActive, setIsFormActive] = useState<boolean>(false);
    const {currentRelease, setCurrentProjectRelease} = useUserData();

    const {setCurrentEntryCategory, setCurrentEntryDisplayOrder} = useUserData();

    const handleAddEntry = (categoryType: string, displayOrder: number) => {
        setCurrentEntryCategory(categoryType);
        setCurrentEntryDisplayOrder(displayOrder);
        setIsFormActive(true);
    };

    const handleCloseForm = () => {
        setIsFormActive(false);
    };

    const handleReorder = async (newOrder: Entry[]) => {
        const updateMap = (setFn: React.Dispatch<React.SetStateAction<Entry[]>>) =>
            setFn(newOrder);

        const isFeature = newOrder.every(e => e.category === "NEW_FEATURE");
        const isFix = newOrder.every(e => e.category === "BUG_FIX");

        if (isFeature) updateMap(setFeatures);
        else if (isFix) updateMap(setFixes);
        else updateMap(setImprovements);

        setEntriesLoading(true);
        try {
            await Promise.all(
                newOrder.map((entry) => updateEntry(entry.id, entry.category, entry.description, entry.displayOrder))
            );
        } catch (err) {
            console.error("Failed to persist display order:", err);
        } finally {
            setEntriesLoading(false);
        }
    };

    const handleUpdateEntry = (entryId: string, newDescription: string) => {
        const update = (entries: Entry[]): Entry[] =>
            entries.map((e) => e.id === entryId ? { ...e, description: newDescription } : e);

        const matchesCat = (entries: Entry[]) => entries.some((e) => e.id === entryId);

        if (matchesCat(features)) setFeatures(update(features));
        else if (matchesCat(fixes)) setFixes(update(fixes));
        else setImprovements(update(improvements));

        setEntriesLoading(true);
        updateEntry(entryId, features.find((e) => e.id === entryId)?.category || fixes.find((e) => e.id === entryId)?.category || "IMPROVEMENT", newDescription, 0)
            .catch((err) => console.error("Failed to update entry:", err))
            .finally(() => setEntriesLoading(false));
    };

    const handlePublish = async () => {
        const newStatus = currentRelease.status === "DRAFT" ? "PUBLISHED" : "DRAFT";
        setCurrentProjectRelease({ ...currentRelease, status: newStatus });
        await toggleReleaseStatus(currentRelease.id);
    };

    const handleReleaseUpdate = (field: string, newValue: string) => {
        setCurrentProjectRelease({ ...currentRelease, [field]: newValue });
        updateRelease(currentRelease.id, field === "version" ? newValue : currentRelease.version, field === "description" ? newValue : currentRelease.description)
            .catch((err) => console.error(`Failed to update release ${field}:`, err));
    };

    useEffect(() => {

        const setEntries = async () => {
            if(!currentRelease) return;

            const data = await getAllEntries(currentRelease.id);

            if (!data) return;

            const features = data.filter((entry: Entry) => entry.category == "NEW_FEATURE");
            const fixes = data.filter((entry: Entry) => entry.category == "BUG_FIX");
            const improvements = data.filter((entry: Entry) => entry.category == "IMPROVEMENT");

            setFeatures(features.sort((a: Entry, b: Entry) => a.displayOrder - b.displayOrder));
            setFixes(fixes.sort((a: Entry, b: Entry) => a.displayOrder - b.displayOrder));
            setImprovements(improvements.sort((a: Entry, b: Entry) => a.displayOrder - b.displayOrder));
        }

        setEntries();
    }, []);

    return <div className="relative w-full min-h-screen flex bg-gray-200">
        <SideBar/>
        <div className="w-full overflow-y-auto max-h-screen ml-[220px] p-4 flex flex-col text-gray-800">

            {/*Header*/}
            <div className="z-4 absolute left-[220px] top-0 w-full h-[78px] bg-gray-200 shadow-xl">
                <NavLink to="/project" className={"absolute top-[19px] bg-black p-4 pt-2 pb-1 rounded-xl bg-transparent scale-[1.5] font-normal hover:text-gray-300 hover:cursor-pointer transition duration-200 ease-in-out"}>
                    <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
                </NavLink>
                <div className="flex h-[100%] justify-end items-center mr-[220px] p-5">
                    <button onClick={() => handlePublish()} className={`text-${currentRelease.status === "DRAFT" ? "green-600" : "red-500"} font-thin bg-gray-700 border border-white/2 p-2 pl-4 pr-4 rounded hover:cursor-pointer`}>{currentRelease.status === "DRAFT" ? "Publish" : "Unpublish"}</button>
                </div>
            </div>

            {/*Release Information */}
            <div className="mt-30 p-4 border border-white/2 flex flex-col rounded bg-gray-300 gap-5 mb-10 shadow-xl">
                <div className="flex justify-between">
                    <span>Version: <InlineEdit value={currentRelease?.version} onSave={(v) => handleReleaseUpdate("version", v)} /></span>
                    <p>Date Created: {currentRelease?.createdAt}</p>
                </div>
                <div className="flex justify-between">
                    <p>Status: {currentRelease?.status == "DRAFT" ? "🟡": "🟢"}{currentRelease?.status}</p>
                </div>
                <InlineTextareaEdit value={currentRelease?.description} onSave={(v) => handleReleaseUpdate("description", v)} />
            </div>

            {/*Changelog Entries*/}
            {/* NEW FEATURES */}
            <CategoryBox categoryType="NEW_FEATURE" onAddEntry={handleAddEntry} entries={features} onReorder={handleReorder} onUpdateEntry={handleUpdateEntry}/>
            {/* BUG FIXES */}
            <CategoryBox categoryType="BUG_FIX" onAddEntry={handleAddEntry} entries={fixes} onReorder={handleReorder} onUpdateEntry={handleUpdateEntry}/>
            {/* IMPROVEMENTS */}
            <CategoryBox categoryType="IMPROVEMENT" onAddEntry={handleAddEntry} entries={improvements} onReorder={handleReorder} onUpdateEntry={handleUpdateEntry}/>
        </div>

        {isformActive && <CategoryForm onClose={handleCloseForm} />}
    </div>
}

export default ReleasePage;
