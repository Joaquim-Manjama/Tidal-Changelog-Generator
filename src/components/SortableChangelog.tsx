import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Changelog from "./Changlog";
import type { Entry } from "../interfaces/Objects";

const SortableChangelog = ({ entry, onUpdate }: { entry: Entry; onUpdate: (newDesc: string) => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: entry.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="p-4 border-b border-white/2 flex items-center gap-2"
        >
            <span
                {...attributes}
                {...listeners}
                className="material-symbols-outlined hover:cursor-grab active:cursor-grabbing text-gray-400 select-none"
            >
                drag_indicator
            </span>
            <div className="flex-1">
                <Changelog id={entry.id} description={entry.description} onUpdate={onUpdate} />
            </div>
        </div>
    );
};

export default SortableChangelog;
