import { useForm } from "./Form";

export const FormSubmit = ({ className, children }) => {
    const { loading } = useForm();
    return(
        <button
            type="submit"
            className={`${className || ''} ${loading ? 'd-flex align-items-center justify-content-center gap-3' : ''}`}
            disabled={loading}
        >
            <span>{children}</span>
            {loading && (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </button>
    )
}