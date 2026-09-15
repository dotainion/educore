import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { FormPageBuilder } from "../../components/FormPageBuilder";
import { api } from "../../../../global/services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../../global/routes/Routes";

const Context = createContext();

export const useFormBuilder = () => useContext(Context);

export const CreateForm = () => {
    const [page, setPage] = useState('1');
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState({
        '1': {
            pageId: uuidv4(),
            name: '',
            list: []
        }
    });

    const params = useParams();
    const navigate = useNavigate();

    const schema = useMemo(()=>({
        element: (opts=[]) => ({
            id: uuidv4(),
            pageId: null,
            templateId: params.templateId,
            type: 'text',
            label: '',
            defaultValue: '',
            options: [...opts]
        }),
        option: () => ({
            id: uuidv4(),
            label: '',
            value: '',
        })
    }), [params.templateId]);

    const addElement = (item, elementId) =>{
        if(!item) item = schema.element([schema.option()]);
        let index = 0;
        elements.forEach((el, i)=>{
            if(el.id === elementId) index = i;
        });
        setElements((prevs)=>[
            ...prevs.slice(0, index),
            item,
            ...prevs.slice(index)
        ]);
        const data = {
            ...item,
            elementId: item.id,
        }
        api.form.create(data).then((response)=>{

        }).catch((error)=>{
            //find a way to show error but need to keep ui updated not wait
        });
    }

    const updateElement = (id, item) =>{
        setElements((prevs)=>prevs.map((el)=>{
            return el.id === id ? {...el, ...data} : el;
        }));
        const data = {
            ...item,
            elementId: id,
        }
        api.form.create(data).then((response)=>{

        }).catch((error)=>{
            //find a way to show error but need to keep ui updated not wait
        });
    }

    const removeElement = (id) =>{
        setElements((prevs)=>prevs.filter((el)=>el.id !== id));
        const data = {
            elementId: id
        }
        api.form.delete(data).then((response)=>{

        }).catch((error)=>{
            //find a way to show error but need to keep ui updated not wait
        });
    }

    const addOption = (id) =>{
        const found = elements.find((prev)=>prev.id === id);
        const options = [...found.options, schema.option()];
        setElements((prevs)=>prevs.map((el) =>
            el.id === id ? {
                ...el,
                options: [...options]
            } : el
        ));
        const data = {
            elementId: id,
            options: [...options]
        }
        api.form.create(data).then((response)=>{

        }).catch((error)=>{
            //find a way to show error but need to keep ui updated not wait
        });
    }

    const updateOption = (elementId, optionId, option) =>{
        const found = elements.find((prev)=>prev.id === elementId);
        const options = found.options.map((opt)=>opt.id === optionId ? {
            ...opt,
            ...option
        } : opt);
        setElements((prevs)=>prevs.map((el) =>
            el.id === elementId ? {
                ...el,
                options: options,
            } : el
        ));
        const data = {
            elementId: elementId,
            options: options
        }
        api.form.update(data).then((response)=>{

        }).catch((error)=>{
            //find a way to show error but need to keep ui updated not wait
        });
    }

    const removeOption = (id, optionId) =>{
        const found = elements.find((prev)=>prev.id === id);
        const options = found.options.filter((opt)=>opt.id !== optionId);
        setElements((prevs)=>prevs.map((el) =>
            el.id === id ? {
                ...el,
                options: [...options],
            } : el
        ));
        const data = {
            elementId: id,
            options: options
        }
        api.form.update(data).then((response)=>{

        }).catch((error)=>{
            //find a way to show error but need to keep ui updated not wait
        });
    }

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if(
            !destination ||
            source.droppableId === 'elements' &&
            destination.droppableId === 'components' ||
            source.droppableId === 'components' &&
            destination.droppableId === 'delete' ||
            source.droppableId === 'components' &&
            destination.droppableId === 'components' ||
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        ) {
            return;
        }

        if(destination.droppableId === 'delete'){
            return setElements((prevs)=>prevs.filter((_, i) => i !== source.index));
        }

        setElements((prevs) => {
            const movedItem = prevs[source.index];

            // SAME COLUMN REORDER
            if (source.droppableId === destination.droppableId) {
                const next = [...prevs];

                next.splice(source.index, 1);
                next.splice(destination.index, 0, movedItem);

                return next;
            }

            // CROSS COLUMN MOVE
            return [
                ...prevs.slice(0, destination.index),
                { id: uuidv4(), title: draggableId },
                ...prevs.slice(destination.index),
            ];
        });
    }

    const values = {
        page,
        setPage,
        pages,
        setPages,
        elements,
        setElements,
        addElement,
        updateElement,
        removeElement,
        addOption,
        removeOption,
    }

    useEffect(()=>{
        const fromResponseToPages = (response) =>{
            let pageCopy = {};
            response.data.formTemplate.attributes.pages.forEach((p, i)=>{
                pageCopy[`${i}`] = {
                    ...p,
                    pageId: p.pageId,
                    list: []
                }
            });
            setPages(pageCopy);
        }

        if(!params.templateId){
            const data = {
                templateId: params.templateId,
                pages: [{pageId: uuidv4(), name: ''}]
            }
            api.template.create(data).then((response)=>{
                fromResponseToPages(response);
                navigate(routes.form.build(response.data.formTemplate.id));
            }).catch((error)=>{

            }).finally(()=>setLoading(false));
            return;
        }

        api.template.find({templateId: params.templateId}).then((response)=>{
            fromResponseToPages(response);
        }).catch((error)=>{
            //template not found
        }).finally(()=>setLoading(false));
    }, [params.templateId]);

    return (
        <Context.Provider value={values}>
            <div className="position-relataive user-select-none vh-100 w-100">
                <div
                    className="d-flex gap-2 h-100 px-2"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    <DragDropContext
                        onBeforeDragStart={()=>{

                        }}
                        onDragStart={() => {
                            
                        }}
                        onDragEnd={(result) => {
                            onDragEnd(result);
                        }}
                        onDragUpdate={(update) => {
                            
                        }}
                        direction="horizontal"
                    >
                        <FormPageBuilder loading={loading} />
                    </DragDropContext>
                </div>
            </div>
        </Context.Provider>
    );
};
