import type { CategoryBoxProps } from "../interfaces/Props";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableChangelog from "./SortableChangelog";

const CategoryBox = ({ categoryType, onAddEntry, entries, onReorder, onUpdateEntry }: CategoryBoxProps) => {

    const display = (type: string) => {
        return type.replaceAll("_", " ");
    };

    const getEmoji = (type: string) => {
        const emojiMap: {[key: string]: string} = {
            "NEW_FEATURE": "✨",
            "BUG_FIX": "🐛",
            "IMPROVEMENT": "🚀"
        };
        return emojiMap[type] || "";
    };

    const getButtonName = (type: string) => {
        const buttonNameMap: {[key: string]: string} = {
            "NEW_FEATURE": "Feature",
            "BUG_FIX": "Bug Fix",
            "IMPROVEMENT": "Improvement"
        };
        return buttonNameMap[type] || "";
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || !entries || active.id === over.id) return;

        const oldIndex = entries.findIndex((e) => e.id === active.id);
        const newIndex = entries.findIndex((e) => e.id === over.id);

        const newEntries = arrayMove(entries, oldIndex, newIndex).map((entry, i) => ({
            ...entry,
            displayOrder: i,
        }));

        onReorder?.(newEntries);
    };

    return <div className="flex flex-col bg-gray-300 border border-white/2 rounded shadow-xl mt-5">
                <div className="p-4 border-b border-white/2 flex justify-between">
                    <p className="flex items-center">{getEmoji(categoryType)} {display(categoryType)} ({entries?.length || 0})</p>
                    <button onClick={() => onAddEntry(categoryType, entries?.length || 0)} className="text-ocean-blue-300 font-thin bg-gray-700 border border-white/2 p-2 pl-4 pr-4 rounded hover:cursor-pointer hover:text-ocean-blue-400 ">+ Add {getButtonName(categoryType)}</button>
                </div>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={entries || []} strategy={verticalListSortingStrategy}>
                        <div className="min-h-[0px]">
                            {entries?.map((entry) => (
                                <SortableChangelog key={entry.id} entry={entry} onUpdate={(newDesc, newType) => onUpdateEntry?.(entry.id, newDesc, newType)} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>;
};

export default CategoryBox;
