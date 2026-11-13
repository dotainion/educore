import { useEffect, useRef } from "react";
import { useForm } from "./Form";

export const FormSubmit = ({ className, children }) => {
    const { loading } = useForm();

    const color = className?.includes('-primary') ? 'white' : 'primary';

    return(
        <button
            type="submit"
            className={`btn ${className || ''} ${loading ? 'd-flex align-items-center justify-content-center gap-3' : ''}`}
            disabled={loading}
        >
            <span>{children}</span>
            {loading && (
                <div className={`spinner-border spinner-border-sm text-${color}`} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </button>
    )
}