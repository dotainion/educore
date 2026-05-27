import { Children, cloneElement, createContext, useContext, useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const Context = createContext();

export const GlobalTabs = ({ tabs: __tabs__, children }) =>{
    const [tab, setTab] = useState(null);
    const [tabs, setTabs] = useState([]);
    const [CHILDREN, setChildren] = useState([]);

    useEffect(()=>{
        setTabs((prevs)=>prevs.map((prev, i)=>{
            if(!CHILDREN?.[i]?.props?.id) return prev;
            return {...prev, tab: CHILDREN[i].props.id};
        }));
    }, [CHILDREN]);

    useEffect(()=>{
        setTabs(__tabs__);
        setChildren(
            Children.map(children, (child)=>{
                if(child.props.id) return child;
                return cloneElement(child, {id: uuidv4()});
            })
        );
    }, [children, __tabs__]);

    return(
        <Context.Provider value={{tab}}>
            <div className="border-bottom text-nowrap overflow-auto mb-3">
                <div className="d-flex flex-wrap gap-2 border-bottom p-3">
                    {tabs.map((nob) => (
                        <button
                            onClick={()=>setTab(nob.tab)}
                            className={`btn btn-sm btn-${nob.tab === tab ? 'primary' : 'light'}`}
                            key={nob.title}
                        >
                            {nob.title}
                        </button>
                    ))}
                </div>
            </div>
            {CHILDREN}
        </Context.Provider>
    )
}

export const GlobalTabItem = ({ id, children }) =>{
    const { tab } = useContext(Context);
    
    if(tab !== id) return null;
    return children;
}