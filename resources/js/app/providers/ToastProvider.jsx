
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timers = useRef(new Map());

    const removeToast = useCallback((id) => {
        clearTimeout(timers.current.get(id));
        timers.current.delete(id);

        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showToast = useCallback((message, options = {}) => {
        const id = `${Date.now()}-${Math.random()}`;
        const {
            type = 'info',
            title,
            duration = 4000
        } = options;

        setToasts(prev => [
            ...prev,
            { id, message, type, title }
        ]);

        if (duration > 0) {
            timers.current.set(
                id,
                setTimeout(() => removeToast(id), duration)
            );
        }

        return id;
    }, [removeToast]);

    const toast = useMemo(() => ({
        show: showToast,
        success: (message, options = {}) => showToast(message, { ...options, type: 'success' }),
        error: (message, options = {}) => showToast(message, { ...options, type: 'danger' }),
        warning: (message, options = {}) => showToast(message, { ...options, type: 'warning' }),
        info: (message, options = {}) => showToast(message, { ...options, type: 'info' }),
        dismiss: removeToast
    }), [showToast, removeToast]);

    const icons = {
        success: 'bi-check-circle-fill',
        danger: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill'
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div
                className="toast-container position-fixed top-0 end-0 p-3"
                aria-live="polite"
                aria-atomic="true"
            >
                {toasts.map(item => (
                    <div
                        key={item.id}
                        className={`toast show text-bg-${item.type} border-0 mb-2`}
                        role="alert"
                    >
                        <div className="toast-body" title={item.title || item.type.charAt(0).toUpperCase() + item.type.slice(1)}>
                            <div className="d-flex gap-3">
                                <i className={`bi ${icons[item.type]}`}></i>
                                <div className="w-100">{item.message}</div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => removeToast(item.id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
