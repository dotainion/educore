import { useEffect, useRef, useState } from "react"

export const GlobalDropdownSelect = ({ options, defaultValue, className, toggelIconOff }) =>{
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState({title: null});

    const select = (item) =>{
        setSelected(item);
        item?.onClick?.();
    }

    useEffect(()=>{
        let hasSelection = false;
        options = options.map((option)=>{
            if(!option.title){
                console.error('Each option in GlobalDropdownSelect must contain attribute: title.');
            }
            if(option.value) return option;
            return {...option, value: option.title};
        });
        options.forEach((option)=>{
            if(option.value === defaultValue){
                setSelected(option);
                hasSelection = true;
            }
        });
        if(!hasSelection && options.length){
            setSelected(options[0]);
        }
        setItems(options);
    }, [options]);

    return(
        <div className="dropdown">
            <button
                className={`${toggelIconOff ? '' : 'dropdown-toggle'} ${className || ''}`}
                data-bs-toggle="dropdown"
            >{selected.title}</button>
            <ul className="dropdown-menu overflow-auto" style={{maxHeight: '45vh', zIndex: 1090}}>
                {items.map((item, key)=>(
                    <li
                        onClick={()=>select(item)}
                        className={`dropdown-item ${
                            item.title === selected.title ? 'active' : ''
                        } small pointer`}
                        key={`${item.title}-${key}`}
                    >{item.title}</li>
                ))}
            </ul>
        </div>
    )
}