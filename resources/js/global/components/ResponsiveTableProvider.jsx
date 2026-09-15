import { createContext, useContext, useEffect, useRef, useState } from "react"

const Context = createContext();

export const ResponsiveTableProvider = ({size = 'md', children}) =>{
    const [transformed, setTransformed] = useState(false);

    useEffect(()=>{
        const resize = () =>{
            if(window.innerWidth <= 767){
                return setTransformed(true);
            }
            setTransformed(false);
        }
        resize();
        window.addEventListener('resize', resize);
        return () =>window.removeEventListener('resize', resize);
    }, [size]);

    const values = {
        transformed
    }

    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export const Table = (props) =>{
    const { transformed } = useContext(Context);

    const children = props.children;
    const args = { ...props, children: null };

    if(transformed) return(
        <div { ...args }>
            {children}
        </div>
    )
    return(
        <table { ...args }>
            {children}
        </table>
    )
}

export const THead = (props) =>{
    const { transformed } = useContext(Context);
    
    const children = props.children;
    const args = { ...props, children: null };

    if(transformed) return null;
    return(
        <thead { ...args }>
            <Tr>
                {children}
            </Tr>
        </thead>
    )
}

export const TBody = (props) =>{
    const { transformed } = useContext(Context);
    
    const children = props.children;
    const args = { ...props, children: null };
    
    if(transformed) return(
        <div { ...{...args, className: `row m-0 p-0 ${props?.className || ''}`} }>
            {children}
        </div>
    )
    return(
        <tbody { ...args }>
            {children}
        </tbody>
    )
}

export const Tr = (props) =>{
    const { transformed } = useContext(Context);
    
    const children = props.children;
    const args = { ...props, children: null };
    
    if(transformed) return(
        <div className="col-12 p-0 mb-1">
            <div { ...{...args, className: `card border ${props?.className || ''}`} }>
                <div className="card-body p-0">
                    {children}
                </div>
            </div>
        </div>
    )
    return(
        <tr { ...args }>
            {children}
        </tr>
    )
}

export const Td = (props) =>{
    const { transformed } = useContext(Context);
    
    const children = props.children;
    const args = { ...props, children: null };
    
    if(transformed) return(
        <div { ...args }>
            {children}
        </div>
    )
    return(
        <td { ...args }>
            {children}
        </td>
    )
}

export const Th = (props) =>{
    const { transformed } = useContext(Context);
    
    const children = props.children;
    const args = { ...props, children: null };
    
    if(transformed) return(
        <div { ...args }>
            {children}
        </div>
    )
    return(
        <th { ...args }>
            {children}
        </th>
    )
}