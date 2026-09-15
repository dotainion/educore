import { useEffect, useRef, useState } from "react";
import { useApi } from "../context/ApiProvider";
import { ApiErrorWrapper } from "./ApiErrorWrapper";
import { FaCheckCircle } from "react-icons/fa";

export const Tags = ({ title, icon: Icon, tags, name, className, onChange, renderNoTags, singleSelect, value }) =>{
    const { apiError } = useApi();

    const [selected, setSelected] = useState([]);

    const errorRef = useRef();

    const trigger = (filters) =>{
        errorRef.current.setValueAndTriggerChange(JSON.stringify(filters));
        onChange?.(JSON.parse(JSON.stringify(filters)));
    }

    const toggle = (tagId) =>{
        if(singleSelect){
            setSelected([tagId]);
            return trigger([tagId]);
        }
        if(selected.includes(tagId)){
            const filterSub = selected.filter((tId)=>tId !== tagId);
            setSelected(filterSub);
            return trigger(filterSub);
        }
        const filterAdd = [...selected, tagId];
        setSelected(filterAdd);
        trigger(filterAdd);
    }

    useEffect(()=>{
        if(!value) return;
        if(Array.isArray(value)) setSelected(value);
        else setSelected([value]);
    }, [value]);

    useEffect(()=>{
        const copy = JSON.stringify(selected);
        errorRef.current.value = copy;
    }, []);

    return(
        <div className={className}>
            <ApiErrorWrapper ref={errorRef} name={name}>
                {(attributes)=>(
                    <div {...attributes}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            {Icon && (
                                <Icon className="text-primary" />
                            )}
                            {title && (
                                <h6 className="mb-0 small">{title}</h6>
                            )}
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            {
                                tags.length ?
                                tags.map((tag, key) => (
                                    <button
                                        type="button"
                                        key={`tag-${key}`}
                                        onClick={() => toggle(tag.value)}
                                        className={`btn btn-sm rounded-pill px-3 position-relative ${
                                            selected.includes(tag.value) ? 'active border' : 'btn-light'
                                        }`}
                                    >
                                        {tag.title}
                                        {selected.includes(tag.value) && (
                                            <FaCheckCircle className="position-absolute top-0 end-0 text-primary" />
                                        )}
                                    </button>
                                )):
                                <>{renderNoTags && renderNoTags()}</>
                            }
                        </div>
                    </div>
                )}
            </ApiErrorWrapper>
        </div>
    )
}