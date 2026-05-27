import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDragScroll } from "../../../global/hooks/UseDragScroll";
import { useAutoScroll } from "../../../global/hooks/useAutoScroll";
import { useMergeRefs } from "../../../global/hooks/useMergeRefs";
import { GrReturn } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../global/routes/Routes";
import { Spinner } from "../../../global/components/Spinner";

export const KanbanBoard = ({
    loading,
    renderHeader,
    columns: initialColumns,
    onChange,
    renderItem,
    renderColumnHeader,
    renderSidePanel,
    onItemClick
}) => {
    const dragScroll = useDragScroll();
    const { ref: autoRef, isDraggingRef } = useAutoScroll();
    
    const boardRef = useMergeRefs(dragScroll.ref, autoRef);

    const [columns, setColumns] = useState({});
    const [activeItem, setActiveItem] = useState(null);
    const [activeColumn, setActiveColumn] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const timeoutRef = useRef();
    const lastValidDrop = useRef(null);

    const openPanel = (item, colId) => {
        setActiveItem(item);
        setActiveColumn(colId);
        setIsPanelOpen(true);
        onItemClick?.(item, colId);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
        setActiveItem(null);
        setActiveColumn(null);
    };

    const handleChange = (updated, movedItem, result) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(()=>{
            onChange?.({
                item: movedItem,
                updatedItems: updated,
                destination: result.destination.droppableId,
                source: result.source.droppableId
            });
        }, 0);
    }

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        setColumns((prev) => {
            const sourceCol = prev[source.droppableId];
            const destCol = prev[destination.droppableId];

            const sourceItems = Array.from(sourceCol.items);
            const destItems = Array.from(destCol.items);

            const [movedItem] = sourceItems.splice(source.index, 1);

            // SAME COLUMN REORDER
            if (source.droppableId === destination.droppableId) {
                sourceItems.splice(destination.index, 0, movedItem);

                const updated = {
                    ...prev,
                    [source.droppableId]: {
                        ...sourceCol,
                        items: sourceItems,
                    },
                };

                handleChange(updated, movedItem, result);
                return updated;
            }

            // CROSS COLUMN MOVE
            destItems.splice(destination.index, 0, movedItem);

            const updated = {
                ...prev,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems,
                },
            };

            handleChange(updated, movedItem, result);
            return updated;
        });
    };

    useEffect(() => {
        if(activeItem){
            //allow the active item selected to reflect the new or updated records
            Object.keys(initialColumns).forEach((col)=>{
                const found = initialColumns[col].items.find((a)=>a.id === activeItem.id);
                found && setActiveItem(found);
            });
        }
        setColumns(initialColumns);
    }, [initialColumns]);

    return (
        <motion.div
            className="position-relataive vh-100 d-flex flex-column user-select-none"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
        >
            {renderHeader && (
                renderHeader()
            )}
            {/* BOARD */}
            <div
                ref={boardRef}
                {...dragScroll.events}
                className="d-flex gap-2 overflow-x-auto px-2 pb-2 h-100"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                <DragDropContext
                    onBeforeDragStart={()=>{

                    }}
                    onDragStart={() => {
                        isDraggingRef.current = true;
                        dragScroll.disable(true);
                    }}
                    onDragEnd={(result) => {
                        const destination = result.destination || lastValidDrop.current;
                        if (!destination) return;

                        isDraggingRef.current = false;
                        handleDragEnd(result);
                        dragScroll.disable(false);
                    }}
                    onDragUpdate={(update) => {
                        if (update?.destination) {
                            lastValidDrop.current = update.destination;
                        }
                    }}
                    on
                    direction="horizontal"
                >
                    {Object.entries(columns).map(([colId, col]) => (
                        <Droppable
                            droppableId={colId}
                            ignoreContainerClipping={false}
                            key={colId}
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`grab bg-light rounded-3 border d-flex flex-column h-100 ${
                                        snapshot.isDraggingOver ? 'border-primary' : ''
                                    }`}
                                    style={{
                                        width: '260px',
                                        flexShrink: 0,
                                        touchAction: 'manipulation',
                                    }}
                                >
                                    <div className="p-2 pb-0">
                                        {renderColumnHeader && (
                                            renderColumnHeader(col, colId)
                                        )}
                                    </div>
                                    {loading ? (
                                        <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                                            <Spinner show absolute md bg="white" />
                                        </div>
                                    ):(
                                        <div className="overflow-y-auto h-100 p-2" style={{ flex: 1 }}>
                                            {
                                                col.items.length?
                                                col.items.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="pb-2 pointer"
                                                                style={{...provided.draggableProps.style}}
                                                                onClick={()=>openPanel(item, colId)}
                                                            >
                                                                {renderItem ? (
                                                                    renderItem(item, snapshot, colId, index)
                                                                ) : (
                                                                    <div className={`p-2 shadow-sm rounded-sm bg-${snapshot.isDragging ? 'light' : 'white'}`}>
                                                                        {item.name}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )):
                                                <div className="w-100 h-100 d-flex align-items-center justify-content-center small">
                                                    <div className="text-secondary small fw-bold">Drag & drop card here</div>
                                                </div>
                                            }
                                        </div>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>

            {/* SIDE PANEL OVERLAY */}
            {isPanelOpen && (
                <motion.div
                    onClick={closePanel}
                    className="position-fixed top-0 start-0 d-flex justify-content-end bg-secondary bg-opacity-10 w-100 vh-100"
                    style={{ zIndex: 9999 }}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.02 }}
                >
                    <div
                        onClick={(e)=>e.stopPropagation()}
                        className="h-100 bg-white p-2 overflow-y-auto"
                        style={{ width: '400px', maxWidth: '95%' }}
                    >
                        <button onClick={closePanel} className="btn btn-sm mb-2">
                            Close
                        </button>

                        {renderSidePanel &&
                            renderSidePanel(
                                activeItem,
                                activeColumn,
                                closePanel
                            )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
