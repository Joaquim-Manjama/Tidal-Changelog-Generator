import type { CategoryBoxProps } from "../interfaces/Props";

const CategoryBox = ({ categoryType, onAddEntry, entries }: CategoryBoxProps) => {

    const display = (type: string) => {
        return type.replaceAll("_", " ");
    }

    const getEmoji = (type: string) => {
        const emojiMap: {[key: string]: string} = {
            "NEW_FEATURE": "✨",
            "BUG_FIX": "🐛",
            "IMPROVEMENT": "🚀"
        };
        return emojiMap[type] || "";
    }

    const getButtonName = (type: string) => {
        const buttonNameMap: {[key: string]: string} = {
            "NEW_FEATURE": "Feature",
            "BUG_FIX": "Bug Fix",
            "IMPROVEMENT": "Improvement"
        };
        return buttonNameMap[type] || "";
    }

    return <div className="flex flex-col bg-white/2 backdrop-blur-xl border border-white/2 rounded shadow-xl mt-5">
                <div className="p-4 border-b border-white/2 flex justify-between">
                    <p className="flex items-center">{getEmoji(categoryType)} {display(categoryType)}</p>
                    <button onClick={() => onAddEntry(categoryType, entries?.length || 0)} className="text-ocean-blue-300 font-thin bg-white/2 backdrop-blur-xl border border-white/2 p-2 pl-4 pr-4 rounded hover:cursor-pointer hover:text-ocean-blue-400 ">+ Add {getButtonName(categoryType)}</button>
                </div>
                <div className="min-h-[0px]">
                    {entries?.map((entry) => (
                        <div key={entry.id} className="p-4 border-b border-white/2">
                            <p>{entry.description}</p>
                        </div>
                    ))}
                </div>
            </div>
}

export default CategoryBox;