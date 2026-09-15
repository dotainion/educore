import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { FaCaretLeft, FaCaretRight, FaEdit } from "react-icons/fa"
import { useFormBuilder } from "../pages/forms/CreateForm";
import { MdDelete, MdOutlinePreview } from "react-icons/md";
import { BsInputCursorText } from "react-icons/bs";
import { ElementPicker } from "./ElementPicker";
import { GrAdd } from "react-icons/gr";
import { api } from "../../../global/services/Api";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../../../global/components/Spinner";

export const FormPageBuilder = ({ loading }) =>{
    const { elements, setElements, addElement, page, setPage, pages, setPages } = useFormBuilder();

    const params = useParams();

    const timeoutRef = useRef();

    const currentIndex = Object.keys(pages).indexOf(page);
    const current = Object.keys(pages)[currentIndex] || null;
    const prev = Object.keys(pages)[currentIndex -1] || null;
    const next = Object.keys(pages)[currentIndex +1] || null;

    const changePageName = (name) =>{
        const copy = {...pages, [page]: {
            ...pages[page],
            name: name,
        }};
        setPages(copy);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const data = {
                templateId: params.templateId,
                pages: Object.values(copy),
            }
            api.template.update(data).then((response)=>{
                
            }).catch((error)=>{

            });
        }, 500);
    }

    const onPrev = () =>{
        setPage(prev);
    }

    const onNext = () =>{
        setPage(next);
    }

    const newPage = () =>{
        const pg = `${Object.keys(pages).length +1}`;
        const copy = {...pages, [pg]: {
            pageId: uuidv4(),
            name: '',
            list: []
        }}
        setPages(copy);
        setPage(pg);

        const data = {
            templateId: params.templateId,
            pages: Object.values(copy).map((v)=>({...v, list: undefined})),
        }
        api.template.update(data).then((response)=>{
            
        }).catch((error)=>{

        });
    }

    const animateSetPage = (value) =>{        
        setPage('');
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setPage(value);
        }, 0);
    }

    const remove = () =>{
        let fallbackPage = '1';
        if(prev) fallbackPage = prev;
        else if(next) fallbackPage = next;
        else{
            setPages({
                [fallbackPage]: {
                    name: '',
                    list: []
                }
            });
            return animateSetPage(fallbackPage);
        }
        setPages((prevPage)=>{
            delete prevPage[page];
            return prevPage;
        });
        setPage(fallbackPage);
    }

    useEffect(()=>{
        if(!pages[page]) return;
        setElements(pages[page].list);
    }, [page]);

    return(
        <Droppable
            droppableId="elements"
            ignoreContainerClipping={false}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-fill d-flex flex-column vh-100 pb-2"
                    style={{flexShrink: 0, touchAction: 'manipulation'}}
                >
                    <div className="d-flex justify-content-end gap-1 p-1">
                        <button onClick={onPrev} className="btn btn-sm btn-light border-0" disabled={!prev}>
                            <FaCaretLeft />
                        </button>
                        <button onClick={onNext} className="btn btn-sm btn-light border-0" disabled={!next}>
                            <FaCaretRight />
                        </button>
                        <button onClick={newPage} className="btn btn-sm btn-light border-0">
                            New Page
                        </button>
                        <button onClick={remove} className="btn btn-sm btn-light border-0">
                            Delete
                        </button>
                    </div>
                    <div
                        className={`d-flex flex-column gap-3 overflow-auto border ${
                            snapshot.isDraggingOver ? 'border-primary' : ''
                        } border-2 border-dashed rounded-3 w-100 h-100 p-2 pt-0 position-relative`}
                    >
                        <div className="position-sticky top-0 d-flex align-items-center gap-1 small text-muted bg-white py-2" style={{zIndex: 1050}}>
                            <FaEdit />
                            <input
                                className="form-control border-0 p-0"
                                onChange={(e)=>changePageName(e.target.value)}
                                value={pages[page]?.name || ''}
                                placeholder="Enter page name"
                            />
                            <button className="btn btn-sm border-0">
                                <MdOutlinePreview />
                            </button>
                        </div>
                        {loading ? (
                            <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                                <Spinner show absolute md bg="white" />
                            </div>
                        ):(
                            <>
                                {elements.map((element, index)=>(
                                    <Draggable
                                        draggableId={element.id}
                                        index={index}
                                        key={element.id}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{...provided.draggableProps.style}}
                                                className={`bg-${snapshot.isDragging ? 'light' : 'white'}`}
                                            >
                                                <ElementPicker element={element} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {elements.length === 0 && (
                                    <div>
                                        <button onClick={()=>addElement()} className="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3">
                                            <GrAdd />
                                            Add
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="d-none">
                            {provided.placeholder}
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
    )
}