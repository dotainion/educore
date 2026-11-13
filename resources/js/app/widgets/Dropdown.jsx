import { useEffect, useState } from "react";

export const Dropdown = ({ 
    as = 'dropdown',
    btnContent = 'Dropdown button',
    placeholder = 'Select an option',
    options = [],
    disabled,
    className,
    onChange,
    value,
    loading
 }) => {
    const [selected, setSelected] = useState('');

    const onSelect = (option, e) => {
        if(disabled) return;
        option?.onClick?.(e);
        if(option?.disabled)  return;
        setSelected(option?.label || option.value);
        onChange?.(option, e);
    }

    useEffect(() => {
        if(!options || !options?.length) return;
        const found = options.find((opt)=>opt?.value === value);
        if(found && found.label) setSelected(found.label);
        else if(found && found.value) setSelected(found.value);
    }, [value]);

    return(
        <div className="dropdown">
            <button
                className={`dropdown-toggle d-flex align-items-center gap-1 ${className || ''}`}
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={disabled}
            >
                {loading ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ):(
                    <span className="d-block text-start w-100">
                        {as === 'dropdown' && (btnContent || placeholder)}
                        {as === 'select' && !selected
                            ? placeholder || btnContent
                            : selected
                        }
                    </span>
                )}
            </button>
            <ul className="dropdown-menu overflow-auto" aria-labelledby="dropdownMenuButton" style={{maxHeight: '50vh'}}>
                {options && options.map((option, key) => (
                    <li key={`option-${key}-${option?.label || option?.value}`}>
                        <button
                            className={`dropdown-item ${
                                selected && selected === option?.value ||
                                selected && selected === option?.label 
                                    ? 'active' : ''
                            } ${option?.className || ''}`}
                            onClick={(e) => onSelect(option, e)}
                        >
                            {option?.label || option?.value}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}