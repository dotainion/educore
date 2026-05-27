import { AnimatePresence, motion } from "framer-motion"
import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import { createPortal } from "react-dom";

const Context = createContext();

export const MobileTransformableProvider = forwardRef(({onOpen: triggerOpen, onClose: triggerClose, children}, ref) =>{
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(false);
    const [useAsPage, setUseAsPage] = useState(false);

    const onClose = () =>{
        setOpen(false);
        triggerClose?.();
    }

    const onOpen = () =>{
        setOpen(true);
        triggerOpen?.();
    }

    useImperativeHandle(ref, ()=>({
        close: onClose,
        open: onOpen,
        isMobile
    }), [isMobile, open]);

    const values = {
        isMobile,
        onClose,
        onOpen,
        open,
        useAsPage,
        setUseAsPage
    }

    useIsMobile((is)=>{
        setIsMobile(is);
    }, []);

    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
});

export const MobileTransformable = ({ useOverlay, className, mobileClassName, style, mobileOnly, children }) =>{
    const { open, onClose, isMobile, useAsPage } = useContext(Context);
    return(
        <AnimatePresence>
            {isMobile ? (
                <>
                    {open && (
                        createPortal(
                            <>
                                <div
                                    onClick={onClose}
                                    className="position-fixed top-0 start-0 w-100 h-100 bg-secondary bg-opacity-10"
                                    style={{ zIndex: 1090 }}
                                />
                                <motion.div
                                    className="position-fixed bottom-0 start-0 w-100"
                                    style={{ zIndex: 1090 }}
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '100%' }}
                                >
                                    <div className={`card rounded-bottom-0 ${useAsPage ? '' : 'rounded-top-5'} border-0 shadow`}>
                                        <div className={`card-body p-0 ${useAsPage ? '' : 'py-4'} position-relative`}>
                                            <div 
                                                className={`overflow-y-auto ${mobileClassName || 'px-4'}`}
                                                style={{
                                                    maxHeight: useAsPage ? '100vh' : '80vh',
                                                    minHeight: useAsPage ? '100vh' : ''
                                                }}
                                            >
                                                <div className="position-absolute end-0 me-2 bg-white rounded-top-circle p-1" style={{top: '-15px'}}>
                                                    <button onClick={onClose} className="btn-close shadow-none" />
                                                </div>
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </>,
                            document.body
                        )
                    )}
                    
                </>
            ):(
                <>
                    {!mobileOnly && (
                        <>
                            {useOverlay ? (
                                <>
                                    {open && createPortal(
                                        <div
                                            className="position-fixed top-0 start-0 w-100 vh-100 d-flex align-items-center justify-content-center"
                                            style={{zIndex: 1089}}
                                        >
                                            <div
                                                onClick={onClose}
                                                className="position-fixed top-0 start-0 w-100 vh-100 bg-secondary bg-opacity-10"
                                                style={{zIndex: 1090}}
                                            />
                                            <div className="card rounded-4 border-0 shadow-sm position-relative" style={{zIndex: 1091}}>
                                                <div className="card-body p-4">
                                                    {children}
                                                </div>
                                            </div>
                                        </div>,
                                        document.body
                                    )}
                                </>
                            ) : (
                                <div className={className} style={style}>
                                    {children}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </AnimatePresence>
    )
}

export const MobileTransformableButton = ({className, onClick, smOnly, children}) =>{
    const { onOpen, isMobile } = useContext(Context);

    const click = (e) =>{
        onOpen();
        onClick?.(e);
    }

    if(smOnly && !isMobile) return null;
    return(
        <button onClick={click} className={className}>
            {children}
        </button>
    )
}

export const MobileTransformablePage = ({ useOverlay, className, mobileClassName, style, mobileOnly, children }) =>{
    const { setUseAsPage } = useContext(Context);

    useEffect(()=>{
        setUseAsPage(true);
    }, []);

    return(
        <MobileTransformable
            useOverlay={useOverlay}
            className={className}
            mobileClassName={mobileClassName}
            style={style}
            mobileOnly={mobileOnly}
        >
            {children}
        </MobileTransformable>
    )
}

export const MobileTransformableInvisible = ({children}) =>{
    const { isMobile } = useContext(Context);
    if(isMobile) return null;
    return children;
}

export const MobileTransformableVisible = ({children}) =>{
    const { isMobile } = useContext(Context);
    if(isMobile) return children;
    return null;
}

export const useScreen = (callback, dependencies) =>{
    
    const SIZE = {
        SM: 575,
        MD: 767,
        LG: 992,
        XL: 1200,
    };

    useEffect(()=>{
        const resize = () =>{
            if(window.innerWidth <= SIZE.SM){
                return callback('SM');
            }else if (window.innerWidth <= SIZE.MD){
                return callback('MD');
            }else if (window.innerWidth <= SIZE.LG){
                return callback('LG');
            }else if (window.innerWidth <= SIZE.XL){
                return callback('XL');
            }
            return callback('XXL');
        }

        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [...dependencies]);

    return null;
}

export const useIsMobile = (callback, dependencies) =>{
    
    const SIZE = 'md';

    const actions = {
        sm: 575,
        md: 767,
        lg: 992,
        xl: 1200,
    };

    useScreen((SIZE)=>{
        callback(SIZE === 'SM');
    }, [...dependencies]);

    return null;
}
