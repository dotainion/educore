import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { GlobalApiRange } from "../../../global/widgets/GlobalApiRange";
import { useFormBuilder } from "../pages/forms/CreateForm";
import { GrAdd } from "react-icons/gr";
import { motion } from "framer-motion";

export const ElementPicker = ({element}) =>{
    const { addElement, updateElement, removeElement } = useFormBuilder();

    const elements = {
        input: {displayName: 'Text'},
        number: {displayName: 'Number'},
        select: {displayName: 'Select'},
        checkbox: {displayName: 'Checkbox'},
        radio: {displayName: 'Radio'},
        range: {displayName: 'Range'},
    };

    return(
        <motion.div
            className="card border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>Element</div>
                    <select
                        onChange={(e)=>updateElement(element.id, {type: e.target.value})}
                        className="form-select form-select-sm w-auto"
                        defaultValue={element.type}
                    >
                        {Object.keys(elements).map((type)=>(
                            <option value={type} key={type}>
                                {elements[type].displayName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="small text-muted">Label</div>
                <input className="form-control form-control-sm mb-2" placeholder="Enter a label" />
                {['select', 'radio'].includes(element.type) && (
                    <Options element={element} />
                )}
                {['input', 'number'].includes(element.type) && (
                    <input
                        onChange={(e)=>updateElement(element.id, {defaultValue: e.target.value})}
                        className="form-control form-control-sm"
                        placeholder="Ender default value"
                        value={element.defaultValue}
                    />
                )}
                {element.type === 'range' && (
                    <GlobalApiRange
                        onChange={(e)=>updateElement(element.id, {defaultValue: e.target.value})}
                        label="Default range"
                        value={element.defaultValue}
                    />
                )}
                {element.type === 'checkbox' && (
                    <label className="d-flex gap-2">
                        <input
                            onChange={(e)=>updateElement(element.id, {defaultValue: e.target.value})}
                            className="form-check"
                            type="checkbox"
                            value={element.defaultValue}
                        />
                        Default Checked
                    </label>
                )}
                <div className="d-flex justify-content-between mt-2">
                    <button onClick={()=>addElement(null, element.id)} className="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3">
                        <GrAdd />
                        Add
                    </button>
                    <button onClick={()=>removeElement(element.id)} className="btn btn-sm btn-danger d-flex align-items-center gap-2 px-3">
                        <MdDelete />
                        Remove
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

const Options = ({element}) =>{
    const { addOption, updateOption, removeOption } = useFormBuilder();
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {element.options.map((opt)=>(
                <motion.div
                    className="d-flex gap-3 py-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={opt.id}
                >
                    <div className="d-flex flex-column justify-content-end py-2">
                        <Circle />
                    </div>
                    <div className="row flex-fill">
                        <div className="col-12 col-sm-6 px-1">
                            <div className="small text-muted">Label</div>
                            <input
                                onChange={(e)=>updateOption(element.id, opt.id, {label: e.target.value})}
                                className="form-control form-control-sm"
                                value={opt.label}
                            />
                        </div>
                        <div className="col-12 col-sm-6 px-1">
                            <div className="small text-muted">Value</div>
                            <input
                                onChange={(e)=>updateOption(element.id, opt.id, {value: e.target.value})}
                                className="form-control form-control-sm"
                                value={opt.value}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end">
                        <button onClick={()=>removeOption(element.id, opt.id)} className="btn btn-sm border py-2">
                            <MdDelete />
                        </button>
                    </div>
                </motion.div>
            ))}
            <div className="d-flex justify-content-end mt-2">
                <button
                    onClick={()=>addOption(element.id)}
                    className="btn btn-sm btn-primary px-3"
                >
                    Add Option
                </button>
            </div>
        </motion.div>
    )
}
